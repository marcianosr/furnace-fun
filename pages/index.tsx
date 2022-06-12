import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import TagManager from "react-gtm-module";
import LightCanvas from "../components/LightCanvas";
import QuestionContainer from "../components/QuestionContainer";
import styles from "../styles/Home.module.css";

type Props = {
	questions: any;
};

const tagManagerArgs = {
	gtmId: "GTM-5GJZ4MF",
	dataLayer: {
		userId: "001",
		userProject: "project",
		page: "home",
	},
	dataLayerName: "PageDataLayer",
};

const Home: NextPage<Props> = ({ questions }) => {
	console.log(questions.length);

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
				{/* <h1 className={styles.title}>Welcome to Furnace Fun</h1>   */}

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
	const res = await fetch("http://localhost:3000/api/questions");
	const questions = await res.json();

	return {
		props: { ...questions },
	};
}
