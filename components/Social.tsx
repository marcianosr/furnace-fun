import React, { FC } from "react";
import SpeechBubble from "./SpeechBubble";
import classNames from "classnames";
import styles from "./Social.module.css";

type SocialProps = {
	className?: string;
	smallText?: boolean;
};

const Social: FC<SocialProps> = ({ className, smallText = true }) => {
	return (
		<div className={classNames(styles.social, className)}>
			<SpeechBubble smallText={smallText}>
				<a
					href="https://forms.gle/vgaWQnhYm9M5jVNp6"
					target={"_blank"}
					rel="noreferrer"
					className={styles.text}
				>
					Send your ideas
				</a>
			</SpeechBubble>
			<SpeechBubble smallText={smallText}>
				<a
					target={"_blank"}
					rel="noreferrer"
					className={styles.text}
					href="mailto:msrschildmeijer@gmail.com"
				>
					Email me
				</a>
			</SpeechBubble>
			<SpeechBubble smallText={smallText}>
				<a
					target={"_blank"}
					rel="noreferrer"
					className={styles.text}
					href="https://www.instagram.com/banjokazooiefurnacefun/"
				>
					Follow me on instagram
				</a>
			</SpeechBubble>
		</div>
	);
};

export default Social;
