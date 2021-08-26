import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from '../../App';
import AddItemForm from '../AddItemForm/AddItemForm';
import EditableSpan from '../EditableSpan/EditableSpan';

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
    changeTaskTitle: (taskID: string, newTitle: string, todolistID: string) => void
    changeTodolistTitle: (newTitle: string, todoListID: string) => void
}

export function Todolist(props: TodolistPropsType) {

    const tasksJSXElement = props.tasks.map((t: TaskType) => {
        const removeTask = () => props.removeTask(t.id, props.todoListID) /*удаляет таску*/
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
        }
        const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.todoListID)

        const isDoneStyle = t.isDone ? 'is-done' : ''
        return (
            <li className={isDoneStyle} key={t.id}><input type="checkbox" checked={t.isDone} onChange={changeTaskStatus}/>
                <EditableSpan title={t.title} changeTitle={changeTaskTitle} />
                {/*<span>{t.title}</span>*/}
                <button onClick={removeTask}>X</button>
            </li>
        )
    });

    const onAllClickHandler = () => props.changeFilter('all',props.todoListID)
    const onActiveClickHandler = () => props.changeFilter('active',props.todoListID)
    const onCompletedClickHandler = () => props.changeFilter('completed',props.todoListID)
    const removeTodoList = () => props.removeTodoList(props.todoListID)
    const addTask = (title: string) => props.addTask(title, props.todoListID )
    const changeTodolistTitle = (title: string) => props.changeTodolistTitle(title, props.todoListID)


    const activeStyleAll = props.filter === 'all' ? 'active-filter' : ''
    const activeStyleActive = props.filter === 'active' ? 'active-filter' : ''
    const activeStyleCompleted = props.filter === 'completed' ? 'active-filter' : ''

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                 <button onClick={removeTodoList}>X</button>
            </h3>

            <AddItemForm addItem={addTask} />

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