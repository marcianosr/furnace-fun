import React, { FC, useEffect } from "react";
import {
	GameStatus,
	QuestionType,
	VisualQuestionGameStatus,
} from "../../types";
import Answer from "../Answer";
import ImageScreen from "../ImageScreen";
import SpeechBubble from "../SpeechBubble";
import styles from "./styles.module.css";

export type QuestionProps = {
	question?: QuestionType;
	setAnswer: (answer: string) => void;
	submitAnswer: () => void;
	text?: string;
	preTextQuestion?: string;
	isClickedAnswer: number | null;
	setIsClickedAnswer: (idx: number) => void;
	isSubmitted: boolean;
	gameStatus: GameStatus;
	setGameStatus: (gameStatus: GameStatus) => void;
};

const Question: FC<QuestionProps> = ({
	question,
	setAnswer,
	submitAnswer,
	text,
	preTextQuestion,
	isClickedAnswer,
	setIsClickedAnswer,
	isSubmitted,
	gameStatus,
	setGameStatus,
}) => {
	return (
		<>
			{question?.questionType === "general" && (
				<GeneralQuestion
					question={question}
					setAnswer={setAnswer}
					submitAnswer={submitAnswer}
					preTextQuestion={preTextQuestion}
					isClickedAnswer={isClickedAnswer}
					setIsClickedAnswer={setIsClickedAnswer}
					isSubmitted={isSubmitted}
					text={text}
					gameStatus={gameStatus}
					setGameStatus={setGameStatus}
				/>
			)}
			{question?.questionType === "visual" && (
				<VisualQuestion
					question={question}
					setAnswer={setAnswer}
					submitAnswer={submitAnswer}
					preTextQuestion={preTextQuestion}
					isClickedAnswer={isClickedAnswer}
					setIsClickedAnswer={setIsClickedAnswer}
					isSubmitted={isSubmitted}
					text={text}
					gameStatus={gameStatus}
					setGameStatus={setGameStatus}
				/>
			)}
		</>
	);
};

export default Question;

const VisualQuestion: FC<QuestionProps> = ({
	question,
	setAnswer,
	submitAnswer,
	preTextQuestion,
	isClickedAnswer,
	setIsClickedAnswer,
	isSubmitted,
	text,
	gameStatus,
	setGameStatus,
}) => {
	useEffect(() => {
		const timer =
			gameStatus.showImage === true &&
			gameStatus.timer > 0 &&
			setInterval(
				() =>
					setGameStatus({
						...gameStatus,
						timer: gameStatus.timer - 1,
					}),
				1000
			);

		if (gameStatus.timer === 0) {
			setGameStatus({
				...gameStatus,
				visualImageStatus: VisualQuestionGameStatus.IMAGE_SHOWN,
				showImage: false,
			});
		}
		return () => clearInterval(timer || "");
	}, [gameStatus.timer, gameStatus.showImage]);

	return (
		<>
			<SpeechBubble
				mug={"gruntilda.gif"}
				width={170}
				height={170}
				largeMug
			>
				{text ? (
					<p>{text}</p>
				) : (
					<p>
						{preTextQuestion} {question?.question}
					</p>
				)}
			</SpeechBubble>
			{gameStatus.visualImageStatus ===
				VisualQuestionGameStatus.IMAGE_SHOWN && (
				<>
					{question?.answers?.map((answer: string, idx: number) => (
						<Answer
							key={answer}
							answer={answer}
							question={question}
							setAnswer={setAnswer}
							idx={idx}
							isClickedAnswer={isClickedAnswer}
							setIsClickedAnswer={setIsClickedAnswer}
							isSubmitted={isSubmitted}
						/>
					))}
				</>
			)}
			{gameStatus.showImage && (
				<section>
					<ImageScreen
						url={question?.imageUrl || ""}
						time={gameStatus.timer}
					/>
				</section>
			)}
			{gameStatus.visualImageStatus ===
				VisualQuestionGameStatus.IMAGE_NOT_SHOWN && (
				<button
					type="button"
					onClick={() => {
						setGameStatus({
							...gameStatus,
							showImage: true,
						});
					}}
					className={styles.button}
				>
					<span>Show me the picture!</span>
				</button>
			)}

			{gameStatus.visualImageStatus ===
				VisualQuestionGameStatus.IMAGE_SHOWN && (
				<button
					type="button"
					onClick={submitAnswer}
					className={styles.button}
				>
					<span>Submit</span>
				</button>
			)}
		</>
	);
};

const GeneralQuestion: FC<QuestionProps> = ({
	question,
	setAnswer,
	submitAnswer,
	preTextQuestion,
	isClickedAnswer,
	setIsClickedAnswer,
	isSubmitted,
	text,
}) => (
	<>
		<SpeechBubble mug={"gruntilda.gif"} width={170} height={170} largeMug>
			{text ? (
				<p>{text}</p>
			) : (
				<p>
					{preTextQuestion} {question?.question}
				</p>
			)}
		</SpeechBubble>
		<ul className={styles.answerContainer}>
			{question?.answers?.map((answer, idx: number) => (
				<Answer
					key={answer}
					answer={answer}
					question={question}
					setAnswer={setAnswer}
					idx={idx}
					isClickedAnswer={isClickedAnswer}
					setIsClickedAnswer={setIsClickedAnswer}
					isSubmitted={isSubmitted}
				/>
			))}
			<button
				type="button"
				onClick={submitAnswer}
				className={styles.button}
			>
				<span>Submit</span>
			</button>
		</ul>
	</>
);
