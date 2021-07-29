import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist/Todolist";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const [state, setState] = useState<Array<TaskType>>([
            {id: 1, title: "HTML&CSS", isDone: true},
            {id: 2, title: "JS", isDone: true},
            {id: 3, title: "ReactJS", isDone: false},
            {id: 4, title: "Redux", isDone: false},
        ]
    )

    const [filter, setFilter] = useState<FilterValuesType>("all")

    const removeTask = (taskID: number) => {
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
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
