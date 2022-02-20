// maybe use local storage?

const quote = document.querySelector("#quote");

//Time and Greeting
function presentTime() {
	const time = document.querySelector("#time");
	const greeting = document.querySelector("#greeting");
	const date = new Date();
	const hour = date.getHours();
	const minute = date.getMinutes();
	minuteText = minute < 10 ? `0${minute}` : minute;

	time.textContent = `${hour}:${minuteText}`;
	presentGreeting(greeting, hour);
}

function presentGreeting(greeting, hour) {
	if (hour >= 0 && hour <= 12) {
		greeting.textContent = "morning";
	} else if (hour > 12 && hour <= 16) {
		greeting.textContent = "afternoon";
	} else {
		greeting.textContent = "evening";
	}
}

setInterval(presentTime, 1000);

//three dots hover
const middleContainer = document.querySelectorAll(".middle-container");
middleContainer.forEach((container) =>
	container.addEventListener("mouseenter", showThreeDots)
);

middleContainer.forEach((container) =>
	container.addEventListener("mouseleave", hideThreeDots)
);

function showThreeDots(e) {
	console.log(e);
	e.target.lastElementChild.classList.toggle("-show");
}

function hideThreeDots(e) {
	e.target.lastElementChild.classList.toggle("-show");
}

// Todo Window
const toggleMenu = document.querySelectorAll(".toggle");
toggleMenu.forEach((toggle) => {
	toggle.addEventListener("click", showMenu);
});

function showMenu(e) {
	e.target.previousElementSibling.classList.toggle("-open");
}
