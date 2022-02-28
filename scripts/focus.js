import {
	focusContainer,
	focusInput,
	focusTextContainer,
	focusOption,
} from "./constant.js";

function enterFocus(e) {
	const text = e.target.value;

	if (e.key === "Enter") {
		focusContainer.classList.add("hide-animation");

		focusContainer.addEventListener(
			"animationend",
			(e) => {
				e.target.classList.add("-hide");
				displayFocus(text);
				e.target.classList.remove("hide-animation");
			},
			{ once: true }
		);
	}
}

function focusContainerEvent(e) {
	e.target.classList.add("-hide");
	displayFocus(text);
	e.target.classList.remove("hide-animation");
}

function displayFocus(text) {
	const focusText = document.querySelector("#focus-text");
	focusText.textContent = text;

	focusTextContainer.classList.remove("-hide");
	focusTextContainer.classList.add("open-animation");
}

function changeFocus(e) {
	e.target.classList.remove("-open");
	e.target.classList.remove("open-animation");

	focusTextContainer.classList.remove("open-animation");
	focusTextContainer.classList.add("hide-animation");
	focusTextContainer.addEventListener(
		"animationend",
		(e) => {
			e.target.classList.add("-hide");
			e.target.classList.remove("hide-animation");
			bringBackFocusInput();
		},
		{ once: true }
	);
}

function bringBackFocusInput() {
	focusContainer.classList.remove("-hide");
	focusContainer.classList.add("open-animation");
}

const focusEvent = () => {
	focusInput.addEventListener("keydown", enterFocus);
	focusOption.addEventListener("click", changeFocus);
};

export { focusEvent };
