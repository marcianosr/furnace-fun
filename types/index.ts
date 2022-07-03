export type QuestionType = {
	id: string;
	game: string;
	question: string;
	answers: string[];
	correctAnswer: string;
	questionType: "general" | "visual" | "sound";
	imageUrl?: string;
};

export enum VisualQuestionGameStatus {
	IMAGE_NOT_SHOWN = "image-not-shown",
	IMAGE_SHOWN = "image-shown",
}

export type GameStatus = {
	visualImageStatus: VisualQuestionGameStatus;
	timer: number;
	showImage: boolean;
};
