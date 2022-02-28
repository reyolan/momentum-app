import { editNameElement, inputName } from "./constant.js";
import { addAndRemovePulse } from "./animation.js";

function editName() {
	inputName.readOnly = false;
	inputName.focus();

	if (!inputName.readOnly) addAndRemovePulse(inputName);

	if (editNameElement.classList.contains("-open")) {
		editNameElement.classList.remove("-open");
		inputName.focus();
	}

	window.addEventListener("click", windowOnClick);
	window.addEventListener("keydown", windowOnClick);

	function windowOnClick(e) {
		if (e.key === "Enter" && document.activeElement === inputName) {
			addAndRemovePulse(inputName);
			inputName.readOnly = true;
		}
	}
}

function increaseInputWidth(e) {
	if (!e.target.style.width) e.target.style.width = `2ch`;

	let widthUnit = parseInt(e.target.style.width, 10);

	if (
		e.target.value.length >= 1 &&
		e.key &&
		e.key.length === 1 &&
		e.target.readOnly === false
	) {
		if (e.target.style.width === "11ch") return;
		e.target.style.width = `${(widthUnit += 1)}ch`;
	}

	if (e.key === "Backspace" && widthUnit > 2 && e.target.readOnly === false) {
		e.target.style.width = `${(widthUnit -= 1)}ch`;
	}
}

const editAndInputNameEvent = () => {
	editNameElement.addEventListener("click", editName);
	inputName.addEventListener("dblclick", editName);
	inputName.addEventListener("mousedown", (e) => e.preventDefault());
	inputName.addEventListener("keydown", increaseInputWidth);
};

export { editAndInputNameEvent };
