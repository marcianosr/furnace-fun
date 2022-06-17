import React, { FC, useEffect, useState, useId } from "react";
import { useLocalStorage } from "react-use";
import ReactGA from "react-ga4";
import StatsModal from "../StatsModal";
import { useCountdown } from "../../hooks/useCountdown";
import Question from "../Question";
import styles from "../Question/styles.module.css";

export type QuestionProps = {
	questions: any;
};

export type QuestionType = {
	question: string;
	answers: string[];
	correctAnswer: string;
};

const QuestionContainer: FC<QuestionProps> = ({ questions }) => {
	const randomQuestion =
		questions[Math.floor(Math.random() * questions.length)];

	const [question, setQuestion] = useState<QuestionType>();
	const [answer, setAnswer] = useState("");
	const [showInstructions, setShowInstructions] = useState(false);

	const [date, setDate] = useState<Date>();

	// Refactor any later
	const [stats, setStats] = useLocalStorage<any>("stats", {
		id: useId(),
		gamesPlayed: 0,
		maxStreak: 0,
		currentStreak: 0,
		date: null,
		correctAnswer: false,
	});
	const [_, hours, minutes, seconds] = useCountdown(stats.date || date);

	const [modal, setModal] = useState(false);

	const checkAnswer = (givenAnswer: string) => {
		return givenAnswer === question?.correctAnswer;
	};

	useEffect(() => {
		setQuestion(randomQuestion);
	}, []);

	useEffect(() => {
		if (stats.date) setModal(true);
	}, []);

	useEffect(() => {
		const expired = hours + minutes + seconds <= 0;

		if (expired) {
			setModal(false);
			setStats({
				...stats,
				date: null,
			});
		}
	}, []);

	const submitAnswer = () => {
		if (!answer) {
			console.log(
				"You didn't answer the question, watchout before I throw you in the lava bath"
			);
			setShowInstructions(true);
			return;
		}
		const TOMORROW_IN_MS = 1 * 24 * 60 * 60 * 1000;
		const NOW_IN_MS = new Date().getTime();
		const tomorrow = NOW_IN_MS + TOMORROW_IN_MS;
		const stringTomorrowDate = new Date(tomorrow);
		setDate(stringTomorrowDate);

		const isCorrectAnswer = checkAnswer(answer);

		setStats({
			...stats,
			gamesPlayed: stats?.gamesPlayed + 1,
			currentStreak: isCorrectAnswer ? stats.currentStreak + 1 : 0,
			maxStreak: isCorrectAnswer
				? stats.currentStreak >= stats.maxStreak
					? stats.maxStreak + 1
					: stats.maxStreak
				: stats.maxStreak,

			date: stringTomorrowDate,
			correctAnswer: isCorrectAnswer,
		});

		setModal(true);

		ReactGA.event({
			category: "Stats",
			action: "Submitted question",
			label: JSON.stringify(stats),
		});
	};

	return (
		<>
			<section className={styles.questionsContainer}>
				{!modal && (
					<>
						{showInstructions ? (
							<Question
								question={question}
								setAnswer={setAnswer}
								submitAnswer={submitAnswer}
								text="Please answer the question before submitting"
							/>
						) : (
							<Question
								question={question}
								setAnswer={setAnswer}
								submitAnswer={submitAnswer}
							/>
						)}
					</>
				)}
			</section>
			{modal && (
				<StatsModal isOpen={modal} time={{ hours, minutes, seconds }} />
			)}
		</>
	);
};

export default QuestionContainer;
