import React, { FC, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "react-use";
import ReactGA from "react-ga4";
import StatsModal from "../StatsModal";
import Question from "../Question";
import styles from "../Question/styles.module.css";
import { QuestionType, VisualQuestionGameStatus } from "../../types";

export type QuestionProps = {
	questions: QuestionType[];
};

const preTextQuestion = [
	"Here's a question, don’t be slow!",
	"Not bad, but there's more to go!",
	"Easy one, but don’t feel proud!",
	"Your tiny brain makes me laugh loud!",
	"Try again, but you won’t last!",
	"Think you're smart? Not so fast!",
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
	const [randomPreTextIndex, setRandomPreTextIndex] = useState(
		Math.floor(Math.random() * preTextQuestion.length)
	);
	const [currentQuestion, setCurrentQuestion] = useState<QuestionType>(
		getRandomQuestion(questions)
	);

	const [answer, setAnswer] = useState("");
	const [isClickedAnswer, setIsClickedAnswer] = useState<number | null>();
	const [isSubmitted, setSubmitted] = useState(false);

	const [showInstructions, setShowInstructions] = useState(false);
	const [gameStatus, setGameStatus] = useState({
		visualImageStatus: VisualQuestionGameStatus.IMAGE_NOT_SHOWN,
		timer: 5,
		showImage: false,
	});

	// Refactor any later
	const [stats, setStats] = useLocalStorage<any>("stats", {
		userId: uuidv4(),
		gamesPlayed: 0,
		maxStreak: 0,
		currentStreak: 0,
		correctAnswer: false,
	});

	const [modal, setModal] = useState(false);

	const resetVisualChallenge = () => {
		setGameStatus({
			...gameStatus,
			visualImageStatus: VisualQuestionGameStatus.IMAGE_NOT_SHOWN,
			timer: 5,
			showImage: false,
		});
	};

	// Reset streak on new game
	useEffect(() => {
		setStats({
			...stats,
			currentStreak: 0,
		});
	}, []);

	useEffect(() => {
		setCurrentQuestion(getRandomQuestion(questions));
		setAnswer("");
		setIsClickedAnswer(null);
		setSubmitted(false);
		setRandomPreTextIndex(
			Math.floor(Math.random() * preTextQuestion.length)
		);
	}, [randomPreTextIndex]);

	useEffect(() => {
		setUserId(stats, setStats);
	}, [stats.userId]);

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
			setRandomPreTextIndex(randomPreTextIndex + 1);

			if (currentQuestion.questionType === "visual") {
				resetVisualChallenge();
			}

			setStats({
				...stats,
				gamesPlayed: stats?.gamesPlayed + 1,
				currentStreak: isCorrectAnswer
					? stats.currentStreak + 1
					: stats.currentStreak,
				maxStreak: isCorrectAnswer
					? Math.max(stats.currentStreak + 1, stats.maxStreak)
					: stats.maxStreak,
				correctAnswer: isCorrectAnswer,
			});

			ReactGA.event({
				category: "Stats",
				action: "Max streak by user",
				label: `User id: ${stats.userId} / Max streak: ${stats.maxStreak}`,
			});

			if (!isCorrectAnswer) {
				setModal(true);
			}
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
								gameStatus={gameStatus}
								setGameStatus={setGameStatus}
							/>
						) : (
							<Question
								preTextQuestion={
									preTextQuestion[randomPreTextIndex]
								}
								question={currentQuestion}
								setAnswer={setAnswer}
								submitAnswer={submitAnswer}
								isClickedAnswer={isClickedAnswer || null}
								setIsClickedAnswer={setIsClickedAnswer}
								isSubmitted={isSubmitted}
								gameStatus={gameStatus}
								setGameStatus={setGameStatus}
							/>
						)}
					</>
				)}
			</section>
			{modal && <StatsModal isOpen={modal} />}
		</>
	);
};

export default QuestionContainer;
