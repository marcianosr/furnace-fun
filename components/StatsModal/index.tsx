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
				<section className={styles.statsContainer}>
					<h1 className={styles.title}>Stats</h1>

					<section className={styles.bubbleContainer}>
						<div className={styles.score}>
							<SpeechBubble smallText={true}>
								Total questions answered: {stats.gamesPlayed}
							</SpeechBubble>
							<SpeechBubble smallText={true}>
								Max. streak: {stats.maxStreak}
							</SpeechBubble>
							<SpeechBubble smallText={true}>
								Current streak: {stats.currentStreak}
							</SpeechBubble>
						</div>
						<div className={styles.nextGame}>
							<SpeechBubble smallText={true}>
								Play the next three questions in:{" "}
								{Math.max(hours, 0)}:{Math.max(minutes, 0)}:
								{Math.max(seconds, 0)}
							</SpeechBubble>
							<SpeechBubble smallText={true}>
								Have some feedback or problems playing?
							</SpeechBubble>
						</div>

						<div className={styles.social}>
							<SpeechBubble smallText={true}>
								<a
									href="https://forms.gle/vgaWQnhYm9M5jVNp6"
									target={"_blank"}
									rel="noreferrer"
									className={styles.text}
								>
									Send your ideas
								</a>
							</SpeechBubble>
							<SpeechBubble smallText={true}>
								<a
									target={"_blank"}
									rel="noreferrer"
									className={styles.text}
									href="mailto:msrschildmeijer@gmail.com"
								>
									Email me
								</a>
							</SpeechBubble>
							<SpeechBubble smallText={true}>
								<a
									target={"_blank"}
									rel="noreferrer"
									className={styles.text}
									href="https://twitter.com/MarcianoSRS/"
								>
									Send me a tweet
								</a>
							</SpeechBubble>
						</div>
					</section>
				</section>
			</section>
		</dialog>
	);
};

export default StatsModal;
