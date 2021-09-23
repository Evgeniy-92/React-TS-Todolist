import React from 'react';
import {TaskType} from '../Todolist';
import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {addTodolistAC, removeTodolistAC, todolistId1, todolistId2} from './todolists-reducer';

let initialState: TasksStateType = {
    // [todolistId1]: [
    //     {id: v1(), title: 'HTML&CSS', isDone: true},
    //     {id: v1(), title: 'JS', isDone: true},
    //     {id: v1(), title: 'React', isDone: false}
    // ],
    // [todolistId2]: [
    //     {id: v1(), title: 'Milk', isDone: true},
    //     {id: v1(), title: 'Bread', isDone: false},
    //     {id: v1(), title: 'React Book', isDone: true}
    // ]
}



export const tasksReducer = (tasks = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...tasks,
                [action.todolistID]: tasks[action.todolistID].filter(t => t.id !== action.id)
            }
        case 'ADD-TASK':
            const newTask = {id: v1(), title: action.title, isDone: false}
            return {
                ...tasks,
                [action.todolistID]: [...tasks[action.todolistID], newTask]
            }
        case 'CHANGE-STATUS':
            return {
                ...tasks,
                [action.todolistId]: tasks[action.todolistId].map(t => t.id === action.id ? {...t, isDone: action.isDone} : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...tasks,
                [action.todolistID]: tasks[action.todolistID].map(t => t.id === action.id ? {...t, title: action.title} : t)
            }
        case 'REMOVE-TODOLIST':
            const copyTasks = {...tasks}
            delete copyTasks[action.id]
            return copyTasks
        case 'ADD-TODOLIST':
            return {
                ...tasks,
                [action.newKey]: []
            }
        default:
            return tasks
    }
}

type ActionType = ReturnType<typeof removeTaskAC> | ReturnType<typeof addTaskAC> | ReturnType<typeof changeStatusAC> | ReturnType<typeof changeTaskTitleAC> | ReturnType<typeof removeTodolistAC> | ReturnType<typeof addTodolistAC>

export const removeTaskAC = (id: string, todolistID: string) => {
    return {
        type: 'REMOVE-TASK',
        id,
        todolistID
    } as const
}
export const addTaskAC = (title: string, todolistID: string) => {
    return {
        type: 'ADD-TASK',
        title,
        todolistID
    } as const
}

export const changeStatusAC = (id: string, isDone: boolean, todolistId: string,) => {
    return {
        type: 'CHANGE-STATUS',
        id,
        todolistId,
        isDone
    } as const
}

export const changeTaskTitleAC = (id: string, title: string, todolistID: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        id,
        title,
        todolistID
    } as const
}