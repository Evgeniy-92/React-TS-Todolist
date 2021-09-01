import React, {ChangeEvent, useState} from 'react';

type EditableInput = {
    title: string
    callback: (title: string) => void
}

export function EditableInput(props: EditableInput) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [titleInput, setTitleInput] = useState(props.title)

    const changeModeOn = () => {
        setEditMode(true)
    }

    const changeModeOff = () => {
        setEditMode(false)
        props.callback(titleInput)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleInput(e.currentTarget.value)
    }


    return (
        editMode
            ? <input value={titleInput} onBlur={changeModeOff} onChange={onChangeHandler} autoFocus/>
            : <span onDoubleClick={changeModeOn}>{props.title}</span>
    )
}