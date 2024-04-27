import React, { useState } from "react";

import "./App.scss";
import balloon from "./utils/balloon";
import swal from "./utils/sweetAlert";

type Grid = boolean[][];

function App() {

		const [grid, setGrid] = useState<Grid>(balloon.create(5));
		const allConnectedBalloons = balloon.getAllConnectedBalloons(grid);


		/**
		 * 사용자가 풍선을 클릭했을 때 호출되는 함수입니다.
		 * 현재 풍선의 크기가 가장 큰 풍선의 크기보다 작으면 에러를 표시하고,
		 * 그렇지 않으면 풍선을 터트리고 게임 종료 여부를 확인합니다.
		 *
		 * @param rowIndex 클릭된 풍선의 행 인덱스
		 * @param cellIndex 클릭된 풍선의 열 인덱스
		 */
		const handleBalloonClick = (rowIndex: number, cellIndex: number) => {
				const currentBalloon = allConnectedBalloons[rowIndex][cellIndex];
				const maxSize = balloon.getMaxSizeOfConnectedBalloons(allConnectedBalloons);

				if (maxSize > currentBalloon.size) {
						swal.showPopupMsg("패배하였습니다.");
						endGame();
				} else {
						popBalloonAndCheckEndGame(currentBalloon);
				}
		};

		/**
		 * 풍선을 터트리고 게임 종료 여부를 확인하는 함수입니다.
		 * 풍선을 터트린 후에 남아있는 풍선이 없으면 게임을 종료합니다.
		 *
		 * @param currentBalloon 터트릴 풍선의 정보
		 */
		const popBalloonAndCheckEndGame = (currentBalloon: { size: number, coors: number[][] }) => {
				const newGrid = balloon.setConnectedBalloonsToFalse(grid, currentBalloon.coors);
				setGrid(newGrid);

				const remainingBalloons = balloon.getAllConnectedBalloons(newGrid);
				const remainingMaxSize = balloon.getMaxSizeOfConnectedBalloons(remainingBalloons);

				if (remainingMaxSize === 0) {
						swal.showPopupMsg("게임 클리어!");
						endGame();
				}
		};

		/**
		 * 게임을 종료하고 새 게임을 시작하는 함수입니다.
		 */
		const endGame = () => {
				setGrid(balloon.create(5));
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
