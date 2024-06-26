# 슈퍼블록 FE 과제전형 - 최경주

## 1. 풍선 터트리기 게임 제작

### 사용 기술
- Node.js(v20)
- React(v18)
- TypeScript(v4)
- SweetAlert2(v11)
- pnpm(v9)

### 실행 방법
1. 프로젝트 클론
```bash
git clone https://github.com/KJChoi103/superblock.git
```
2. 디렉토리 이동
```bash
cd superblock
```

3. 의존성 설치
```bash
npm install -g pnpm
pnpm install
```

4. 실행
```bash
pnpm start
```

### 구현 내용
- 풍선 터트리기 게임
- 풍선을 클릭 시 터지게 되며 상하좌우로 연결된 경우 같이 터지게 됩니다.
- 사용자는 한번에 가장 많은 풍선을 터뜨릴 수 있는 순서대로 풍선을 클릭해야 합니다.
- 위 조건에 맞지 않는 풍선을 클릭하면 게임에서 패배합니다.

### 선택 구현 내용
- 다크 모드로 전환할 수 있는 토글 버튼 구현 완료
- 게임 시작 시 격자의 크기를 사용자가 원하는 대로 조정할 수 있는 기능 구현 완료
- 게임 URL을 복사하여 공유할 경우, 게임을 현재 시점의 상태로 공유할 수 있는 기능 구현 완료

