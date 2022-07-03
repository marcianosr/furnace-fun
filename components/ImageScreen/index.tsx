import React, { FC } from "react";
import styles from "./styles.module.css";

type ImageScreenProps = {
	url: string;
	time: number;
};

const ImageScreen: FC<ImageScreenProps> = ({ url, time }) => (
	<section className={styles.imageContainer}>
		<img src={url} width={"100%"} height={"100%"} />
		<section className={styles.timerContainer}>
			<span className={styles.timer}>{time}</span>
		</section>
	</section>
);

export default ImageScreen;
