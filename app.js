//Selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


//Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Function

function addTodo(event) {
  // prevent form from submitting
  event.preventDefault();

  //TODO DIV

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //Create LI

  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //add todo to local storage

  saveLocalTodos(todoInput.value)

  //CHECK MARK BUTTON

  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //CHECK Trash BUTTON

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //APPEND to list

  todoList.appendChild(todoDiv);

  //clear todo input value

  todoInput.value = "";
}

function deleteCheck(e) {
   const item = e.target;
   
   //delete todo
  
   if(item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;

    //Animation

    todo.classList.add("fall");
    todo.addEventListener('transitionend', function(){
       todo.remove();
    })
    
   }

   //Check mark

   if (item.classList[0] === "complete-btn"){
    const todo = item.parentElement;
    todo.classList.toggle('completed');
   }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo){
   switch(e.target.value) {
    case "all":
    todo.style.display = "flex";
    break;
    case "completed":
    if(todo.classList.contains('completed')){
        todo.style.display = "flex";
    } else{
        todo.style.display = "none";
    }
    break;
    case "uncompleted":
        if(!todo.classList.contains('completed')){
            todo.style.display = "flex";
        }
        else{
            todo.style.display = "none";
        }
        break;
   }
  });
}

function saveLocalTodos(todo){
    //Checking

    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}