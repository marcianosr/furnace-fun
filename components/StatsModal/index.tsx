import React, { FC } from "react";
import { useLocalStorage } from "react-use";
import SpeechBubble from "../SpeechBubble";
import Social from "../Social";
import styles from "./styles.module.css";

export type StatsModalProps = {
	isOpen: boolean;
};

const StatsModal: FC<StatsModalProps> = ({ isOpen }) => {
	const [stats] = useLocalStorage<any>("stats");

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
						<SpeechBubble>
							<button onClick={() => window.location.reload()}>
								REPLAY
							</button>
						</SpeechBubble>

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
								Have some feedback or problems playing?
							</SpeechBubble>
						</div>

						<Social className={styles.social} />
					</section>
				</section>
			</section>
		</dialog>
	);
};

export default StatsModal;
