import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import LightCanvas from "../components/LightCanvas";
import QuestionContainer from "../components/QuestionContainer";
import styles from "../styles/Home.module.css";

type Props = {
	questions: any;
};

const Home: NextPage<Props> = ({ questions }) => {
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
						<QuestionContainer questions={questions} />
					</section>
				</LightCanvas>
			</main>
		</div>
	);
};

export default Home;

export async function getServerSideProps() {
	const dev = process.env.NODE_ENV !== "production";
	const apiUrl = dev
		? "http://localhost:3000"
		: "https://furnace-fun.vercel.app";
	const res = await fetch(`${apiUrl}/api/questions`);
	const questions = await res.json();

	return {
		props: { ...questions },
	};
}
