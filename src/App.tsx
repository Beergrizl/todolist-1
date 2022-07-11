import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValueType
}
export type TasksStateType ={
    [key: string]: Array<TaskType>
}

function App() {

    function removeTask(id: string, todolistId: string) {
        let tasksObj = tasks[todolistId]
        tasks[todolistId] = tasksObj.filter(t => id !== t.id)
        setTasks({...tasks})
    }

    function addTask(title: string, todolistId: string) {
        let tasksObj = tasks[todolistId]
        let newTask = {id: v1(), title: title, isDone: false}
        tasks[todolistId] = [newTask, ...tasksObj]
        setTasks({...tasks})
    }

    function changeTaskStatus(id: string, value: boolean, todolistId: string) {
        let tasksObj = tasks[todolistId]
        let changedStatusTask = tasksObj.find(t => t.id === id)
        if (changedStatusTask)
            changedStatusTask.isDone = value
        setTasks({...tasks})
    }

    function changeFilter(value: FilterValueType, todolistId: string) {
        let todolist = todolists.find(t => t.id === todolistId)
        if (todolist)
            todolist.filter = value
        setTodolists([...todolists])
    }

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: v1(), title: 'What to learn', filter: 'active'},
        {id: v1(), title: 'What to by', filter: 'completed'}
    ])
    let todolistId1 = v1()
    let todolistId2 = v1()

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'RestApi', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
        ],
    })
    return (
        <div className="App">
            {
                todolists.map(tl => {
                    let taskForTodolist = tasks[tl.id]
                    if (tl.filter === 'active') {
                        taskForTodolist = taskForTodolist.filter(t => !t.isDone)
                    }
                    if (tl.filter === 'completed') {
                        taskForTodolist = taskForTodolist.filter(t => t.isDone)
                    }
                return <Todolist
                    key={tl.id}
                    todolistId={tl.id}
                    title={tl.title}
                    task={taskForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={tl.filter}/>
            })}

        </div>
    );
}

export default App;

