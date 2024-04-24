let addButton = document.querySelector("#add-button");
let addInput = document.querySelector("#add-input");
let content = document.querySelector(".content");
let todo = document.querySelector(".todo");
let html = document.querySelector("html");
let body = document.querySelector("body");
let completedSound = new Audio("../../todo-web/assets/completed.mp3");
let deleteSound = new Audio("../../todo-web/assets/delete.mp3");
let nothing = document.querySelector(".nothing");
let tasks = document.querySelectorAll(".task");
let upArrow = document.querySelector("#up-arrow");
let menu = document.querySelector("#menu");
let navbar = document.querySelector(".navbar");
let navClose = document.querySelector("#close");
let container = document.querySelector(".container");
let importantTasks = document.querySelector(
	".important-tasks .left-panel-task-list"
);
let allImportantTasks = document.querySelectorAll(
	".important-tasks .left-panel-task-list .left-panel-task"
);
let allCompletedTasks = document.querySelectorAll(
	".completed .left-panel-task-list .left-panel-task"
);
let completedTasks = document.querySelector(".completed .left-panel-task-list");
let noCompletedTask = document.querySelector("#no-completed-task");
let noImportantTask = document.querySelector("#no-important-task");
let loader = document.querySelector("#preloader");

let activityUrl = "https://www.boredapi.com/api/activity";

// * Lists
let todoList = [];
let importantList = [];
let completedList = [];

// * Functions
async function getActivity() {
	try {
		let res = await axios.get(activityUrl);
		// console.log(res);
		return res.data.activity;
	} catch (error) {
		console.error(error);
		return "";
	}
}

async function mainCheckForEmpty() {
	if (todoList.length === 0 && !nothing.classList.contains("nothing-view")) {
		content.style.flexDirection = "row";
		let recActivity = await getActivity();
		content.style.justifyContent = "center";
		nothing.innerHTML = "Got nothing to do?" + "</br>" + recActivity;
		// console.log(nothing.innerHTML);
		nothing.classList.add("nothing-view");
	} else if (
		todoList.length !== 0 &&
		nothing.classList.contains("nothing-view")
	) {
		nothing.classList.remove("nothing-view");
		content.style.flexDirection = "column";
		content.style.justifyContent = "start";
	}
}

function impCheckForEmpty() {
	if (
		importantList.length === 0 &&
		!noImportantTask.classList.contains("display-unset")
	) {
		importantTasks.style.flexDirection = "row";
		importantTasks.style.justifyContent = "center";
		// console.log(noImportantTask.innerHTML);
		noImportantTask.classList.add("display-unset");
	} else if (
		importantList.length !== 0 &&
		noImportantTask.classList.contains("display-unset")
	) {
		noImportantTask.classList.remove("display-unset");
		importantTasks.style.flexDirection = "column";
		importantTasks.style.justifyContent = "start";
	}
}

function comCheckForEmpty() {
	if (
		completedList.length === 0 &&
		!noCompletedTask.classList.contains("display-unset")
	) {
		completedTasks.style.flexDirection = "row";
		completedTasks.style.justifyContent = "center";
		// console.log(noCompletedTask.innerHTML);
		noCompletedTask.classList.add("display-unset");
	} else if (
		completedList.length !== 0 &&
		noCompletedTask.classList.contains("display-unset")
	) {
		noCompletedTask.classList.remove("display-unset");
		completedTasks.style.flexDirection = "column";
		completedTasks.style.justifyContent = "start";
	}
}

function removeFromTodoList(word) {
	todoList.splice(todoList.indexOf(word), 1);
	// console.log(todoList);
}

function getValue() {
	let input = addInput.value;
	// console.log(todoList);
	addInput.value = "";
	return input;
}

function checkArrow() {
	setTimeout(() => {
		if (content.scrollTop !== 0) {
			upArrow.style.display = "unset";
		} else {
			upArrow.style.display = "none";
		}
		// console.log("running");
	}, 100);
}

