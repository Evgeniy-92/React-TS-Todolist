import {useState} from 'react';
import {v1} from 'uuid';
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import { TasksStateType } from '../App';


let todolistId1: string;
let todolistId2: string;
let startState: TasksStateType

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = {
        [todolistId1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        [todolistId2]: [
            {id: '1', title: 'Milk', isDone: true},
            {id: '2', title: 'Bread', isDone: false},
            {id: '3', title: 'React Book', isDone: true}
        ]
    };
})

test('correct tasks should be removed', () => {

    const endState = tasksReducer(startState, removeTaskAC('2', todolistId2))

    expect(endState).toEqual({
        [todolistId1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        [todolistId2]: [
            {id: '1', title: 'Milk', isDone: true},
            {id: '3', title: 'React Book', isDone: true}
        ]
    })
    expect(startState).not.toBe(endState)


});

test('correct tasks should be add', () => {

    const endState = tasksReducer(startState, addTaskAC('Redux', todolistId1))

    expect(startState).not.toBe(endState)
    expect(endState[todolistId1][3].title).toBe('Redux')
    expect(endState[todolistId1].length).toBe(4)

});

test('task status must be changed', () => {

    const endState = tasksReducer(startState, changeStatusAC('3', true, todolistId1))

    expect(startState).not.toBe(endState)
    expect(endState[todolistId1][2].isDone).toBe(true)
    expect(endState[todolistId1][1].isDone).toBe(true)

});

test('to change the task title', () => {

    const endState = tasksReducer(startState, changeTaskTitleAC('1', 'Milk', todolistId2))

    expect(startState).not.toBe(endState)
    expect(endState[todolistId2][0].title).toBe('Milk')
    expect(endState[todolistId2][1].title).toBe('Bread')

});