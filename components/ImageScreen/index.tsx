import React, { FC } from "react";
import Image from "next/image";
import styles from "./styles.module.css";

type ImageScreenProps = {
	url: string;
	time: number;
	startTimer: () => void;
};

const ImageScreen: FC<ImageScreenProps> = ({ url, time, startTimer }) => (
	<section className={styles.imageContainer}>
		{/* <img src={url} width={"100%"} height={"100%"} /> */}
		<Image
			src={`/${url}`}
			layout="responsive"
			width={"100%"}
			height={"70%"}
			objectFit="cover"
			onLoadingComplete={startTimer}
		/>
		<section className={styles.timerContainer}>
			<span className={styles.timer}>{time}</span>
		</section>
	</section>
);

export default ImageScreen;
