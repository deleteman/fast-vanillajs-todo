function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
class ToDo {
    text = "";
    id = 0;
    selected = false;
    timer = null;
    
    
    constructor(text) {
        this.text = text;
        this.id = uuid()
        this.timer = null;
    }
    
    setTimer(timer) {
        this.timer = timer
    }
    
    toggle() {
        console.log("callingn toggle!")
        this.selected = !this.selected
        if(this.selected) {
            this.timer.stopTimer()
        } else {
            this.timer.startTimer()
        }
    }
    
} 

function endTask(taskId) {
    
    let todoList = document.getElementById("todolist")
    todoList.toggleTask(taskId)
}

function handleInput(evt) {
    evt.preventDefault()
    let todoList = document.getElementById("todolist")
    
    let newTodo = new ToDo(evt.target.newTask.value)
    evt.target.newTask.value = ""
    todoList.addTodo(newTodo)
    //todoList.setAttribute("todos", ["bola"])
}

function init(){
    document.getElementById("myform").addEventListener("submit", handleInput)
    
}