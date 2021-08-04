import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const [state, setState] = useState<Array<TaskType>>([
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
        ]
    )

    const [filter, setFilter] = useState<FilterValuesType>("all")

    const addTask = (title: string) => {
        const newTask: TaskType = {id: v1(), title, isDone: false}
        setState([newTask, ...state])
    }

    const removeTask = (taskID: string) => {
        const NewStateArr = state.filter(t => t.id !== taskID)
        setState(NewStateArr)
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    let tasksForTodolist = state;
    if (filter === "active") {
        tasksForTodolist = state.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        tasksForTodolist = state.filter(t => t.isDone === true)
    }


    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasksForTodolist} removeTask={removeTask}
                      changeFilter={changeFilter} addTask={addTask}/>
        </div>
    );
}

export default App;
