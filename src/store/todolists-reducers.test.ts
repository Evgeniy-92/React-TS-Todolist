
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todoListsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {TodolistType} from '../App';

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
    expect(startState.length).toBe(2)
});

test('correct todolist should be add', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const newTodolistTitle = 'New TodoList'
    const newKey = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(startState.length).toBe(2)
    expect(endState[2].title).toBe(newTodolistTitle)
    expect(endState[2].filter).toBe('all')
})

test('correct todolist should be change title', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const newTitle = 'New title'

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListsReducer(startState, changeTodolistTitleAC(newTitle, todolistId1))

    expect(endState[0].title).toBe(newTitle)
    expect(endState[1].title).toBe("What to buy")
})

test('correct todolist should be change filter', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const newFilter = 'active'

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListsReducer(startState, changeTodolistFilterAC(newFilter, todolistId2))

    expect(startState[1].filter).toBe('all')
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
