import { quoteContainer, quoteElement, nextQuoteElement } from "./constant.js";

let quoteStorage = [
	"Great things happen to those who don't stop believing, trying, learning, and being grateful.",
	"Live as if you were to die tomorrow. Learn as if you were to live forever.",
	"Being a student is easy. Learning requires actual work.",
	"The beautiful thing about learning is nobody can take it away from you.",
	"Never bend your head. Always hold it high. Look the world straight in the eye.",
	"The master has failed more times than the beginner has even tried.",
	"The best time to plant a tree was twenty years ago, the second best time is right now.",
];

function randomizeQuote() {
	if (quoteElement.textContent) {
		quoteContainer.classList.add("hide-show-animation");
		quoteContainer.addEventListener("animationiteration", () => {
			quoteElement.textContent =
				quoteStorage[Math.floor(Math.random() * quoteStorage.length)];
		});

		quoteContainer.addEventListener(
			"animationend",
			(e) => e.target.classList.remove("hide-show-animation"),
			{ once: true }
		);
		return;
	}

	quoteElement.textContent =
		quoteStorage[Math.floor(Math.random() * quoteStorage.length)];
}

//Add Quote
const quoteListDom = document.querySelector("#quote-list");
const addQuoteButton = document.querySelector("#quote-button");
const quoteInputElement = document.querySelector("#quote-input");

addQuoteButton.addEventListener("click", addQuote);
quoteInputElement.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		addQuoteButton.click();
	}
});

function addQuote(e) {
	let quoteInput = e.target.previousElementSibling.value;
	if (quoteInput) {
		quoteStorage.push(quoteInput);
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
		quoteStorage = quoteStorage.filter(
			(quoteElement) => quoteElement !== quote
		);
	});

	li.appendChild(removeButton);

	quoteListDom.appendChild(li);
}

//Print initial quote list to DOM

function displayInitialQuoteList() {
	quoteStorage.forEach((quote) => {
		addQuoteToDom(quote);
	});
}

const quoteEvent = () => {
	window.addEventListener("load", randomizeQuote);
	window.addEventListener("load", displayInitialQuoteList);
	nextQuoteElement.addEventListener("click", randomizeQuote);
};

export { quoteEvent };
