import { toDoInput } from "./constant.js";

function enterToDoInput(e) {
	if (e.key === "Enter" && e.target.value) {
		addListToDom(e.target.value);
		e.target.value = "";
	}
}

function addListToDom(toDoText) {
	const ul = document.querySelector("#todo-content>ul");
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

const toDoInputEvent = () =>
	toDoInput.addEventListener("keydown", enterToDoInput);

export { toDoInputEvent };
