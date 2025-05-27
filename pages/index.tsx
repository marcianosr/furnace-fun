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
import Social from "../components/Social";

const getAllQuestions = async (
	apiUrl: string
): Promise<StringifiedData | null> => {
	try {
		console.log(`Fetching from: ${apiUrl}/api/questions`);
		const response = await fetch(`${apiUrl}/api/questions`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			mode: "cors",
		});

		if (!response.ok) {
			console.error(
				`API response not OK: ${response.status} ${response.statusText}`
			);
			return null;
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("getAllQuestions error", error);
		return null;
	}
};

const Home: NextPage = () => {
	const [questions, setQuestions] = useState<QuestionType[]>([]);

	useEffect(() => {
		const isProd = process.env.NODE_ENV === "production";

		if (isProd) {
			ReactGA.initialize("G-GN6M9J5562");
			ReactGA.send("pageview");
		}

		// Use relative URL for API calls to avoid CORS issues
		const fetchData = async () => {
			try {
				// Use relative URL to avoid CORS issues
				const data = await getAllQuestions("");

				if (data && data.questions) {
					setQuestions(JSON.parse(data.questions));
				}
			} catch (error) {
				console.error("Error in fetchData:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className={styles.container}>
			<Head>
				<title>Grunties Furnace Fun | Banjo Kazooie Quiz Game</title>
				<meta
					name="description"
					content="Test your Banjo Kazooie and Tooie knowledge with this fun interactive questionnaire. Challenge yourself with questions about the classic N64 games!"
				/>
				<meta
					name="keywords"
					content="Banjo Kazooie, Banjo Tooie, Quiz, Furnace Fun, Gruntilda, N64, Nintendo 64"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<meta name="robots" content="index, follow" />
				<link rel="canonical" href="https://furnace-fun.vercel.app" />

				{/* Open Graph / Facebook */}
				<meta property="og:type" content="website" />
				<meta
					property="og:url"
					content="https://furnace-fun.vercel.app"
				/>
				<meta
					property="og:title"
					content="Grunties Furnace Fun | Banjo Kazooie Quiz Game"
				/>
				<meta
					property="og:description"
					content="Test your Banjo Kazooie and Tooie knowledge with this fun interactive questionnaire"
				/>
				<meta
					property="og:image"
					content="https://furnace-fun.vercel.app/og-image.jpg"
				/>
				<meta property="og:site_name" content="Grunties Furnace Fun" />
				<meta property="og:locale" content="en_US" />

				{/* Twitter */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta
					name="twitter:url"
					content="https://furnace-fun.vercel.app"
				/>
				<meta
					name="twitter:title"
					content="Grunties Furnace Fun | Banjo Kazooie Quiz Game"
				/>
				<meta
					name="twitter:description"
					content="Test your Banjo Kazooie and Tooie knowledge with this fun interactive questionnaire"
				/>
				<meta
					name="twitter:image"
					content="https://furnace-fun.vercel.app/og-image.jpg"
				/>

				{/* Favicon */}
				<link rel="icon" href="/favicon.ico" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />

				{/* JSON-LD structured data */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "WebApplication",
							name: "Grunties Furnace Fun",
							description:
								"Test your Banjo Kazooie and Tooie knowledge with this fun interactive questionnaire",
							url: "https://furnace-fun.vercel.app",
							applicationCategory: "GameApplication",
							genre: "Quiz",
							operatingSystem: "Web",
						}),
					}}
				/>
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
						<Social />
					</section>
				</LightCanvas>
			</main>
		</div>
	);
};

export default Home;
