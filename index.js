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
	} else if (hour >= 12 && hour <= 16) {
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
	inputName.readOnly = false;

	if (editNameElement.classList.contains("-open")) {
		editNameElement.classList.remove("-open");
		inputName.focus();
	}

	window.addEventListener("click", windowOnClick);
	window.addEventListener("keydown", windowOnClick);

	function windowOnClick(e) {
		console.log(e.target);
		if (
			(e.target !== inputName && e.target !== editNameElement) ||
			e.key === "Enter"
		) {
			//transition background (opacity of white)
			inputName.readOnly = true;
		}
	}
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
		if (e.target.style.width === "10ch") return;
		e.target.style.width = `${(widthUnit += 1)}ch`;
	}

	if (e.key === "Backspace" && widthUnit > 1 && e.target.readOnly === false) {
		e.target.style.width = `${(widthUnit -= 1)}ch`;
	}
}

//To-do List Constructor

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
