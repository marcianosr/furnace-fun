import React, { FC } from "react";
import { useLocalStorage } from "react-use";
import { useCountdown } from "../../hooks/useCountdown";
import RoundContainer from "../RoundContainer";
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
				<RoundContainer
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
				</RoundContainer>
				<h1>Stats</h1>

				<ul>
					<RoundContainer>
						<li>Played: {stats.gamesPlayed}</li>
					</RoundContainer>
					<RoundContainer>
						<li>Max. streak: {stats.maxStreak}</li>
					</RoundContainer>
					<RoundContainer>
						<li>Current streak: {stats.currentStreak}</li>
					</RoundContainer>
				</ul>

				<RoundContainer>
					<span className={styles.text}>
						Play the next question in: {hours}:{minutes}:{seconds}
					</span>
				</RoundContainer>
				<ul>
					<RoundContainer>
						<li className={styles.text}>
							Have some feedback or problems playing?
						</li>
					</RoundContainer>
					<RoundContainer>
						<a
							target={"_blank"}
							rel="noreferrer"
							className={styles.text}
							href="mailto:msrschildmeijer@gmail.com"
						>
							Email me
						</a>
					</RoundContainer>
					<RoundContainer>
						<a
							target={"_blank"}
							rel="noreferrer"
							className={styles.text}
							href="https://twitter.com/MarcianoSRS/"
						>
							Send me a tweet
						</a>
					</RoundContainer>
				</ul>
			</section>
		</dialog>
	);
};

export default StatsModal;
