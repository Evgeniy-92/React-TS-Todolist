import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from '../../App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
}

export function Todolist(props: TodolistPropsType) {

    const [newTitleTask, setNewTitleTask] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const tasksJSXElement = props.tasks.map((t: TaskType) => {
        const removeTask = () => props.removeTask(t.id) /*удаляет таску*/
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked)
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
            props.addTask(trimmedTitle)
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
    const onAllClickHandler = () => props.changeFilter('all') /*выводит все таски*/
    const onActiveClickHandler = () => props.changeFilter('active') /*выводит активные таски*/
    const onCompletedClickHandler = () => props.changeFilter('completed') /*выводит выполненные таски*/
    const activeStyleAll = props.filter === 'all' ? 'active-filter' : ''
    const activeStyleActive = props.filter === 'active' ? 'active-filter' : ''
    const activeStyleCompleted = props.filter === 'completed' ? 'active-filter' : ''
    const errorStyleInput = error ? 'error' : ''
    const userMsg = error
        ? <div style={{color: 'red'}}>Title is required !</div>
        : <div>Enter title!</div>

    return (
        <div>
            <h3>{props.title}</h3>
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