import React, { useState } from "react";

import "./utils/assets/index.scss";
import balloon from "./utils/balloon";
import swal from "./utils/sweetAlert";

function App() {

		const [gridSize, setGridSize] = useState<number>(0);
		const [grid, setGrid] = useState<boolean[][]>();

		/**
		 * 격자의 크기를 변경하는 함수입니다.
		 * 사용자가 입력한 크기를 받아와서 새로운 격자를 생성합니다.
		 */
		const handleGrdSizeChange = () => {
				swal.getGridSizePopup().then((result) => {
						if (result === undefined || isNaN(parseInt(result))) {
								return;
						}

						setGridSize(parseInt(result));
						setGrid(balloon.create(parseInt(result)));
				});
		};

		/**
		 * 다크 모드를 설정하는 함수입니다.
		 * @param event
		 */
		const handleDarkMode = (event: any) => {
				document.documentElement.setAttribute("theme", event.target.checked ? "dark-mode" : "");
		};


		if (gridSize === 0 || grid === undefined) {
				handleGrdSizeChange();


				return (<div>로딩 중...</div>);
		}

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
				setGrid(balloon.create(gridSize));
		};

		return (
			<div className={"gameContainer"}>
					<div className={"buttonContainer"}>
							<div className="buttonInner">
									<div className={"buttonContainer-left"}>
											<button onClick={handleGrdSizeChange}>격자 크기 변경</button>
											<button onClick={endGame}>새 게임</button>
									</div>
									<div className={"buttonContainer-right"}>
											<label className="switch">
													<input type="checkbox" onClick={handleDarkMode}/>
													<span className="slider"></span>
											</label>
									</div>
							</div>
					</div>
					<div className={"gridContainer"}>
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
					</div>
			</div>

		);
}

export default App;
