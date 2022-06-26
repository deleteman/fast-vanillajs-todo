import { FASTElement, html, css, repeat } from "https://cdn.jsdelivr.net/npm/@microsoft/fast-element/dist/fast-element.min.js";

const todoListStyles = css`
.done{
    text-decoration: line-through
}
.not-done {
    color: white;
    font-weight: bold;
}
`

/** Utility function **/
function trueTaskId(id) {
    return id.split("@")[0]
}

let template = html`
${repeat(x => x._tasksIds,html`
    <fast-card>
        <fast-accordion id="todo-list">
            <fast-accordion-item :id="${x => trueTaskId(x)}"  collapsed-icon="👇" expanded-icon="🤐">
                <span slot="heading">
                    <span 
                    :id="task-desc-${x => trueTaskId(x)}" 
                    class="${ x => {
                        return (x.indexOf("@") != -1) ? "done": "not-done"
                    }}">
                    ${ (x, c) => c.parent.todos[trueTaskId(x)].text}
                </span>
                <task-time-counter todo-id="${x => trueTaskId(x)}"></task-time-counter>
            </span>
            <fast-button appearance="accent" onclick="endTask('${x => trueTaskId(x)}')">Mark as ${ x => x.indexOf("@") != -1 ? "not": ""} done</fast-button>
        </fast-accordion-item>
    </fast-accordion>
</fast-card>
`
)}
`

export class TodoList extends FASTElement {
    static definition = {
        name: 'todo-list',
        template,
        styles: todoListStyles,
        attributes: [
        'todos', // same attr/prop
        '_tasksIds',
        ]
    };
    
    todos = {}
    _tasksIds = []
    
    toggleTask(id) {
        this.todos[id].toggle()
        
        let taskIdx = this._tasksIds.findIndex( tId => trueTaskId(tId) == id)
        if(this.todos[id].selected) {
            this._tasksIds.splice(taskIdx, 1, id + "@1")
        } else {
            this._tasksIds.splice(taskIdx, 1, id)
        }
    }
    
    getById(id) {
        return this.todos[id]
    }
    
    addTodo(todo) {
        console.log("adding todo ")
        this.todos[todo.id] = todo
        this._tasksIds.push(todo.id)
    }
    
}
FASTElement.define(TodoList);
