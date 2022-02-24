//Time and Greeting
const time = document.querySelector("#time");
const toggleTimeElement = document.querySelector("#toggle-time-format");

function presentTime() {
	const date = new Date();
	const hour = date.getHours();
	const minute = date.getMinutes();
	toggleTimeFormat(hour, minute);
	presentGreeting(hour);
}

function toggleTimeFormat(hour, minute) {
	let hourText;
	if (toggleTimeElement.checked) hourText = hour % 12 || 12;
	else hourText = hour < 10 ? `0${hour}` : hour;

	const minuteText = minute < 10 ? `0${minute}` : minute;
	time.textContent = `${hourText}:${minuteText}`;
}

function presentGreeting(hour) {
	const greeting = document.querySelector("#greeting");
	if (hour >= 0 && hour < 12) {
		greeting.textContent = "morning";
	} else if (hour >= 12 && hour < 18) {
		greeting.textContent = "afternoon";
	} else {
		greeting.textContent = "evening";
	}
}

setInterval(presentTime, 500);

// hover three dots
const middleContainer = document.querySelectorAll(".middle-container");
middleContainer.forEach((container) =>
	container.addEventListener("mouseenter", showThreeDots)
);

middleContainer.forEach((container) =>
	container.addEventListener("mouseleave", hideThreeDots)
);

function showThreeDots(e) {
	e.target.children[1].lastElementChild.classList.add("-show");
}

function hideThreeDots(e) {
	e.target.children[1].lastElementChild.classList.remove("-show");
}

// Arrow Container Windows
const toggleMenu = document.querySelectorAll(".toggle");
toggleMenu.forEach((toggle) => {
	toggle.addEventListener("click", showMenu);
});

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

// Change Name
const inputName = document.querySelector("#name");
const editNameElement = document.querySelector(".select");

editNameElement.addEventListener("click", editName);
inputName.addEventListener("dblclick", editName);

function editName() {
	inputName.readOnly = false;
	inputName.focus();
	inputName.addEventListener("mousedown", (e) => e.preventDefault());

	if (!inputName.readOnly) addAndRemovePulse(inputName);

	if (editNameElement.classList.contains("-open")) {
		editNameElement.classList.remove("-open");
		inputName.focus();
	}

	window.addEventListener("click", windowOnClick);
	window.addEventListener("keydown", windowOnClick);

	function windowOnClick(e) {
		if (
			// (e.target !== inputName &&
			// 	e.target !== editNameElement &&
			// 	document.activeElement === inputName) ||
			e.key === "Enter" &&
			document.activeElement === inputName
		) {
			addAndRemovePulse(inputName);
			inputName.readOnly = true;
		}
	}
}

function addAndRemovePulse(element) {
	element.classList.add("pulse-animation");

	element.addEventListener("animationend", (e) =>
		e.target.classList.remove("pulse-animation")
	);
}

inputName.addEventListener("keydown", increaseInputWidth);

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

//To-do List
const toDoInput = document.querySelector("#todo-input");
const toDoContent = document.querySelector("#todo-content");
const ul = document.querySelector("#todo-content>ul");

toDoInput.addEventListener("keydown", enterToDoInput);

function enterToDoInput(e) {
	if (e.key === "Enter" && e.target.value) {
		addListToDom(e.target.value);
		e.target.value = "";
	}
}

function addListToDom(toDoText) {
	const li = document.createElement("li");

	const checkbox = document.createElement("input");
	checkbox.setAttribute("type", "checkbox");
	checkbox.addEventListener("click", strikeThroughText);
	li.appendChild(checkbox);

	const p = document.createElement("p");
	p.classList.add("todo-text");
	p.textContent = toDoText;
	li.appendChild(p);

	const removeButton = document.createElement("span");
	removeButton.classList.add("remove-button");
	removeButton.textContent = "✖";
	removeButton.addEventListener("click", (e) => e.target.parentNode.remove());
	li.appendChild(removeButton);

	ul.appendChild(li);
}

function strikeThroughText(e) {
	e.target.nextSibling.style.textDecoration = e.target.checked
		? "line-through"
		: "";
}

// focus input
const focusInput = document.querySelector("#focus-input");
focusInput.addEventListener("keydown", enterFocus);
const focusContainer = document.querySelector(".focus-container");

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

const focusTextContainer = document.querySelector(
	"#middle-bottom-row .middle-container"
);

