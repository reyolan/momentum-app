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
	if (toggleTimeElement.checked) {
		twelveHoursTime(time, hour, minute);
	} else {
		twentyFourHoursTime(time, hour, minute);
	}
}

function twentyFourHoursTime(timeElement, hour, minute) {
	minuteText = minute < 10 ? `0${minute}` : minute;
	hourText = hour < 10 ? `0${hour}` : hour;
	timeElement.textContent = `${hourText}:${minuteText}`;
}

function twelveHoursTime(timeElement, hour, minute) {
	minuteText = minute < 10 ? `0${minute}` : minute;
	hourText = hour % 12 || 12;
	timeElement.textContent = `${hourText}:${minuteText}`;
}

function presentGreeting(hour) {
	const greeting = document.querySelector("#greeting");
	if (hour >= 0 && hour < 12) {
		greeting.textContent = "morning";
	} else if (hour >= 12 && hour <= 18) {
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
	e.target.children[1].lastElementChild.classList.toggle("-show");
}

function hideThreeDots(e) {
	e.target.children[1].lastElementChild.classList.toggle("-show");
}

// Arrow Container Windows
const toggleMenu = document.querySelectorAll(".toggle");
toggleMenu.forEach((toggle) => {
	toggle.addEventListener("click", showMenu);
});

function showMenu(e) {
	e.target.previousElementSibling.classList.toggle("-open");
}

// Change Name
const inputName = document.querySelector("#name");
const editNameElement = document.querySelector(".select");

editNameElement.addEventListener("click", editName);
inputName.addEventListener("dblclick", editName);

function editName() {
	inputName.addEventListener("mousedown", (e) => e.preventDefault());
	inputName.readOnly = false;

	if (!inputName.readOnly) addAndRemovePulse(inputName);

	if (editNameElement.classList.contains("-open")) {
		editNameElement.classList.remove("-open");

		inputName.focus();
	}

	window.addEventListener("click", windowOnClick);
	window.addEventListener("keydown", windowOnClick);

	function windowOnClick(e) {
		if (
			(e.target !== inputName && e.target !== editNameElement) ||
			e.key === "Enter"
		) {
			// addAndRemovePulse(inputName);
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
	console.log(e.target.style.width);
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
	li.dataset.toDoIndex;

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
const focusInput = document.querySelector("#focus-text");

// Randomize Quote and Add Quote and apply immediately(?)
const quoteArr = [];

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
