class Task {
    constructor(text) {
        this.text = text;
        this.isDone = false;
    }
}

const dataService = {
    tasks: JSON.parse(localStorage.getItem("tasks")) || [],

    get allTasks() {
        return this.tasks;
    },

    get notCompletedTasks() {
        return this.tasks.filter(task => !task.isDone);
    },

    add(task) {
        this.tasks.push(task);
        this.save();
    },

    remove(task) {
        this.tasks = this.tasks.filter(t => t !== task);
        this.save();
    },

    save() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
}

class TasksListView {
    constructor(element) {
        this.element = element;
    }

    draw(tasks) {
        this.element.innerHTML = "";
        tasks.forEach(task => new TaskView(task).createIn(this.element));
    }

    drawAll() {
        if (dataService.allTasks.length === 0) return;
        this.draw(dataService.allTasks);
    }

    drawNotCompleted() {
        if (dataService.notCompletedTasks.length === 0) return;
        this.draw(dataService.notCompletedTasks);
    }
}

class TaskView {
    constructor(task) {
        this.task = task;
    }

    createIn(element) {
        const div = document.createElement("div");
        div.classList.add("task");
        if (this.task.isDone) div.classList.add("completed");

        const input = document.createElement("input");
        input.type = "checkbox";
        input.checked = this.task.isDone;
        input.addEventListener("click", () => this.changeState(div));

        const p = document.createElement("p");
        p.innerText = this.task.text;

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", () => this.deleteTask(div));

        div.append(input, p, deleteButton);
        element.append(div);
    }

    changeState(div) {
        this.task.isDone = !this.task.isDone;
        dataService.save();
        div.classList.toggle("completed");
    }

    deleteTask(div) {
        if (confirm("Delete this task?")) {
            dataService.remove(this.task);
            div.remove();
        }
    }
}

const taskNameInput = document.querySelector("#task-name-input");
const addTaskButton = document.querySelector("#add-task-btn");
const startMessage = document.querySelector("#start-message");
const showAllButton = document.querySelector("#show-all-btn");
const showNotCompletedButton = document.querySelector("#show-not-completed-btn");
const taskList = document.querySelector(".task-list");

const tasksListView = new TasksListView(taskList);

addTaskButton.addEventListener("click", addTaskHandler);
showAllButton.addEventListener("click", () => tasksListView.drawAll());
showNotCompletedButton.addEventListener("click", () => tasksListView.drawNotCompleted());

window.addEventListener("load", () => {
    if (dataService.allTasks.length > 0) {
        startMessage.hidden = true;
        tasksListView.drawAll();
    }
});

taskNameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTaskHandler();
});

function addTaskHandler() {
    const taskText = taskNameInput.value.trim();
    if (taskText) {
        startMessage.hidden = true;
        const newTask = new Task(taskText);
        dataService.add(newTask);
        tasksListView.drawAll();
        taskNameInput.value = "";
    } else {
        alert("Add you task");
    }
}