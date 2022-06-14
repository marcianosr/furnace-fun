// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import puppeteer from "puppeteer";

type Data = {
	questions: any;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	await NextCors(req, res, {
		// Options
		methods: ["GET", "POST"],
		origin: "*",
		optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	});

	try {
		return res.status(200).json({
			questions: JSON.stringify([
				{
					answers: ["9", "8", "7"],
					game: "Banjo-Kazooie",
					goodAnswer: "8",
					id: "BK-1",
					question:
						"Sprial Mountain's got my face, how many molehills are in this place?",
					questionType: "general",
				},
			]),
		});
	} catch (e) {
		return res.status(400).json({ error: (e as Error).message } as any);
	}

	const browser = await puppeteer.launch();
	const banjoKazooiePage = await browser.newPage();
	await banjoKazooiePage.goto(
		"https://strategywiki.org/wiki/Banjo-Kazooie/Grunty%27s_Furnace_Fun"
	);

	const banjoTooiePage = await browser.newPage();
	await banjoTooiePage.goto(
		"https://banjokazooie.fandom.com/wiki/List_of_Questions_From_Tower_of_Tragedy"
	);
	// await page.screenshot({ path: "ff.png" });
	const scrapedBanjoKazooie = await banjoKazooiePage.evaluate(() => {
		return [...document.querySelectorAll(".wikitable > tbody tr")].map(
			(tr) => tr.innerHTML
		);
	});

	const scrapedBanjoTooie = await banjoTooiePage.evaluate(() => {
		return [...document.querySelectorAll(".mw-parser-output > p")].map(
			(p) => p.innerHTML
		);
	});

	const BKQuestions = scrapedBanjoKazooie
		.map((item) => item.replace(/(<([^>]+)>)/gi, ""))
		.map((item) => item.replace(/\n/gi, ""))
		.map((item) => item.replace(/&nbsp;/i, ""))

		.map((q, idx) => {
			const answers: string = q.split("?")[1];

			if (answers) {
				const getAnswers = answers.split("X -");

				const answerStrings = getAnswers
					.filter((answer) => answer.includes("O"))[0]
					.split(/^O$/)
					.filter((a) => a);

				const findGoodAnswer =
					answerStrings.length > 1
						? answerStrings[1].split("-")[1]
						: answerStrings[0].split("-")[1];

				const answerList = q
					.split("?")[1]
					.split(/X -|O -/)
					.filter((a: string) => a);

				return {
					id: `BK-${idx}`,
					question: q.split("?")[0] + "?",
					answers: answerList.map((t) => t.trim()),
					goodAnswer: findGoodAnswer.trim(),
					game: "Banjo-Kazooie",
					questionType: "general",
				};
			}
		})
		.filter((a) => a);

	const BTQuestions = scrapedBanjoTooie
		.map((item) => item.replace(/(<([^>]+)>)/gi, ""))
		.map((item) => item.replace(/\n/gi, ""))
		.map((item) => item.replace(/&nbsp;/i, ""))
		.map((q, idx) => {
			const answers: string = q.split("?")[1];

			if (answers) {
				const getAnswers = answers.split("x -");

				const answerStrings = getAnswers
					.filter((answer) => answer.includes("o -"))[0]
					.split(/^o - | ^o -$/)
					.filter((a) => a);

				const trimStringAnswers = answerStrings[0].split(/o - |o -$/);
				const findGoodAnswer =
					trimStringAnswers.length > 1
						? trimStringAnswers[1]
						: trimStringAnswers[0];

				const answerList = q
					.split("?")[1]
					.split(/x -|o -/)
					.filter((a: string) => a);

				return {
					id: `BT-${idx}`,
					question: q.split("?")[0] + "?",
					answers: answerList.map((t) => t.trim()),
					goodAnswer: findGoodAnswer.trim(),
					game: "Banjo-Tooie",
					questionType: "general",
				};
			}
		})
		.filter((a) => a)
		.filter((a) => {
			return a?.id !== "BT-219";
		});

	await browser.close();

	// console.log(
	// 	"JSON.stringify([...BKQuestions, ...BTQuestions]),",
	// 	JSON.stringify([...BKQuestions, ...BTQuestions])
	// );

	res.status(200).json({
		questions: JSON.stringify([...BKQuestions, ...BTQuestions]),
	});
}
