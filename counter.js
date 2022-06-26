import { FASTElement,  html, css, when } from "https://cdn.jsdelivr.net/npm/@microsoft/fast-element/dist/fast-element.min.js";


/// Counter

const counterTemplate = html`
${when(x => x.todo && x.todo.selected, html`<fast-badge >Finished in ${x => x.secondsPassed} secs</fast-badge>`)}
`

const counterListStyles = css`
`

export class TaskTimeCounter extends FASTElement {
    static definition = {
        name: 'task-time-counter',
        template: counterTemplate,
        styles: counterListStyles,
        attributes: [
            'secondsPassed',
            'todoId'
        ]
    }
    
    secondsPassed = 0;
    timer = null;
    todo = null;
    
    startTimer() {
        console.log("starting timer...")
        this.secondsPassed = 0;
        this.timer = setInterval(() => this.secondsPassed +=1, 1000)
    }
    
    stopTimer() {
        console.log("stopping timer")
        clearInterval(this.timer)
    }
    
    connectedCallback() {
        super.connectedCallback()
        
        if(!this.timer) {
            let todoList = document.getElementById("todolist")
            this.todo = todoList.getById(this.getAttribute('todo-id'))
            this.todo.setTimer(this)
            
            this.startTimer()
            
        }
    }
    
}
FASTElement.define(TaskTimeCounter);