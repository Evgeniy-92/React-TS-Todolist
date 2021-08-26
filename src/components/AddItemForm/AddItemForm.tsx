import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormType) {
    const [newTitleTask, setNewTitleTask] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        const newValue = e.currentTarget.value
        setNewTitleTask(newValue)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem()
        }
    }
    const addItem = () => {
        const trimmedTitle = newTitleTask.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setNewTitleTask('')
    }


    const errorStyleInput = error ? 'error' : ''
    const userMsg = error
        ? <div style={{color: 'red'}}>Title is required !</div>
        : <div>Enter title!</div>

    return (
        <div>
            <input
                className={errorStyleInput}
                value={newTitleTask}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <button onClick={addItem}>+</button>
            {userMsg}
        </div>
    )
}

export default AddItemForm