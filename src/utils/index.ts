/**
 * 주어진 사이즈에 따라 그리드를 생성하는 함수입니다.
 * 각 셀은 랜덤하게 true 또는 false 값을 가집니다.
 *
 * @param gridSize 그리드의 크기
 * @returns 생성된 그리드
 */
export const crateGrid = (gridSize: number): boolean[][] => {
		return Array(gridSize).fill(false).map(() =>
			Array(gridSize).fill(false).map(() => Math.random() > 0.5),
		);
};

/**
 * 주어진 위치에서 시작하여 연결된 모든 풍선의 위치를 반환하는 함수입니다.
 *
 * @param grid 현재 그리드
 * @param row 시작 위치의 행
 * @param col 시작 위치의 열
 * @returns 연결된 풍선들의 위치 배열
 */
const getConnectedBalloons = (grid: boolean[][], row: number, col: number): number[][] => {

		const arrCheck = Array(grid.length).fill(null).map(() => Array(grid[0].length).fill(false));

		const connectedBalloons: number[][] = [];


		const searchConnectedBalloons = (r: number, c: number) => {
				const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // 상, 하, 좌, 우

				if (r < 0 || r >= grid.length
					|| c < 0 || c >= grid[0].length
					|| arrCheck[r][c] || !grid[r][c]
				) {
						return;
				}

				arrCheck[r][c] = true;
				connectedBalloons.push([r, c]);

				for (let i = 0; i < directions.length; i++) {
						searchConnectedBalloons(r + directions[i][0], c + directions[i][1]);
				}
		};

		searchConnectedBalloons(row, col);
		return connectedBalloons;
};

/**
 * 주어진 위치에서 시작하여 연결된 모든 풍선의 크기와 위치를 반환하는 함수입니다.
 *
 * @param grid 현재 그리드
 * @param row 시작 위치의 행
 * @param col 시작 위치의 열
 * @returns 연결된 풍선들의 크기와 위치
 */
export const getConnectedBalloonsSizeAndLocation = (grid: boolean[][], row: number, col: number): {
		size: number,
		coors: number[][]
} => {
		const connectedBalloons = getConnectedBalloons(grid, row, col);
		const size = connectedBalloons.length;
		return { size, coors: connectedBalloons };
};

/**
 * 그리드의 모든 셀에 대해 연결된 풍선들의 크기와 위치를 반환하는 함수입니다.
 *
 * @param grid 현재 그리드
 * @returns 모든 셀의 연결된 풍선들의 크기와 위치
 */
export const getAllConnectedBalloons = (grid: boolean[][]): {
		size: number,
		coors: number[][]
}[][] => {
		const allConnectedBalloons: { size: number, coors: number[][] }[][] = [];

		for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
				const row = grid[rowIndex];
				const rowResult: { size: number, coors: number[][] }[] = [];

				for (let cellIndex = 0; cellIndex < row.length; cellIndex++) {
						const cellResult = getConnectedBalloonsSizeAndLocation(grid, rowIndex, cellIndex);
						rowResult.push(cellResult);
				}

				allConnectedBalloons.push(rowResult);
		}

		return allConnectedBalloons;
};

/**
 * 그리드의 모든 셀에 대해 연결된 풍선들 중 가장 큰 크기를 반환하는 함수입니다.
 *
 * @param allConnectedBalloons 모든 셀의 연결된 풍선들의 크기와 위치
 * @returns 가장 큰 풍선의 크기
 */
export const getMaxSizeOfConnectedBalloons = (allConnectedBalloons: {
		size: number,
		coors: number[][]
}[][]): number => {
		let maxSize = 0;

		for (let rowIndex = 0; rowIndex < allConnectedBalloons.length; rowIndex++) {
				for (let cellIndex = 0; cellIndex < allConnectedBalloons[rowIndex].length; cellIndex++) {
						if (allConnectedBalloons[rowIndex][cellIndex].size > maxSize) {
								maxSize = allConnectedBalloons[rowIndex][cellIndex].size;
						}
				}
		}

		return maxSize;
};

/**
 * 주어진 좌표의 풍선들을 false로 설정하여 풍선을 터트리는 함수입니다.
 *
 * @param prevGrid 이전 그리드
 * @param coors 터트릴 풍선들의 좌표
 * @returns 풍선이 터진 후의 그리드
 */
export const setConnectedBalloonsToFalse = (prevGrid: boolean[][], coors: number[][]): boolean[][] => {
		const newGrid = [...prevGrid];
		coors.forEach(([row, col]) => {
				newGrid[row][col] = false;
		});
		return newGrid;
};