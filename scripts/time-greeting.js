import { time, toggleTimeElement } from "./constant.js";

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

function presentTime() {
	const date = new Date();
	const hour = date.getHours();
	const minute = date.getMinutes();
	toggleTimeFormat(hour, minute);
	presentGreeting(hour);
}

const updateTimeEvent = () => setInterval(presentTime, 500);

export { updateTimeEvent };