function displayFocus(text) {
	const focusText = document.querySelector("#focus-text");
	focusText.textContent = text;

	focusTextContainer.classList.remove("-hide");
	focusTextContainer.classList.add("open-animation");
}

const focusOption = document.querySelector("#focus");
focusOption.addEventListener("click", changeFocus);

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
	focusContainer.add("open-animation");
	// focusContainer.classList.add("open-animation");
}

// Randomize Quote
let quoteArr = [
	"Great things happen to those who don't stop believing, trying, learning, and being grateful.",
	"Live as if you were to die tomorrow. Learn as if you were to live forever.",
	"Being a student is easy. Learning requires actual work.",
	"The beautiful thing about learning is nobody can take it away from you.",
	"Never bend your head. Always hold it high. Look the world straight in the eye.",
	"The master has failed more times than the beginner has even tried.",
	"The best time to plant a tree was twenty years ago, the second best time is right now.",
];

const quoteElement = document.querySelector("#quote");
window.addEventListener("load", randomizeQuote);

const nextQuoteElement = document.querySelector("#next-quote");
nextQuoteElement.addEventListener("click", randomizeQuote);

const quoteContainer = document.querySelector(
	"#bottom-row > .middle-container"
);

function randomizeQuote() {
	if (quoteElement.textContent) {
		quoteContainer.classList.add("hide-show-animation");
		quoteContainer.addEventListener("animationiteration", () => {
			quoteElement.textContent =
				quoteArr[Math.floor(Math.random() * quoteArr.length)];
		});

		quoteContainer.addEventListener(
			"animationend",
			(e) => e.target.classList.remove("hide-show-animation"),
			{ once: true }
		);
		return;
	}

	quoteElement.textContent =
		quoteArr[Math.floor(Math.random() * quoteArr.length)];
}

//Add Quote
const quoteListDom = document.querySelector("#quote-list");
const addQuoteButton = document.querySelector("#quote-button");
addQuoteButton.addEventListener("click", addQuote);

function addQuote(e) {
	let quoteInput = e.target.previousElementSibling.value;
	if (quoteInput) {
		quoteArr.push(quoteInput);
		addQuoteToDom(quoteInput);
		e.target.previousElementSibling.value = "";
	}
}

function addQuoteToDom(quote) {
	const li = document.createElement("li");

	const p = document.createElement("p");
	p.textContent = quote;
	li.appendChild(p);

	const removeButton = document.createElement("span");
	removeButton.classList.add("remove-button");
	removeButton.textContent = "✖";
	removeButton.addEventListener("click", (e) => {
		e.target.parentNode.remove();
		quoteArr = quoteArr.filter((quoteElement) => quoteElement !== quote);
	});

	li.appendChild(removeButton);

	quoteListDom.appendChild(li);
}

// print initial quote list to DOM

function displayInitialQuoteList() {
	quoteArr.forEach((quote) => {
		addQuoteToDom(quote);
	});
}

displayInitialQuoteList();

// Settings Container

const toggleElement = document.querySelectorAll(
	"#settings-general-list .checkbox"
);

const toggleListSettings = document.querySelectorAll(".settings-toggle");

window.addEventListener("load", initializeToggleStates);

function initializeToggleStates() {
	for (let i = 0; i < toggleListSettings.length; i++) {
		if (!toggleListSettings[i].classList.contains("-hide")) {
			toggleElement[i].checked = true;
		}
	}
}

toggleElement.forEach((toggle) => {
	toggle.addEventListener("click", toggleElementDisplay);
});

function toggleElementDisplay() {
	for (let i = 0; i < toggleListSettings.length; i++) {
		if (!toggleElement[i].checked) {
			toggleListSettings[i].classList.add("-hide");
		} else {
			toggleListSettings[i].classList.remove("-hide");
		}
	}
}

const navLinks = document.querySelectorAll(".nav-link");
const settings = document.querySelectorAll(".settings-view");

navLinks.forEach((navLink) =>
	navLink.addEventListener("click", toggleSettingDisplay)
);

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

// // Window On Click
// window.addEventListener("click", windowOnClick);

// function windowOnClick(e) {
// 	const arrowContainer = document.querySelectorAll(".arrow-container");

// 	arrowContainer.forEach((container) => {
// 		if (e.target !== container) {
// 			container.classList.remove("-open");
// 		}
// 	});
// }

const mainContainer = document.querySelector("#main-container");
