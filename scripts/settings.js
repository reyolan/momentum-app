import { toggleElement, toggleListSettings, navLinks } from "./constant.js";

function initializeToggleStates() {
	for (let i = 0; i < toggleListSettings.length; i++) {
		if (!toggleListSettings[i].classList.contains("-hide")) {
			toggleElement[i].checked = true;
		}
	}
}

function toggleElementDisplay() {
	for (let i = 0; i < toggleListSettings.length; i++) {
		if (!toggleElement[i].checked) {
			toggleListSettings[i].classList.add("-hide");
		} else {
			toggleListSettings[i].classList.remove("-hide");
		}
	}
}

function toggleSettingDisplay(e) {
	if (e.target.textContent === "General") {
		settings[0].classList.remove("-hide");
		settings[1].classList.add("-hide");
		settings[2].classList.add("-hide");
	} else if (e.target.textContent === "Quote") {
		settings[0].classList.add("-hide");
		settings[1].classList.remove("-hide");
		settings[2].classList.add("-hide");
	} else {
		settings[0].classList.add("-hide");
		settings[1].classList.add("-hide");
		settings[2].classList.remove("-hide");
	}
}

const settingsEvent = () => {
	window.addEventListener("load", initializeToggleStates);
	toggleElement.forEach((toggle) => {
		toggle.addEventListener("click", toggleElementDisplay);
	});

	navLinks.forEach((navLink) =>
		navLink.addEventListener("click", toggleSettingDisplay)
	);
};

export { settingsEvent };
