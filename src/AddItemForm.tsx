import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onAddItemKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        {
            setError(null);
            if (e.key === "Enter") {
                onAddItemClick()
            }
        }
    }
    const onAddItemClick = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
            setTitle("")
        } else {
            setError("Title is required!")
        }
    }

    return (
        <div>
            {/*<input
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onAddItemKeyPress}
                className={error ? 'error' : ""}
            />*/}
            <TextField
                variant={"outlined"}
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onAddItemKeyPress}
                error={!!error}
                label={"Title"}
                helperText={error}
            />
            {/*<button onClick={onAddItemClick}>+</button>*/}
            <IconButton color={"primary"} onClick={onAddItemClick} >
                <AddBox />
            </IconButton>
           {/* <Button variant={"contained"} color={"primary"} onClick={onAddItemClick}> +</Button>*/}
            {/*{error && <div className={"error-message"}>{error}</div>}*/}
        </div>
    )
}