function addTaskDom(input) {
	if (input != "") {
		todoList.push(input);
		let task = document.createElement("div");
		task.classList.add("task");
		let checkbox = document.createElement("input");
		checkbox.className = "done";
		checkbox.setAttribute("type", "checkbox");
		let taskText = document.createElement("span");
		taskText.innerText = input;
		taskText.classList.add("task-text", "breaking-text");

		let outlineStar = document.createElement("i");
		outlineStar.classList.add("fa-regular", "fa-star", "star");

		let trash = document.createElement("i");
		trash.classList.add("fa-solid", "fa-trash", "delete-task");

		task.appendChild(checkbox);
		task.appendChild(taskText);
		task.appendChild(outlineStar);
		task.appendChild(trash);
		content.appendChild(task);
		content.scrollTop = content.scrollHeight;
		mainCheckForEmpty();
		checkArrow();
	}
}

function addCompletedDom(inputText) {
	let task = document.createElement("div");
	task.classList.add("left-panel-task");
	let taskText = document.createElement("span");
	taskText.innerText = inputText;
	taskText.classList.add("left-panel-task-text");

	let trash = document.createElement("i");
	trash.classList.add("fa-solid", "fa-trash", "delete-task");

	task.appendChild(taskText);
	task.appendChild(trash);
	completedTasks.appendChild(task);
	completedTasks.scrollTop = content.scrollHeight;
}
function addImportantDom(inputText) {
	if (importantList.indexOf(inputText) === -1) {
		importantList.push(inputText);
		let task = document.createElement("div");
		task.classList.add("left-panel-task");
		let taskText = document.createElement("span");
		taskText.innerText = inputText;
		taskText.classList.add("left-panel-task-text");

		let addIcon = document.createElement("i");
		addIcon.classList.add("fa-solid", "fa-plus", "add-icon");

		let trash = document.createElement("i");
		trash.classList.add("fa-solid", "fa-trash", "delete-task");

		task.appendChild(taskText);
		task.appendChild(addIcon);
		task.appendChild(trash);
		importantTasks.appendChild(task);
		importantTasks.scrollTop = content.scrollHeight;
	}
}

// * Flow
for (let task of tasks) {
	todoList.push(task.querySelector(".task-text").innerText);
}

for (let element of allCompletedTasks) {
	completedList.push(element.innerText);
}

for (let element of allImportantTasks) {
	importantList.push(element.innerText);
}

mainCheckForEmpty();
impCheckForEmpty();
comCheckForEmpty();

// * Event Listeners

// ? Button Click Add
addButton.addEventListener("click", () => {
	addTaskDom(getValue());
});

// ? Enter Click add
addInput.addEventListener("keydown", (event) => {
	if (!navbar.classList.contains("slide-out")) {
		if (event.code == "Enter") {
			addTaskDom(getValue());
		}
	}
});

// ? Completed .done
content.addEventListener("click", (event) => {
	completedSound.pause();
	completedSound.currentTime = 0;
	if (event.target.classList.contains("done")) {
		// console.log("enter");
		removeFromTodoList(event.target.parentElement.innerText);
		completedList.push(event.target.parentElement.innerText);
		addCompletedDom(event.target.parentElement.innerText);
		comCheckForEmpty();
		setTimeout(() => {
			event.target.parentElement.remove();
			completedSound.play();
			mainCheckForEmpty();
			checkArrow();
		}, 200);
	}
});

// ? Remove .delete-task
content.addEventListener("click", (event) => {
	deleteSound.pause();
	deleteSound.currentTime = 0;
	if (event.target.classList.contains("delete-task")) {
		removeFromTodoList(event.target.parentElement.innerText);
		event.target.parentElement.remove();
		deleteSound.play();
		mainCheckForEmpty();
		checkArrow();
	}
});

