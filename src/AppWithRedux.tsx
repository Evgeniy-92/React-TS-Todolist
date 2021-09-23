import React, {useContext, useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from './conponents/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, MenuItem, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todoListsReducer
} from './store/todolists-reducer';
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './store/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import { AppRootStateType } from './store/store';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {
    let dispatch = useDispatch()
    const todoLists = useSelector<AppRootStateType, Array<TodolistType>>( state => state.todoList)
    const tasks = useSelector<AppRootStateType, TasksStateType>(store => store.tasks)

    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(id, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatch(changeStatusAC(id, isDone, todolistId))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatch(changeTodolistFilterAC(value, todolistId))
    }

    function removeTodolist(id: string) {
        let action = removeTodolistAC(id)
        dispatch(action)
    }

    const callBackHandlerForNewTodolist = (title: string) => {
        let action = addTodolistAC(title)
        dispatch(action)
    }

    const changeTaskTitle = (title: string, todolistId: string, id: string) => {
        dispatch(changeTaskTitleAC(id, title, todolistId))
    }

    const changeTodolistTitle = (title: string, todolistID: string) => {
        dispatch(changeTodolistTitleAC(title, todolistID))
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={callBackHandlerForNewTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === 'active') {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            }

                            return <Grid key={tl.id} item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>


        </div>
);
}

export default AppWithRedux;
