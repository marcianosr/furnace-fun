export type QuestionType = {
	id: string;
	game: string;
	question: string;
	answers: string[];
	correctAnswer: string;
	questionType: "general" | "visual" | "sound";
};
