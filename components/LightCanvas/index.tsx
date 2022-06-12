import classNames from "classnames";
import React, { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
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

	useLayoutEffect(() => {
		// const desktopWidthLights = 55;
		// const desktopHeightLights = 20;

		const desktopWidthLights = 56;
		const desktopHeightLights = 21;

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
			<div className={classNames(styles.lightContainer, styles.top)}>
				{[...Array(lights.amountW).keys()].map((idx) => (
					<div key={idx} className={styles.light}></div>
				))}
			</div>
			<div className={classNames(styles.lightContainer, styles.left)}>
				{[...Array(lights.amountH).keys()].map((idx) => (
					<div key={idx} className={styles.light}></div>
				))}
			</div>
			<div className={classNames(styles.lightContainer, styles.bottom)}>
				{[...Array(lights.amountW).keys()].map((idx) => (
					<div key={idx} className={styles.light}></div>
				))}
			</div>
			<div className={classNames(styles.lightContainer, styles.right)}>
				{[...Array(lights.amountH).keys()].map((idx) => (
					<div key={idx} className={styles.light}></div>
				))}
			</div>
		</div>
	);
};

export default LightCanvas;
