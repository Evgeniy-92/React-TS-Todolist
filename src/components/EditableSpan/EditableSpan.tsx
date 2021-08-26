import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitleTask: string) => void
}

function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [newTitleTask, setNewTitleTask] = useState<string>(props.title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value
        setNewTitleTask(newValue)
    }

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(newTitleTask)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            offEditMode()
        }
    }

    return (
        editMode
            ? <input
                value={newTitleTask}
                onChange={onChangeHandler}
                onBlur={offEditMode}
                onKeyPress={onKeyPressHandler}
                autoFocus/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>

    )
};

export default EditableSpan