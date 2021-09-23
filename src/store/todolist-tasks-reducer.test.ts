import {v1} from 'uuid';
import {tasksReducer} from './tasks-reducer';
import {TodolistType} from '../App';
import {addTodolistAC, removeTodolistAC, todoListsReducer} from './todolists-reducer';

test('correct todolist and its tasks must be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startTodolistState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const startTasksState = {
        [todolistId1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        [todolistId2]: [
            {id: '1', title: 'Milky way', isDone: true},
            {id: '2', title: 'Bread', isDone: false},
            {id: '3', title: 'React Book', isDone: true}
        ]
    };

    const endTodoListState = todoListsReducer(startTodolistState, removeTodolistAC(todolistId1))

    const endTasksState = tasksReducer(startTasksState, removeTodolistAC(todolistId1))
    const keys = Object.keys(endTasksState)

    expect(keys.length).toBe(1)
    expect(endTodoListState.length).toBe(1)
    expect(endTodoListState[0].title).toBe("What to buy")
    expect(endTasksState[todolistId1]).toBeUndefined()

});

test('correct todolist and its tasks must be add', () => {

    const startTodolistState: Array<TodolistType> = []

    const startTasksState = {};

    const action = addTodolistAC('What to buy')

    const endTodoListState = todoListsReducer(startTodolistState, action)

    const endTasksState = tasksReducer(startTasksState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolist = endTodoListState[0].id

    expect(idFromTasks).toBe(idFromTodolist)
    expect(endTodoListState.length).toBe(1)
    expect(endTodoListState[0].title).toBe('What to buy')
    expect(idFromTodolist).toBe(action.newKey)
    expect(idFromTasks).toBe(action.newKey)
    expect(endTasksState).toEqual({
        [idFromTasks]: []
    })

});