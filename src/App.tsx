import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist/Todolist';
import {v1} from 'uuid';
import AddItemForm from './components/AddItemForm/AddItemForm';

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, setTodoList] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListID_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: 'Beer', isDone: false},
            {id: v1(), title: 'Fish', isDone: true},
            {id: v1(), title: 'Meat', isDone: false},
            {id: v1(), title: 'Bread', isDone: true},
        ],
    })


    const addTask = (title: string, todoListID: string) => {
        const newTask: TaskType = {id: v1(), title, isDone: false}
        tasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks({...tasks})
    }

    const removeTask = (taskID: string, todoListID: string) => {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks({...tasks})
    }

    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        tasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, isDone} : t)
        setTasks({...tasks})
    }

    const changeTaskTitle = (taskID: string, newTitle: string, todolistID: string) => {
        tasks[todolistID] = tasks[todolistID].map(t => t.id === taskID ? {...t, title: newTitle} : t)
        setTasks({...tasks})
    }

    const changeTodolistTitle = (newTitle: string, todoListID: string) => {
        setTodoList(todoLists.map(tl => tl.id === todoListID ? {...tl, title: newTitle}: tl))
    }

    const changeFilter = (filter: FilterValuesType, todoListID: string) => {
        setTodoList(todoLists.map(tl => tl.id === todoListID ? {...tl, filter} : tl))
    }

    const removeTodoList = (todoListID: string) => {
        setTodoList(todoLists.filter(tl => tl.id !== todoListID))
        const copyTask = {...tasks}
        delete copyTask[todoListID]
        setTasks(copyTask)
    }

    const addTodolist = (title: string) => {
        const newTodolistID = v1()
        const newTodolist: TodoListType = {id: newTodolistID, title, filter: 'all'}
        setTodoList([...todoLists, newTodolist])
        setTasks({...tasks, [newTodolistID]: []})
    }


    const todoListComponents = todoLists.map(tl => {

        let tasksForTodolist = tasks[tl.id];
        if (tl.filter === 'active') {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false)
        }
        if (tl.filter === 'completed') {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true)
        }

        return (
            <Todolist
                key={tl.id}
                todoListID={tl.id}
                title={tl.title}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                filter={tl.filter}
                changeTaskStatus={changeTaskStatus}
                removeTodoList={removeTodoList}
                changeTaskTitle={changeTaskTitle}
                changeTodolistTitle={changeTodolistTitle}
            />
        )
    })

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todoListComponents}
        </div>
    );
}

export default App;
