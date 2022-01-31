let inputVal = document.querySelector("input[name='todo_input']");
let button = document.querySelector("button");
let todoDiv = document.querySelector(".todos");
var count = 0;
button.addEventListener("click", handelClick);
function handelClick(e) {
  e.preventDefault();
  let text = inputVal.value;
  const para = document.createElement("p");
  para.setAttribute("key", count);
  para.appendChild(document.createTextNode(text));
  todoDiv.append(para);
  inputVal.value = "";
  count += 1;
  console.log(para);
}
todoDiv.addEventListener("click", removebtn);
function removebtn(e) {
  todoDiv.removeChild(e.target);
}
let selectTag = document.querySelector("#dropDown");
selectTag.addEventListener("change", getTodoApi);
function getTodoApi() {
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      if (selectTag.value == "Completed") {
        if (todoDiv.hasChildNodes()) {
          while (todoDiv.firstChild) {
            todoDiv.removeChild(todoDiv.lastChild);
          }
        }
        let heading = document.createElement("h1");
        heading.appendChild(document.createTextNode("Completed Todo List"));
        todoDiv.appendChild(heading);
        let todoList = data.filter((item) => item.completed);
        // console.log(todoList);
        todoList.forEach((item, index) => {
          let para = document.createElement("p");
          para.setAttribute("key", index);
          para.appendChild(document.createTextNode(item.title));
          todoDiv.appendChild(para);
        });
      } else if (selectTag.value === "Pending") {
        if (todoDiv.hasChildNodes()) {
          while (todoDiv.firstChild) {
            todoDiv.removeChild(todoDiv.lastChild);
          }
        }
        let heading = document.createElement("h1");
        heading.appendChild(document.createTextNode("Pending Todo List"));
        todoDiv.appendChild(heading);
        let todoList = data.filter((item) => !item.completed);
        // console.log(todoList);
        todoList.forEach((element, index) => {
          let para = document.createElement("p");
          para.setAttribute("key", index);
          para.appendChild(document.createTextNode(element.title));
          todoDiv.appendChild(para);
        });
      }
    });
}
