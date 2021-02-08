import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EdiTableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export function EdiTableSpan(props: EdiTableSpanPropsType) {
    const [editMode, setEdiMode] = useState<boolean>(false)
    const [title, setTitle] = useState(props.title)
    const onEditMode = () => {
        setEdiMode(true)
    }

    const offEditMode = () => {
        setEdiMode(false)
        if (title.trim()) {
            props.changeTitle(title.trim())
        }
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode ? /*<input
            autoFocus={true}
            onBlur={offEditMode}
            onChange={onChangeTitle}
            value={title}/>*/
            <TextField
                autoFocus={true}
                onBlur={offEditMode}
                onChange={onChangeTitle}
                value={title}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}