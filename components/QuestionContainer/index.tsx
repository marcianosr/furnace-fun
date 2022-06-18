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

const preTextQuestion = [
	"Here is your first question for today:",
	"Here is ther second question:",
	"Here is your last question for today!",
];

const getRandomQuestion = (questions: any) =>
	questions[Math.floor(Math.random() * questions.length)];

const QuestionContainer: FC<QuestionProps> = ({ questions }) => {
	const [todaysQuestions, setTodaysQuestions] = useState([
		getRandomQuestion(questions),
		getRandomQuestion(questions),
		getRandomQuestion(questions),
	]);
	const [currentQuestion, setCurrentQuestion] = useState(todaysQuestions[0]);
	const [questionIndex, setQuestionIndex] = useState(0);

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

	const checkAnswer = (givenAnswer: string) =>
		givenAnswer === currentQuestion?.correctAnswer;

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

		// setStats({
		// 	...stats,
		// 	gamesPlayed: stats?.gamesPlayed + 1,
		// 	currentStreak: isCorrectAnswer ? stats.currentStreak + 1 : 0,
		// 	maxStreak: isCorrectAnswer
		// 		? stats.currentStreak >= stats.maxStreak
		// 			? stats.maxStreak + 1
		// 			: stats.maxStreak
		// 		: stats.maxStreak,

		// 	date: stringTomorrowDate,
		// 	correctAnswer: isCorrectAnswer,
		// });

		const questionsLeft = todaysQuestions.slice(questionIndex);
		setQuestionIndex(questionIndex + 1);

		ReactGA.event({
			category: "Stats",
			action: "Submitted question",
			label: JSON.stringify(stats),
		});

		if (questionsLeft.length !== 0)
			return setCurrentQuestion(todaysQuestions[questionIndex]);

		setModal(true);
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
							/>
						) : (
							<Question
								preTextQuestion={preTextQuestion[questionIndex]}
								question={currentQuestion}
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