// ? Focus with "Slash"
html.addEventListener("keydown", (event) => {
	if (!navbar.classList.contains("slide-out")) {
		if (event.code == "Slash") {
			setTimeout(() => {
				addInput.focus();
			}, 0);
		}
	}
});

// ? unfocus with esc
addInput.addEventListener("keydown", (event) => {
	if (event.key === "Escape") {
		addInput.blur();
	}
});

// ? Important .important
content.addEventListener("click", (event) => {
	if (
		event.target.classList.contains("star") &&
		!event.target.parentElement.classList.contains("important")
	) {
		event.target.classList.toggle("fa-solid");
		let importantTask = event.target.parentElement;
		importantTask.classList.add("important");
		importantTask.remove();
		importantTask
			.querySelector(".task-text")
			.classList.add("important-bold");
		content.insertAdjacentElement("afterbegin", importantTask);
		addImportantDom(importantTask.innerText);
		// console.log(importantList);
		impCheckForEmpty();
	} else if (
		event.target.classList.contains("star") &&
		event.target.parentElement.classList.contains("important")
	) {
		let importantTask = event.target.parentElement;
		event.target.classList.toggle("fa-solid");
		importantTask.classList.remove("important");
		importantTask.remove();
		content.insertAdjacentElement("beforeend", importantTask);
		importantTask
			.querySelector(".task-text")
			.classList.remove("important-bold");
	}
});

// ? Up arrow click
upArrow.addEventListener("click", () => {
	content.scrollTop = 0;
});

// ? Up arrow appear
content.addEventListener("scroll", () => {
	checkArrow();
});

// ? menu click
menu.addEventListener("click", () => {
	let navbarClasses = navbar.classList;
	// if (!container.classList.contains("stop-clicks")) {
	// 	container.classList.add("stop-clicks");
	// }
	if (!navbarClasses.contains("slide-out")) {
		// !
		menu.classList.toggle("display-none");
		navbarClasses.toggle("slide-out");
		if (navbarClasses.contains("slide-in")) {
			navbarClasses.toggle("slide-in");
		}
	}
});

// ? X clicked
navClose.addEventListener("click", () => {
	let navbarClasses = navbar.classList;
	// if (container.classList.contains("stop-clicks")) {
	// 	container.classList.remove("stop-clicks");
	// }
	if (!navbarClasses.contains("slide-in")) {
		navbarClasses.toggle("slide-in");
		// !
		if (navbarClasses.contains("slide-out")) {
			navbarClasses.toggle("slide-out");
		}
		setTimeout(() => {
			menu.classList.toggle("display-none");
			navbarClasses.remove("slide-in");
		}, 250);
	}
});

// ? Important task delete
importantTasks.addEventListener("click", (event) => {
	if (event.target.classList.contains("delete-task")) {
		event.target.parentElement.remove();
		importantList.splice(
			importantList.indexOf(event.target.parentElement.innerText),
			1
		);
		impCheckForEmpty();
		// console.log("importantList :>> ", importantList);
	}
});

// ? completed task delete
completedTasks.addEventListener("click", (event) => {
	if (event.target.classList.contains("delete-task")) {
		event.target.parentElement.remove();
		completedList.splice(
			completedList.indexOf(event.target.parentElement.innerText),
			1
		);
		comCheckForEmpty();
		// console.log("completedList :>> ", completedList);
	}
});

// ? Add task from important list
navbar.addEventListener("click", (event) => {
	if (event.target.classList.contains("add-icon")) {
		addTaskDom(event.target.parentElement.innerText);
	}
});

// ? close navbar on clicking anywhere
todo.addEventListener("click", () => {
	if (navbar.classList.contains("slide-out")) {
		navClose.click();
	}
});

// * -----------------------------
// ? Loading
window.addEventListener("load", () => {
	setTimeout(() => {
		loader.classList.add("hide-slowly");
	}, 700);
	setTimeout(() => {
		loader.classList.add("display-none");
	}, 950);
});
