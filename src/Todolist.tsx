import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from './conponents/AddItemForm';
import {EditableInput} from './conponents/EditableInput';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    changeTaskTitle: (title: string, todolistId: string, id: string) => void
    changeTodolistTitle: (title: string, todolistID: string) => void
}

export function Todolist(props: PropsType) {
    const removeTodolist = () => props.removeTodolist(props.id)
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
    const changeTodolistTitleHandler = (title: string) => {
        props.changeTodolistTitle(title, props.id)
    }
    return <div>
        <h3>
            <EditableInput title={props.title} callback={changeTodolistTitleHandler}/>
            <IconButton onClick={removeTodolist} color="primary">
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const changeTaskTitle = (title: string) => {
                        props.changeTaskTitle(title, props.id, t.id)
                    }

                    return <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <Checkbox color={'primary'} onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableInput title={t.title} callback={changeTaskTitle}/>
                        <IconButton onClick={onClickHandler} color={'secondary'}>
                            <Delete/>
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div>
            <Button
                variant={props.filter === 'all' ? 'outlined' : 'text'}
                onClick={onAllClickHandler}>All
            </Button>
            <Button
                variant={props.filter === 'active' ? 'outlined' : 'text'}
                onClick={onActiveClickHandler}
                color={'secondary'}>Active
            </Button>
            <Button
                variant={props.filter === 'completed' ? 'outlined' : 'text'}
                onClick={onCompletedClickHandler}
                color={'primary'}>Completed
            </Button>
        </div>
    </div>
}


