import type { NextPage } from "next";
import Head from "next/head";
import ReactGA from "react-ga4";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import LightCanvas from "../components/LightCanvas";
import QuestionContainer from "../components/QuestionContainer";
import styles from "../styles/Home.module.css";
import RoundContainer from "../components/RoundContainer";

type Props = {};

const getAllQuestions = (apiUrl: string) =>
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

const Home: NextPage<Props> = () => {
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		ReactGA.initialize("G-GN6M9J5562");
		ReactGA.send("pageview");
		const dev = process.env.NODE_ENV !== "production";
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
							<RoundContainer>Loading...</RoundContainer>
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
