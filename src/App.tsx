import React, { useState } from "react";
import "./App.css";
import {
		crateGrid,
		getAllConnectedBalloons,
		getMaxSizeOfConnectedBalloons,
		setConnectedBalloonsToFalse,
} from "./utils";

function App() {

		const [grid, setGrid] = useState<boolean[][]>(crateGrid(5));
		const allConnectedBalloons = getAllConnectedBalloons(grid);

		const handleBalloonClick = (rowIndex: number, cellIndex: number) => {
				const currentBalloon = allConnectedBalloons[rowIndex][cellIndex];
				const maxSize = getMaxSizeOfConnectedBalloons(allConnectedBalloons);

				if (maxSize > currentBalloon.size) {
						alert("터뜨릴 수 없습니다.");
				} else {
						popBalloonAndCheckEndGame(currentBalloon);
				}
		};

		const popBalloonAndCheckEndGame = (currentBalloon: { size: number, coors: number[][] }) => {
				const newGrid = setConnectedBalloonsToFalse(grid, currentBalloon.coors);
				setGrid(newGrid);

				const remainingBalloons = getAllConnectedBalloons(newGrid);
				const remainingMaxSize = getMaxSizeOfConnectedBalloons(remainingBalloons);

				if (remainingMaxSize === 0) {
						endGame();
				}
		};

		const endGame = () => {
				alert("게임 끝");
				setGrid(crateGrid(5));
		};

		return (
			<div className={"grid"}>
					{grid.map((row, rowIndex) => (
						<div key={rowIndex} className={"row"}>
								{row.map((cell, cellIndex) => (
									<div key={cellIndex} className={"cell"}>
											<button onClick={() => handleBalloonClick(rowIndex, cellIndex)}>
													{cell ? "🎈" : ""}
											</button>
									</div>
								))}
						</div>
					))}
			</div>
		);
}

export default App;
