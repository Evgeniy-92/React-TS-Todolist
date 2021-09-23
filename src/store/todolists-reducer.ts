import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
const ADD_TODOLIST = 'ADD-TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'

export let todolistId1 = v1();
export let todolistId2 = v1();

let initialState: Array<TodolistType> = [
    // {id: todolistId1, title: 'What to learn', filter: 'all'},
    // {id: todolistId2, title: 'What to buy', filter: 'all'}
]

export const todoListsReducer = (todoLists = initialState, action: ActionTypes): Array<TodolistType> => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return todoLists.filter(tl => tl.id != action.id);
        case ADD_TODOLIST:
            let newTodo: TodolistType = {id: action.newKey, title: action.title , filter: 'all'}
            return [...todoLists, newTodo]
        case CHANGE_TODOLIST_TITLE:
            return todoLists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case CHANGE_TODOLIST_FILTER:
            return todoLists.map(tl => tl.id === action.id ? {...tl, filter: action.value} : tl)
        default:
            return todoLists
    }
}

export type ActionTypes = ReturnType<typeof removeTodolistAC> | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC> | ReturnType<typeof changeTodolistFilterAC>;

export const removeTodolistAC = (id:string) => {
    return {
        type: REMOVE_TODOLIST,
        id
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: ADD_TODOLIST,
        title,
        newKey: v1()
    } as const
}

export const changeTodolistTitleAC = (title: string, id: string) => {
    return {
        type: CHANGE_TODOLIST_TITLE,
        title,
        id
    } as const
}

export const changeTodolistFilterAC = (value: FilterValuesType, id: string) => {
    return {
        type: CHANGE_TODOLIST_FILTER,
        value,
        id
    } as const
}