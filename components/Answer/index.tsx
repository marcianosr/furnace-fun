import classNames from "classnames";
import React, { FC, useState } from "react";
import { checkAnswer } from "../QuestionContainer";
import SpeechBubble from "../SpeechBubble";
// import { QuestionType } from "./QuestionContainer";
import styles from "./styles.module.css";

export type AnswerProps = {
	question?: any;
	setAnswer: (answer: string) => void;
	answer: string;
	idx: number;
	isClickedAnswer: number | null | undefined;
	setIsClickedAnswer: (idx: number) => void;
	isSubmitted: boolean;
};

enum CHARACTER_MUGS {
	BANJO = "Banjo_Blinking.webp",
	BLOATAZIN = "Bloatazin_Blinking.webp",
	BOTTLES = "Bottles_Blinking.webp",
	BLACKEYE = "Captain_Blackeye_Blinking.webp",
	CLANKER = "Clanker_Blinking.webp",
	CONGA = "Conga_Blinking.webp",
	DILBERTA = "Dilberta_Blinking.gif",
	GOBI = "Gobi_Blinking.webp",
	ICEWATER = "IceWater_Blinking.gif",
	KAZOOIE = "Kazooie_Icon.webp",
	KLUNGO = "Klungo_Blinking.gif",
	MINGY = "Mingy_Jongo_Blinking.webp",
	MUMBO = "Mumbo_Blinking.webp",
	NIPPER = "Nipper_Blinking.webp",
	OOGLE = "Oogle_Blinking.webp",
	OLD_KING_COAL = "OldKingCoal_Blinking.gif",
	RUBEE = "Rubee_Blinking.gif",
	SABREMAN = "Sabreman_Blinking.webp",
	SALTYJOE = "SaltyJoe_Icon.webp",
	SAURUS = "Saurus_Blinking.gif",
	SCROTTY = "Scrotty_Blinking.webp",
	SNACKER = "Snacker_Blinking.gif",
	SPEAKER = "Speaker_Blinking.gif",
	TIPTUP = "Tiptup_Blinking.webp",
	TIPTUPKID = "TipTupKid_Blinking.gif",
	TRUNKER = "Trunker_Blinking.gif",
}

const mugs = Object.values(CHARACTER_MUGS);

const getRandNumbers = () => {
	const set = new Set();

	while (set.size !== 3) {
		set.add(Math.floor(Math.random() * Object.keys(CHARACTER_MUGS).length));
	}

	return set;
};

const getRandomMug: string[] = Array.from(getRandNumbers()).map((n) => {
	return mugs[n as any];
});

const Answer: FC<AnswerProps> = ({
	question,
	setAnswer,
	answer,
	idx,
	isClickedAnswer,
	setIsClickedAnswer,
	isSubmitted,
}) => {
	const answerByLetter = answer.split("");
	const isCorrectAnswer = checkAnswer(answer, question.correctAnswer);

	return (
		<li key={question}>
			<label
				className={styles.answer}
				onClick={() => {
					setAnswer(answer);
					setIsClickedAnswer(idx);
				}}
				htmlFor={answer}
			>
				<SpeechBubble
					mug={getRandomMug[idx]}
					isActive={idx === isClickedAnswer}
				>
					<input
						type="radio"
						id={answer}
						name="answer"
						value={answer}
						onClick={() => setAnswer(answer)}
					/>
					<p
						className={classNames(styles.answerText, {
							[styles.correct]: isSubmitted && isCorrectAnswer,
							[styles.incorrect]: isSubmitted && !isCorrectAnswer,
						})}
					>
						{answerByLetter.map((letter, idx) => (
							<span key={idx}>{letter}</span>
						))}
					</p>
					{/* <p className={styles.answerText}></p> */}
				</SpeechBubble>
			</label>
		</li>
	);
};

export default Answer;
