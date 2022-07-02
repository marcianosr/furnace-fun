import React, { FC, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "react-use";
import ReactGA from "react-ga4";
import StatsModal from "../StatsModal";
import { useCountdown } from "../../hooks/useCountdown";
import Question from "../Question";
import styles from "../Question/styles.module.css";
import { QuestionType } from "../../types";

export type QuestionProps = {
	questions: QuestionType;
};

const QUESTIONS_PER_DAY = 3;

const preTextQuestion = [
	"Here is your first question for today:",
	"Here is the second question:",
	"Here is your last question for today!",
];

const setUserId = (stats: any, setStats: any) => {
	if (!stats.userId) {
		setStats({
			...stats,
			userId: uuidv4(),
		});
	}
};

const getRandomQuestion = (questions: any) =>
	questions[Math.floor(Math.random() * questions.length)];

export const checkAnswer = (givenAnswer: string, correctAnswer: string) =>
	givenAnswer === correctAnswer;

const QuestionContainer: FC<QuestionProps> = ({ questions }) => {
	// console.log(questions);
	const [todaysQuestions] = useState([
		...Array.from({ length: QUESTIONS_PER_DAY }).map((_) =>
			getRandomQuestion(questions)
		),
	]);
	const [questionIndex, setQuestionIndex] = useLocalStorage<any>("qindex", 0);
	const [currentQuestion, setCurrentQuestion] = useState(
		todaysQuestions[questionIndex]
	);

	const [answer, setAnswer] = useState("");
	const [isClickedAnswer, setIsClickedAnswer] = useState<number | null>();
	const [isSubmitted, setSubmitted] = useState(false);

	const [showInstructions, setShowInstructions] = useState(false);

	const [date, setDate] = useState<Date>();

	// Refactor any later

	const [stats, setStats] = useLocalStorage<any>("stats", {
		userId: uuidv4(),
		gamesPlayed: 0,
		maxStreak: 0,
		currentStreak: 0,
		date: null,
		correctAnswer: false,
	});
	const [_, hours, minutes, seconds] = useCountdown(stats.date || date);

	const [modal, setModal] = useState(false);

	useEffect(() => {
		if (stats.date) setModal(true);
	}, [stats.date]);

	useEffect(() => {
		setCurrentQuestion(todaysQuestions[questionIndex]);
		setAnswer("");
		setIsClickedAnswer(null);
		setSubmitted(false);

		if (questionIndex === QUESTIONS_PER_DAY) {
			setModal(true);
		}
	}, [questionIndex]);

	useEffect(() => {
		setUserId(stats, setStats);
	}, [stats.userId]);

	useEffect(() => {
		const expired = hours + minutes + seconds <= 0 || isNaN(seconds);

		if (expired) {
			setModal(false);
			setStats({
				...stats,
				date: null,
			});
			setQuestionIndex(0);
		}
	}, []);

	const submitAnswer = () => {
		if (!answer) {
			console.log(
				"You didn't answer the question, watchout before I throw you in the lava bath"
			);
			setShowInstructions(true);
			setTimeout(() => setShowInstructions(false), 5000);
			return;
		}
		const isCorrectAnswer = checkAnswer(
			answer,
			currentQuestion.correctAnswer
		);

		setSubmitted(true);

		setTimeout(() => {
			setQuestionIndex(questionIndex + 1);

			const TOMORROW_IN_MS = 1 * 24 * 60 * 60 * 1000;
			const NOW_IN_MS = new Date().getTime();
			const tomorrow = NOW_IN_MS + TOMORROW_IN_MS;
			const stringTomorrowDate = new Date(tomorrow);
			setDate(stringTomorrowDate);

			setStats({
				...stats,
				gamesPlayed: stats?.gamesPlayed + 1,
				currentStreak: isCorrectAnswer ? stats.currentStreak + 1 : 0,
				maxStreak: isCorrectAnswer
					? stats.currentStreak >= stats.maxStreak
						? stats.maxStreak + 1
						: stats.maxStreak
					: stats.maxStreak,

				correctAnswer: isCorrectAnswer,
				date:
					questionIndex === QUESTIONS_PER_DAY - 1
						? stringTomorrowDate
						: null,
			});

			ReactGA.event({
				category: "Stats",
				action: "Max streak by user",
				label: `User id: ${stats.userId} / Max streak: ${stats.maxStreak}`,
			});
		}, 2000);
	};

	return (
		<>
			<section className={styles.questionsContainer}>
				{!modal && (
					<>
						{showInstructions ? (
							<Question
								question={currentQuestion}
								setAnswer={setAnswer}
								submitAnswer={submitAnswer}
								text="Please answer the question before submitting"
								isClickedAnswer={isClickedAnswer || null}
								setIsClickedAnswer={setIsClickedAnswer}
								isSubmitted={isSubmitted}
							/>
						) : (
							<Question
								preTextQuestion={preTextQuestion[questionIndex]}
								question={currentQuestion}
								setAnswer={setAnswer}
								submitAnswer={submitAnswer}
								isClickedAnswer={isClickedAnswer || null}
								setIsClickedAnswer={setIsClickedAnswer}
								isSubmitted={isSubmitted}
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
