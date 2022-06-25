import React, { FC } from "react";
import styles from "./styles.module.css";
import classnames from "classnames";

type SpeechBubbleProps = {
	children: React.ReactNode;
	mug?: string;
	width?: number;
	height?: number;
	largeMug?: boolean;
	isActive?: boolean;
	smallText?: boolean;
};

const SpeechBubble: FC<SpeechBubbleProps> = ({
	mug,
	children,
	width = 90,
	height = 90,
	largeMug = false,
	isActive = false,
	smallText = false,
}) => {
	return (
		<div className={styles.container}>
			{mug && (
				<img
					className={classnames(styles.mug, {
						[styles.largeMug]: largeMug,
						[styles.active]: isActive,
					})}
					src={`../mugs/${mug}`}
					width={width}
					height={height}
				/>
			)}
			<span
				className={classnames({
					[styles.smallText]: smallText,
				})}
			>
				{children}
			</span>
		</div>
	);
};

export default SpeechBubble;
