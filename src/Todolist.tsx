import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValueType } from "./App"
import { AddItemForm } from "./AddItemForm"
import { EditableSpan } from "./EditableSpan"

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
        <button onClick={removeTodolist}>X</button>
      </h3>
      <div>
        <AddItemForm addItem={addTask} />
      </div>
      <ul>
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
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
              <input type="checkbox" checked={task.isDone} onChange={onChangeStatusHandler} />
              <EditableSpan title={task.title} onChange={onChangeTitleHandler} />
              <button onClick={onRemoveHandler}>X</button>
            </li>
          )
        })}

      </ul>
      <button className={props.filter === "All" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
      <button className={props.filter === "Active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
      <button className={props.filter === "Completed" ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>

    </div>
  )
}




