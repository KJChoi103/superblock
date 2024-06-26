import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const swal = {
		/**
		 * 패배 메시지를 표시하고 사용자가 확인 버튼을 누르면 새 게임을 시작합니다.
		 *
		 * @param msg
		 */
		showPopupMsg: (msg: string) => {
				withReactContent(Swal).fire({
						title: `<i>${msg}</i>`,
						confirmButtonText: "새 게임 시작",
				});
		},

		getGridSizePopup: () => {
				return withReactContent(Swal).fire({
						title: "격자의 크기를 입력하세요",
						input: "number",
						inputAttributes: {
								min: "0",
								step: "1",
						},
						confirmButtonText: "시작",
						allowOutsideClick: false,
						allowEscapeKey: false,
				}).then((result) => result.value);
		},
};

export default swal;
