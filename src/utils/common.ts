const common = {
		/**
		 * 다크 모드를 설정하는 함수입니다.
		 * @param event
		 */
		handleDarkMode: (event: any) => {
				document.documentElement.setAttribute("theme", event.target.checked ? "dark-mode" : "");
		}
}

export default common;
