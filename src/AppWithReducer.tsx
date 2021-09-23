import React, {useReducer, useState} from 'react';
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

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithReducer() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchTodolist] = useReducer(todoListsReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: false},
            {id: v1(), title: 'React Book', isDone: true}
        ]
    });


    function removeTask(id: string, todolistId: string) {
        dispatchTasks(removeTaskAC(id, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatchTasks(addTaskAC(title, todolistId))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatchTasks(changeStatusAC(id, isDone, todolistId))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatchTodolist(changeTodolistFilterAC(value, todolistId))
    }

    function removeTodolist(id: string) {
        let action = removeTodolistAC(id)
        dispatchTodolist(action)
        dispatchTasks(action)
    }

    const callBackHandlerForNewTodolist = (title: string) => {
        let action = addTodolistAC(title)
        dispatchTodolist(action)
        dispatchTasks(action)
    }

    const changeTaskTitle = (title: string, todolistId: string, id: string) => {
        dispatchTasks(changeTaskTitleAC(id, title, todolistId))
    }

    const changeTodolistTitle = (title: string, todolistID: string) => {
        dispatchTodolist(changeTodolistTitleAC(title, todolistID))
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
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === 'active') {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            }

                            return <Grid item>
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

export default AppWithReducer;
