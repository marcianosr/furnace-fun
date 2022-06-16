// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

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

	const banjoKazooiePage = await fetch(
		"https://strategywiki.org/wiki/Banjo-Kazooie/Grunty%27s_Furnace_Fun"
	).then((data) => data.text());

	const banjoTooiePage = await fetch(
		"https://banjokazooie.fandom.com/wiki/List_of_Questions_From_Tower_of_Tragedy"
	).then((data) => data.text());

	const html = banjoKazooiePage.split('<table class="wikitable prettytable"');
	const scrapedBanjoKazooieQuestions = html[1].split("</table>")[0];

	const scrapedBK = scrapedBanjoKazooieQuestions
		.replace(/(<([^>]+)>)/gi, "")
		.replace(/&nbsp;/i, "");

	const questions = scrapedBK.split("?").map(
		(question) =>
			question
				.split("\n")
				.filter((a) => a)
				.slice(-1)[0]
	);

	const answers = scrapedBK
		.split("?")
		.map((question) =>
			question
				.split("\n")
				.filter((a) => a)
				.slice(0, -1)
		)
		.slice(1);

	const correctAnswer = scrapedBK.split("?").map((question) =>
		question
			.split("\n")
			.filter((a) => a)
			.find((text) => text.includes("O -"))
			?.split("O -")[1]
			.trim()
	);
	const BKQuestions = questions.map((question, idx) => {
		return {
			id: `BK-${idx}`,
			question: `${question}?`,
			answers: answers[idx]?.map((answer) =>
				answer
					.split(/X -|O -/)
					.filter((a) => a)[0]
					.trim()
			),
			correctAnswer: correctAnswer[idx + 1],
			game: "Banjo-Kazooie",
			questionType: "general",
		};
	});

	// console.log(BKQuestions);

	// TODO: Banjo Tooie

	// const html2 = banjoTooiePage.split("General Knowledge");
	// const scrapedBTQuestions = html2[1].split("render-wiki-recommendations")[0];

	return res
		.status(200)
		.json({ questions: JSON.stringify([...BKQuestions]) } as any);
}
