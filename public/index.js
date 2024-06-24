let TODOS = JSON.parse(localStorage.getItem("data")) || [];

//Snippets takes the input given by the user in the form
document.getElementById("todo-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const inputField = event.target[0];
    TODOS.push({
        title: inputField.value,
        complete: false,
        id: self.crypto.randomUUID()
    });
    inputField.value = "";
    localStorage.setItem("data", JSON.stringify(TODOS));
    makeList();
});

//it is a fun called makelist to create the list on UI
function makeList() {
    const list = document.getElementById("todo-list");
    let HTML = ``;
    TODOS.forEach((todo) => {
        HTML += `
            <li id="${todo.id}" class="list-group-item">
                <input class="form-check-input me-1" type="checkbox" value="" aria-label="..." ${todo.complete ? 'checked' : ''} data-id="${todo.id}" />
                ${todo.title}
            </li>`
        ;
    });
    list.innerHTML = HTML;

    //it checks if the task was completed from the checkbox
    document.querySelectorAll('.form-check-input').forEach(checkbox => {
        checkbox.addEventListener('change', (event) => {
            if (event.target.checked) {
                removeTask(event.target.dataset.id);
            }
        });
    });
}

//removes the task based on the Unique ID provided
function removeTask(id) {
    TODOS = TODOS.filter(todo => todo.id !== id);
    localStorage.setItem("data", JSON.stringify(TODOS));
    makeList();
}

//to avoid the DOM loading error
document.addEventListener('DOMContentLoaded', (event) => {
    makeList();
});