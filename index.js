// maybe use local storage?

//TIME FORMAT (12-hr clock)

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
		setTimeout(() => {
			arrowContainerElement.classList.remove("-open");
			arrowContainerElement.classList.remove("hide-animation");
		}, 300);

		return;
	}
	arrowContainerElement.classList.add("open-animation");
	arrowContainerElement.classList.add("-open");
}

// Change Name
const inputName = document.querySelector("#name");
const editNameElement = document.querySelectorAll(".select");

editNameElement[0].addEventListener("click", editName);
inputName.addEventListener("dblclick", editName);

function editName() {
	inputName.readOnly = false;
	inputName.focus();
	inputName.addEventListener("mousedown", (e) => e.preventDefault());

	if (!inputName.readOnly) addAndRemovePulse(inputName);

	if (editNameElement[0].classList.contains("-open")) {
		editNameElement[0].classList.remove("-open");
		inputName.focus();
	}

	window.addEventListener("click", windowOnClick);
	window.addEventListener("keydown", windowOnClick);

	function windowOnClick(e) {
		if (
			(e.target !== inputName && e.target !== editNameElement[0]) ||
			e.key === "Enter"
		) {
			addAndRemovePulse(inputName);
			console.log(e.target);
			inputName.readOnly = true;
		}
	}
}

function addAndRemovePulse(element) {
	element.classList.toggle("pulse-animation");
	setTimeout(() => {
		element.classList.toggle("pulse-animation");
	}, 1000);
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

function enterFocus(e) {
	const focusContainer = document.querySelector(".focus-container");

	if (e.key === "Enter") {
		focusContainer.classList.add("hide-animation");
		const text = e.target.value;

		setTimeout(() => {
			focusContainer.classList.add("-hide");
			displayFocus(text);
		}, 300);

		e.target.value = "";
	}
}

function displayFocus(text) {
	const focusText = document.querySelector("#focus-text");
	focusText.textContent = text;

	const focusTextContainer = document.querySelector(
		"#middle-bottom-row > .middle-container"
	);
	focusTextContainer.classList.remove("-hide");
	focusTextContainer.classList.add("open-animation");
}

// Randomize Quote and Add Quote and apply immediately(?)
const quoteArr = [
	"Great things happen to those who don't stop believing, trying, learning, and being grateful.",
	"Live as if you were to die tomorrow. Learn as if you were to live forever.",
	"Being a student is easy. Learning requires actual work.",
	"The beautiful thing about learning is nobody can take it away from you.",
	"Never bend your head. Always hold it high. Look the world straight in the eye.",
];

const quoteElement = document.querySelector("#quote");
window.addEventListener("load", randomizeQuote);

const nextQuoteElement = document.querySelector("#next-quote");
nextQuoteElement.addEventListener("click", randomizeQuote);

const quoteContainer = document.querySelector(
	"#bottom-row > .middle-container > p"
);

function randomizeQuote() {
	if (quoteElement.textContent) {
		quoteContainer.classList.toggle("hide-show-animation");
		quoteContainer.addEventListener("animationiteration", () => {
			quoteElement.textContent =
				quoteArr[Math.floor(Math.random() * quoteArr.length)];
		});

		quoteContainer.addEventListener("animationend", (e) =>
			e.target.classList.toggle("hide-show-animation")
		);
		return;
	}

	quoteElement.textContent =
		quoteArr[Math.floor(Math.random() * quoteArr.length)];
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
