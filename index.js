// maybe use local storage?

const time = document.querySelector("#time");
const greeting = document.querySelector("#greeting");

function presentTime() {
	const date = new Date();
	const hour = date.getHours();
	const minute = date.getMinutes();
	hourText = hour < 10 ? `0${hour}` : hour;
	minuteText = minute < 10 ? `0${minute}` : minute;

	time.textContent = `${hourText}:${minuteText}`;
	presentGreeting(hour);
}

function presentGreeting(hour) {
	if (hour >= 0 && hour <= 12) {
		greeting.textContent === "morning";
	} else if (hour > 12 && hour <= 16) {
		greeting.textContent === "afternoon";
	} else {
		greeting.textContent === "evening";
	}
}

setInterval(presentTime, 1000);
