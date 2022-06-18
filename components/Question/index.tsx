import React, { FC, useState } from "react";
import Answer from "../Answer";
import { QuestionType } from "../QuestionContainer";
import SpeechBubble from "../SpeechBubble";
import styles from "./styles.module.css";

export type QuestionProps = {
	question?: QuestionType;
	setAnswer: (answer: string) => void;
	submitAnswer: () => void;
	text?: string;
	preTextQuestion?: string;
};

const Question: FC<QuestionProps> = ({
	question,
	setAnswer,
	submitAnswer,
	text,
	preTextQuestion,
}) => {
	const [isClickedAnswer, setIsClickedAnswer] = useState<number | null>();

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
			<ul className={styles.answerContainer}>
				{question?.answers?.map((answer: any, idx: number) => (
					<Answer
						key={answer}
						answer={answer}
						question={question}
						setAnswer={setAnswer}
						idx={idx}
						isClickedAnswer={isClickedAnswer}
						setIsClickedAnswer={setIsClickedAnswer}
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
};

export default Question;
