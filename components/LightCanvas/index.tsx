import classNames from "classnames";
import React, { FC, useEffect, useRef, useState } from "react";
import { useMedia } from "react-use";
import styles from "./styles.module.css";

type LightCanvasProps = {
	children: React.ReactNode;
};

const LightCanvas: FC<LightCanvasProps> = ({ children }) => {
	const targetRef = useRef<HTMLDivElement | null>(null);
	const [lights, setLights] = useState({
		amountW: 0,
		amountH: 0,
	});
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
	const isWide = useMedia("(min-width: 48rem)");

	useEffect(() => {
		const desktopWidthLights = 56;
		const desktopHeightLights = isWide ? 21 : 10;

		if (targetRef.current) {
			setDimensions({
				width: targetRef.current.offsetWidth,
				height: targetRef.current.offsetHeight,
			});

			setLights({
				amountW: Math.round(
					targetRef.current.offsetWidth / desktopWidthLights
				),
				amountH: Math.round(
					targetRef.current.offsetHeight / desktopHeightLights
				),
			});
		}
	}, []);

	return (
		<div ref={targetRef} className={styles.container}>
			{children}
			{isWide && (
				<div className={classNames(styles.lightContainer, styles.top)}>
					{[...Array(lights.amountW).keys()].map((idx) => (
						<div key={idx} className={styles.light}></div>
					))}
				</div>
			)}
			<div className={classNames(styles.lightContainer, styles.left)}>
				{[...Array(lights.amountH).keys()].map((idx) => (
					<div key={idx} className={styles.light}></div>
				))}
			</div>
			{isWide && (
				<div
					className={classNames(styles.lightContainer, styles.bottom)}
				>
					{[...Array(lights.amountW).keys()].map((idx) => (
						<div key={idx} className={styles.light}></div>
					))}
				</div>
			)}
			<div className={classNames(styles.lightContainer, styles.right)}>
				{[...Array(lights.amountH).keys()].map((idx) => (
					<div key={idx} className={styles.light}></div>
				))}
			</div>
		</div>
	);
};

export default LightCanvas;
