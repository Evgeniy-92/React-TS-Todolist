import {combineReducers, createStore} from 'redux';
import {todoListsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';


let rootReducer = combineReducers({
    todoList: todoListsReducer,
    tasks: tasksReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export let store = createStore(rootReducer)

// @ts-ignore
window.store = store