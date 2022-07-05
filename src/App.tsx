import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {
    let [filter, setFilter] = useState<FilterValueType>('all')
    let [task, setTask] = useState([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'RestApi', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: true},
    ])

    function removeTask(id: string) {
        let filteredTask = task.filter(t => id !== t.id)
        setTask(filteredTask)
    }

    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        setTask([newTask, ...task])
    }

    let taskForTodolist = task
    if (filter === 'active') {
        taskForTodolist = task.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        taskForTodolist = task.filter(t => t.isDone)
    }

    function changeFilter(value: FilterValueType) {
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      task={taskForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}/>
        </div>
    );
}

export default App;

