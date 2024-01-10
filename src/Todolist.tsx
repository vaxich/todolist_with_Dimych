import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValueType } from "./App"
import { AddItemForm } from "./AddItemForm"
import { EditableSpan } from "./EditableSpan"
import IconButton from "@mui/material/IconButton/IconButton"
import { CheckBox, Delete } from "@mui/icons-material"
import Button from "@mui/material/Button/Button"
import { Checkbox } from "@mui/material"

type PropsType = {
  todolistId: string
  title: string
  tasks: Array<TaskType>
  filter: FilterValueType
  removeTask: (todolistId: string, taskId: string) => void
  changeTodolistTitle: (todolistId: string, localTitle: string) => void
  changeFilter: (todolistId: string, value: FilterValueType) => void
  addTask: (todolistId: string, newTaskTitle: string) => void
  changeTaskStatus: (todolistId: string, taskId: string) => void
  changeTaskTitle: (todolistId: string, taskId: string, localTitle: string) => void
  removeTodolist: (todolistId: string) => void


}

export type TaskType = {
  id: string
  title: string
  isDone: boolean

}

export function Todolist(props: PropsType) {



  const removeTodolist = () => {
    props.removeTodolist(props.todolistId)
  }

  const changeTodolistTitle = (localTitle: string) => {
    props.changeTodolistTitle(props.todolistId, localTitle)
  }

  const addTask = (newTaskTitle: string) => {
    props.addTask(props.todolistId, newTaskTitle)
  }

  const onAllClickHandler = () => props.changeFilter(props.todolistId, "All")
  const onActiveClickHandler = () => props.changeFilter(props.todolistId, "Active")
  const onCompletedClickHandler = () => props.changeFilter(props.todolistId, "Completed")

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodolist}>
          <Delete />
        </IconButton>

      </h3>
      <div>
        <AddItemForm addItem={addTask} />
      </div>
      <div>
        {props.tasks.map((task) => {

          const onRemoveHandler = () => {
            props.removeTask(props.todolistId, task.id)
          }
          const onChangeStatusHandler = () => {
            props.changeTaskStatus(props.todolistId, task.id)
          }
          const onChangeTitleHandler = (localTitle: string) => {
            props.changeTaskTitle(props.todolistId, task.id, localTitle)
          }

          return (
            <div key={task.id} className={task.isDone ? "is-done" : ""}>
              <Checkbox  checked={task.isDone} onChange={onChangeStatusHandler} />
              <EditableSpan title={task.title} onChange={onChangeTitleHandler} />
              <IconButton onClick={onRemoveHandler}>
                <Delete />
              </IconButton>
              {/* <button onClick={onRemoveHandler}>X</button> */}
            </div>
          )
        })}

      </div>
      <Button color="primary" variant={props.filter === "All" ? "contained" : "text"}  onClick={onAllClickHandler}>All</Button>
      <Button color="primary" variant={props.filter === "Active" ? "contained" : "text"} onClick={onActiveClickHandler}>Active</Button>
      <Button color="secondary" variant={props.filter === "Completed" ? "contained" : "text"} onClick={onCompletedClickHandler}>Completed</Button>

    </div>
  )
}




