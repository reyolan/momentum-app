import { inputName } from "./constant.js";

function askName() {
	const mainContainer = document.querySelector("#main-container");
	const askNameContainer = document.querySelector("#ask-name-container");

	const askName = document.querySelector("#ask-name");
	askName.addEventListener("keydown", (e) => {
		if (e.key === "Enter" && e.target.value) {
			inputName.value = e.target.value;
			inputName.style.width = `${askName.value.length + 1}ch`;

			askNameContainer.classList.add("hide-animation");

			askNameContainer.addEventListener("animationend", (e) => {
				e.target.classList.add("-hide");
				mainContainer.classList.add("open-animation");
				mainContainer.style.display = "flex";
			});
		}
	});
}

const askNameEvent = () => {
	window.addEventListener("load", askName);
};

export { askNameEvent };
