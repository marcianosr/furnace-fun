// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

export type StringifiedData = {
	questions: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<StringifiedData>
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
	const BKQuestions = questions
		.map((question, idx) => {
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
		})
		.filter((question) => question.id !== "BK-133");

	// TODO: Banjo Tooie

	const html2 = banjoTooiePage.split('<div class="mw-parser-output">');
	const scrapedBT = html2[1]
		.split("x - Playing")[0]
		.replace(/(<([^>]+)>)/gi, "")
		.replace(/&nbsp;/i, "");

	const questions2 = scrapedBT.split("?").map(
		(question) =>
			question
				.split("\n")
				.filter((a) => a)
				.slice(-1)[0]
	);

	const answers2 = scrapedBT
		.split("?")
		.map((question) =>
			question
				.split("\n")
				.filter((a) => a)
				.slice(0, -1)
		)
		.slice(1);

	const correctAnswer2 = scrapedBT.split("?").map((question) =>
		question
			.split("\n")
			.filter((a) => a)
			.find((text) => text.includes("o -"))
			?.split("o -")[1]
			.trim()
	);

	const BTQuestions = questions2
		.map((question, idx) => {
			return {
				id: `BT-${idx}`,
				question: `${question}?`,
				answers: answers2[idx]?.map(
					(answer) =>
						answer
							.split(/x -|o -/)
							.filter((a) => a)[0]
							.trim()
							.split("(")[0]
				),
				correctAnswer: correctAnswer2[idx + 1],
				game: "Banjo-Tooie",
				questionType: "general",
			};
		})
		.filter((question) => question.id !== "BT-261")
		.filter((question) => question.id !== "BT-260")
		.filter((question) => question.id !== "BT-259")
		.filter((question) => question.id !== "BT-215");

	return res.status(200).json({
		questions: JSON.stringify([...BKQuestions, ...BTQuestions]),
	});
}
