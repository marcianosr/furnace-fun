import type { NextPage } from "next";
import Head from "next/head";
import ReactGA from "react-ga4";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import LightCanvas from "../components/LightCanvas";
import QuestionContainer from "../components/QuestionContainer";
import styles from "../styles/Home.module.css";

type Props = {};

const getAllQuestions = (apiUrl: string) =>
	fetch(`${apiUrl}/api/questions`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		// headers: {
		// 	"Content-Type": "application/json",
		// 	Accept: "application/json; charset=UTF-8",
		// 	"User-Agent": "*", // 👈
		// },
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
		console.log("React ga");
		const dev = process.env.NODE_ENV !== "production";
		const apiUrl = dev
			? "http://localhost:3000"
			: "https://furnace-fun.vercel.app";

		getAllQuestions(apiUrl).then((data) => {
			// return setQuestions([]);
			return setQuestions(JSON.parse(data.questions));
		});
	}, []);
	return (
		<div className={styles.container}>
			{/* <Script
				strategy="lazyOnload"
				src="https://www.googletagmanager.com/gtag/js?id=G-GN6M9J5562"
			/>

			<Script id="analytics" strategy="lazyOnload">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', 'G-ML3PGJYT1S')
					`}
			</Script> */}
			{/* <Script id="tagmanager" strategy="lazyOnload">{`
				(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5GJZ4MF');`}</Script>

			<noscript>
				<iframe
					src="https://www.googletagmanager.com/ns.html?id=GTM-5GJZ4MF"
					height="0"
					width="0"
					style={{
						display: "none",
						visibility: "hidden",
					}}
				></iframe>
			</noscript> */}
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
