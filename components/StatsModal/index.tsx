import React, { FC } from "react";
import { useLocalStorage } from "react-use";
import { useCountdown } from "../../hooks/useCountdown";
import SpeechBubble from "../SpeechBubble";
import styles from "./styles.module.css";

export type StatsModalProps = {
	time: { hours: number; minutes: number; seconds: number };
	isOpen: boolean;
};

const StatsModal: FC<StatsModalProps> = ({ isOpen, time }) => {
	const [stats] = useLocalStorage<any>("stats");
	const [_, hours, minutes, seconds] = useCountdown(stats.date);

	return (
		<dialog open={isOpen} className={styles.statsModal}>
			<section>
				<SpeechBubble
					mug={"gruntilda.gif"}
					width={170}
					height={170}
					largeMug
				>
					{stats.correctAnswer ? (
						<p>
							Your answer was correct, you were in luck, tomorrow
							I will test some more BK intellect!
						</p>
					) : (
						<p>
							You numbskull had it wrong, come back tomorrow and
							have it wrong again all day long!
						</p>
					)}
				</SpeechBubble>
				<h1>Stats</h1>

				<ul>
					<SpeechBubble>
						<li>Total questions answered: {stats.gamesPlayed}</li>
					</SpeechBubble>
					<SpeechBubble>
						<li>Max. streak: {stats.maxStreak}</li>
					</SpeechBubble>
					<SpeechBubble>
						<li>Current streak: {stats.currentStreak}</li>
					</SpeechBubble>
				</ul>

				<SpeechBubble>
					<span className={styles.text}>
						Play the next three questions in: {Math.max(hours, 0)}:
						{Math.max(minutes, 0)}:{Math.max(seconds, 0)}
					</span>
				</SpeechBubble>
				<ul>
					<SpeechBubble>
						<li className={styles.text}>
							Have some feedback or problems playing?
						</li>
					</SpeechBubble>
					<SpeechBubble>
						<a
							href="https://forms.gle/vgaWQnhYm9M5jVNp6"
							target={"_blank"}
							rel="noreferrer"
							className={styles.text}
						>
							Send your ideas
						</a>
					</SpeechBubble>
					<SpeechBubble>
						<a
							target={"_blank"}
							rel="noreferrer"
							className={styles.text}
							href="mailto:msrschildmeijer@gmail.com"
						>
							Email me
						</a>
					</SpeechBubble>
					<SpeechBubble>
						<a
							target={"_blank"}
							rel="noreferrer"
							className={styles.text}
							href="https://twitter.com/MarcianoSRS/"
						>
							Send me a tweet
						</a>
					</SpeechBubble>
				</ul>
			</section>
		</dialog>
	);
};

export default StatsModal;
