import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import LightCanvas from "../components/LightCanvas";
import QuestionContainer from "../components/QuestionContainer";
import styles from "../styles/Home.module.css";

type Props = {};

const getAllQuestions = (apiUrl: string) =>
	fetch(`${apiUrl}/api/questions`).then((data) => data.json());

const Home: NextPage<Props> = () => {
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		const dev = process.env.NODE_ENV !== "production";
		const apiUrl = dev
			? "http://localhost:3000"
			: "https://furnace-fun.vercel.app";

		getAllQuestions(apiUrl).then((data) =>
			setQuestions(JSON.parse(data.questions))
		);
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

// export async function getStaticPaths() {
// 	const dev = process.env.NODE_ENV !== "production";
// 	const apiUrl = dev
// 		? "http://localhost:3000"
// 		: "https://furnace-fun.vercel.app";

// 	const res = await fetch(`${apiUrl}/api/questions`);
// 	console.log(res, "res");
// 	const questions = await res.json();

// 	return {
// 		props: { ...questions },
// 	};
// }
