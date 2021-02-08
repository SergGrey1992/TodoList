import React, {ChangeEvent} from 'react';

import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EdiTableSpan} from "./EdiTableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Button from "@material-ui/core/Button";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
    addTask: (taskTitle: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTodoListTitle: (todoListID: string, title: string) => void
}


export function TodoList(props: PropsType) {
    let tasks = props.tasks.map(t => {
        const removeTask = () => {
            props.removeTask(t.id, props.id)
        }
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
        }
        const changeTitle = (title: string) => {
            props.changeTaskTitle(t.id, title, props.id)
        }
        return (
            <li key={t.id} className={t.isDone ? "is-done" : ""} style={{margin: "0"}}>
                {/*<input
                    type="checkbox"
                    onChange={changeStatus}
                    checked={t.isDone}/>*/}
                <Checkbox onChange={changeStatus}
                          checked={t.isDone}
                          color={"primary"}
                />

                <EdiTableSpan title={t.title} changeTitle={changeTitle}/>
                {/*<span>{t.title}</span>*/}
                <IconButton onClick={removeTask} color={"primary"}>
                    <Delete/>
                </IconButton>
                {/*<button onClick={ removeTask }>X
                </button>*/}

            </li>
        )
    })
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(props.id, title)
    }
    const onSetAllFilterClick = () => {
        props.changeFilter("all", props.id)
    }
    const onSetActiveFilterClick = () => {
        props.changeFilter("active", props.id)
    }
    const onSetCompletedFilterClick = () => {
        props.changeFilter("completed", props.id)
    }


    return (
        <div>
            <h3>
                <EdiTableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                {/*<button onClick={ removeTodoList }>X</button>*/}
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: "none", padding: "0"}}>
                {tasks}
            </ul>
            <div>
                <Button
                    /*className={props.filter === "all" ? "active" : "" }*/
                    variant={props.filter === "all" ? "contained" : "outlined"}
                    size={"small"}
                    color={"primary"}
                    onClick={onSetAllFilterClick}>All</Button>
                <Button
                    /*className={props.filter === "active" ? "active" : "" }*/
                    size={"small"}
                    color={"primary"}
                    variant={props.filter === "active" ? "contained" : "outlined"}
                    onClick={onSetActiveFilterClick}>Active</Button>
                <Button
                    /*className={props.filter === "completed" ? "active" : "" }*/
                    size={"small"}
                    color={"primary"}
                    variant={props.filter === "completed" ? "contained" : "outlined"}
                    onClick={onSetCompletedFilterClick}>Completed</Button>
            </div>
        </div>
    )
}