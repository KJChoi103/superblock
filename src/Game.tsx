import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import "./utils/assets/App.scss";
import balloon from "./utils/balloon";
import swal from "./utils/sweetAlert";
import common from "./utils/common";

function Game() {

		const [gridSize, setGridSize] = useState<number>(0);
		const [grid, setGrid] = useState<boolean[][]>();
		const [searchParams, setSearchParams] = useSearchParams();

		/**
		 * 격자의 크기를 변경하는 함수입니다.
		 * 사용자가 입력한 크기를 받아와서 새로운 격자를 생성합니다.
		 */
		const askGridSize = () => {
				swal.getGridSizePopup().then((result) => {
						if (result === undefined || isNaN(parseInt(result))) {
								return;
						}

						setGridSize(parseInt(result));
						setGrid(balloon.create(parseInt(result)));
				});
		};

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

		/**
		 * URL에서 게임 상태를 가져와서 게임을 초기화하는 함수입니다.
		 */
		const setGameStateFromURL = () => {

				const gridSize = parseInt(searchParams.get("gridSize") as string);
				const grid = balloon.convertQueryStringToGrid(searchParams.get("grid") as string, gridSize);

				if (grid.length > 0) {
						setGridSize(gridSize);
						setGrid(grid);
				}
		};

		/**
		 * 게임을 초기화하는 함수입니다.
		 */
		const initializeGame = () => {
				if (gridSize === 0 || grid === undefined) {
						askGridSize();
				}
		};

		useEffect(() => {

				if (searchParams.has("gridSize") && searchParams.has("grid")) {
						setGameStateFromURL();
				} else {
						initializeGame();
				}
		}, []);

		useEffect(() => {

				searchParams.set("gridSize", gridSize.toString());
				searchParams.set("grid", balloon.convertGridToQueryString(grid));

				setSearchParams(searchParams);
		}, [gridSize, grid]);


		if (gridSize === 0 || grid === undefined) {
				return (<div>로딩 중...</div>);
		}

		const allConnectedBalloons = balloon.getAllConnectedBalloons(grid);


		return (
			<div className={"gameContainer"}>
					<div className={"buttonContainer"}>
							<div className="buttonInner">
									<div className={"buttonContainer-left"}>
											<button onClick={askGridSize}>격자 크기 변경</button>
											<button onClick={endGame}>새 게임</button>
									</div>
									<div className={"buttonContainer-right"}>
											<label className="switch">
													<input type="checkbox" onClick={common.handleDarkMode}/>
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

export default Game;
