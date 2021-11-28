import {ResultCode, todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {RequestStatusType, setAppError, setAppStatus} from "../../app/app-reducer";
import {Simulate} from "react-dom/test-utils";
import {AxiosError} from "axios";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: "idle"}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        default:
            return state
    }
}

// actions
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)

export const changeTodolistEntityStatus = (entityStatus: RequestStatusType, id: string) => {
    return {
        type: 'CHANGE-TODOLIST-ENTITY-STATUS',
        entityStatus,
        id
    }as const
}

// thunks
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatus('loading'))
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setAppStatus('succeeded'))
            })
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatus('loading'))
        dispatch(changeTodolistEntityStatus('loading', todolistId))
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(setAppStatus('succeeded'))
                dispatch(removeTodolistAC(todolistId))
            })
    }
}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatus('loading'))
        todolistsAPI.createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === ResultCode.success) {
                    dispatch(setAppStatus('succeeded'))
                    dispatch(addTodolistAC(res.data.data.item))
                } else {
                    if (res.data.messages.length) {
                        dispatch(setAppError(res.data.messages[0]))
                    } else {
                        dispatch(setAppError('Some error occurred'))
                    }
                }
                dispatch(setAppStatus('failed'))
            })
            .catch((error: AxiosError) => {
                dispatch(setAppStatus('failed'))
                dispatch(setAppError(error.message))
            })
    }
}

export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.updateTodolist(id, title)
            .then((res) => {
                dispatch(changeTodolistTitleAC(id, title))
            })
    }
}

// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>
    | ReturnType<typeof changeTodolistEntityStatus>
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}