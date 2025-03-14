import type { NextPage } from "next";
import Head from "next/head";
import ReactGA from "react-ga4";
import React, { useEffect, useState } from "react";
import LightCanvas from "../components/LightCanvas";
import QuestionContainer from "../components/QuestionContainer";
import styles from "../styles/Home.module.css";
import SpeechBubble from "../components/SpeechBubble";
import { QuestionType } from "../types";
import { StringifiedData } from "./api/questions";

const getAllQuestions = (apiUrl: string): Promise<StringifiedData> =>
	fetch(`${apiUrl}/api/questions`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((data) => data.json())
		.catch((error) => {
			console.log(error);
			return error;
		});

const Home: NextPage = () => {
	const [questions, setQuestions] = useState<QuestionType[]>([]);

	useEffect(() => {
		const dev = process.env.NODE_ENV !== "production";

		if (!dev) {
			ReactGA.initialize("G-GN6M9J5562");
			ReactGA.send("pageview");
		}
		const apiUrl = dev
			? "http://localhost:3000"
			: "https://furnace-fun.vercel.app";

		getAllQuestions(apiUrl).then((data) => {
			return setQuestions(JSON.parse(data.questions));
		});
	}, []);

	return (
		<div className={styles.container}>
			<Head>
				<title>Furnace Fun</title>
				<meta
					name="description"
					content="Banjo Kazooie and Tooie themed questionnaire"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<LightCanvas>
					<section className={styles.poster}>
						{questions.length === 0 && (
							<SpeechBubble>Loading...</SpeechBubble>
						)}
						{questions.length > 0 && (
							<QuestionContainer questions={questions} />
						)}
					</section>
				</LightCanvas>
			</main>
		</div>
	);
};

export default Home;
