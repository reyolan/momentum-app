import { middleContainer, toggleMenu } from "./constant.js";

function showThreeDots(e) {
	e.target.children[1].lastElementChild.classList.add("-show");
}

function hideThreeDots(e) {
	e.target.children[1].lastElementChild.classList.remove("-show");
}

function addAndRemovePulse(element) {
	element.classList.add("pulse-animation");

	element.addEventListener("animationend", (e) =>
		e.target.classList.remove("pulse-animation")
	);
}

function showMenu(e) {
	const arrowContainerElement = e.target.previousElementSibling;

	if (arrowContainerElement.classList.contains("open-animation")) {
		arrowContainerElement.classList.remove("open-animation");
		arrowContainerElement.classList.add("hide-animation");

		arrowContainerElement.addEventListener(
			"animationend",
			(e) => {
				e.target.classList.remove("-open");
				e.target.classList.remove("hide-animation");
			},
			{ once: true }
		);

		return;
	}
	arrowContainerElement.classList.add("open-animation");
	arrowContainerElement.classList.add("-open");
}

const hideShowThreeDots = () => {
	middleContainer.forEach((container) =>
		container.addEventListener("mouseenter", showThreeDots)
	);

	middleContainer.forEach((container) =>
		container.addEventListener("mouseleave", hideThreeDots)
	);
};

const hideShowArrowContainer = () =>
	toggleMenu.forEach((toggle) => {
		toggle.addEventListener("click", showMenu);
	});

export { hideShowThreeDots, hideShowArrowContainer, addAndRemovePulse };
