import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from '../../App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    todoListID: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (filter: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
}

export function Todolist(props: TodolistPropsType) {

    const [newTitleTask, setNewTitleTask] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const tasksJSXElement = props.tasks.map((t: TaskType) => {
        const removeTask = () => props.removeTask(t.id, props.todoListID) /*удаляет таску*/
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
        } /*меняет чекбокс*/
        const isDoneStyle = t.isDone ? 'is-done' : ''
        return (
            <li className={isDoneStyle} key={t.id}><input type="checkbox" checked={t.isDone} onChange={changeTaskStatus}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>X</button>
            </li>
        )
    });

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        const newValue = e.currentTarget.value
        setNewTitleTask(newValue)
    } /*обнавляет поле ввода*/
    const addTask = () => {
        const trimmedTitle = newTitleTask.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.todoListID)
        } else {
            setError(true)
        }
        setNewTitleTask('')
    } /*добавляет таску*/
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    } /*добавляет таску с помощью Enter*/
    const onAllClickHandler = () => props.changeFilter('all',props.todoListID) /*выводит все таски*/
    const onActiveClickHandler = () => props.changeFilter('active',props.todoListID) /*выводит активные таски*/
    const onCompletedClickHandler = () => props.changeFilter('completed',props.todoListID) /*выводит выполненные таски*/
    const removeTodoList = () => props.removeTodoList(props.todoListID)
    const activeStyleAll = props.filter === 'all' ? 'active-filter' : ''
    const activeStyleActive = props.filter === 'active' ? 'active-filter' : ''
    const activeStyleCompleted = props.filter === 'completed' ? 'active-filter' : ''
    const errorStyleInput = error ? 'error' : ''
    const userMsg = error
        ? <div style={{color: 'red'}}>Title is required !</div>
        : <div>Enter title!</div>

    return (
        <div>
            <h3>{props.title} <button onClick={removeTodoList}>X</button></h3>
            <div>
                <input className={errorStyleInput} value={newTitleTask} onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>+</button>
                {userMsg}
            </div>
            <ul>
                {tasksJSXElement}
            </ul>
            <div>
                <button className={activeStyleAll} onClick={onAllClickHandler}>All</button>
                <button className={activeStyleActive} onClick={onActiveClickHandler}>Active</button>
                <button className={activeStyleCompleted}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}