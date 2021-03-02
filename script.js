//THIS VARIABLE HOLDS ALL TODO OBJECTS
let todos = [];

const addButton = document.getElementById("add-item-icon");
addButton.addEventListener("click", createObject);

//GETTING INPUT ELEMENT
const todoTitle = document.getElementById("add-item");

/*USING THE KEYCODE (13) TO SET EVENT LISTENER
 *WHEN THE ENTER KEY IS PRESSED
 */
todoTitle.addEventListener("keyup", (event) => {
	if (event.keyCode === 13) {
		event.preventDefault();

		//CALLING THE CREATE OBJECT FUNCTION
		createObject();
	}
});

//FUNCTION: CREATES A NORMAL JAVASCRIPT OBJECT
function createObject() {
	let Todo = {
		title: "",
		checked: false,
		id: Date.now(),
	};

	const title = document.getElementById("add-item").value;
	Todo.title = title;

	//CHECKING IF THE TODO TITLE FIELD IS EMPTY
	if (!title == "") {
		todos.push(Todo);
		renderTodos();
	} else {
		alert("Todo cannot be empty");
	}
}

function renderTodos() {
	//CHECKING FOR A VALID TODO INPUT
	const title = document.getElementById("add-item").value;

	isToDoEmpty();

	//TODO ITEMS CONTAINER (DIV)
	const container = document.querySelector(".todo-items");

	container.innerHTML = "";

	todos.forEach((todo) => {
		createTodoCard(todo);
	});

	console.log(todos);
}

function createTodoCard(todo) {
	const container = document.querySelector(".todo-items");

	container.insertAdjacentHTML(
		"afterbegin",
		`
	<div class="todo-item" id="${todo.id}">
		<div class="top">
			<span onClick="checkOrUncheck(${todo.id}, this)" class="checked ${todo.id}">
				<i class="far fa-check-circle"></i>
			</span>

			<span onClick="checkOrUncheck(${todo.id}, this)" class="unchecked ${todo.id}">
				<i class="far fa-circle"></i>	
			</span>

		</div>

		<div class="low">

			<h4 class="title">${todo.title}</h4>

		</div>

		<span onClick="deleteItem(${todo.id})" class="delete-item ${todo.id}">
			<img class="delete" src="./images/remove_circle_outline-white-18dp.svg" alt="">
		</span>

	</div>
	<!-- END TODO ITEM -->	
`
	);

	if (todo.checked == true) {
		checkItem(todo.id);
	}
}

/*FUNCTION: DETERMINES THE DISPLAY OF THE EMPTY
 *TO DO LIST GRAPHICS BY CHECKING IF THE TODO ARRAY IS EMPTY
 */
function isToDoEmpty() {
	//EMPTY LIST INDICATIOR CONTAINER IN THE TODO-ITEMS CONTAINER
	let emptyIndicator = document.querySelector(".empty-list-message");

	//TERNARY CONDITION TO CHECK IF THE USER HAS ADDED A TODO ITEM
	todos.length > 0
		? (emptyIndicator.style.display = "none")
		: (emptyIndicator.style.display = "block");
}

//THE FOLLOWING CODE HANDLES THE MENU
let isOpen;

const menuButton = document.getElementById("open-menu");
menuButton.addEventListener("click", openOrCloseMenu);

const closeMenu = document.getElementById("close-menu");
closeMenu.addEventListener("click", openOrCloseMenu);
//END MENU CODE

//FUNCTION: TAKES CARE OF THE MOBILE MENU
function openOrCloseMenu() {
	let nav = document.getElementById("mobile-nav");

	isOpen
		? (((nav.style.visibility = "hidden"), (nav.style.opacity = 0)),
		  (isOpen = false))
		: (((nav.style.visibility = "visible"), (nav.style.opacity = 1)),
		  (isOpen = true));
}
//END OPEN OR CLOSE MENU FUNCTION

//FUNCTION: TAKES CARE OF THE CHECK AND UNCHECK BUTTONS
function checkOrUncheck(todoId, e) {
	const todoItem = document.getElementById(`${todoId}`);

	const checkButton = todoItem.children[0].children[0];
	const uncheckButton = todoItem.children[0].children[1];

	//IF THE CHECKBUTTON WAS CLICKED
	if (e.classList.contains("unchecked")) {
		console.log(e);
		checkButton.style.display = "block";
		uncheckButton.style.display = "none";

		//UPDATING THE TODO OBJECT
		todos.filter((todo) => {
			if (todo.id == todoId) {
				todo.checked = true;
				todoItem.classList.add("is-done");
			}
		});
	} else {
		//IF THE UNCHECK BUTTON WAS CLICKED
		checkButton.style.display = "none";
		uncheckButton.style.display = "block";

		//UPDATING THE TODO OBJECT
		todos.filter((todo) => {
			if (todo.id == todoId) {
				todo.checked = false;
				todoItem.classList.remove("is-done");
			}
		});
	}
}
//END CHECK OR UNCHECK FUNCTION

//FUNCTION: CONTROLS DELETION OF TODO ITEMS / NODES FROM THE PAGE
function deleteItem(todoId) {
	const todoItem = document.getElementById(`${todoId}`);

	todoItem.remove();

	todos.filter((todo) => {
		if (todo.id == todoId) {
			todos.splice(todo, 1);
		}
	});

	console.log(todos);

	isToDoEmpty();
}
//END DELETE ITEM FUNCTION
