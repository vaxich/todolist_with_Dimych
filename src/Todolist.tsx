import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValueType } from "./App"

type PropsType = {
  todolistId: string
  title: string
  tasks: Array<TaskType>
  filter: FilterValueType
  removeTask: (todolistId: string, taskId: string) => void
  changeFilter: (todolistId: string, value: FilterValueType) => void
  addTask: (todolistId: string, newTaskTitle: string) => void
  changeTaskStatus: (todolistId: string, taskId: string) => void
  removeTodolist: (todolistId: string) => void

}

export type TaskType = {
  id: string
  title: string
  isDone: boolean

}

export function Todolist(props: PropsType) {

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.currentTarget.value)
  }
  const onPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (event.key === "Enter") { addTask() }
  }

  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addTask(props.todolistId, newTaskTitle);
      setNewTaskTitle("")
    } else {
      setError("Title is requared")
    }
  }

  const removeTodolist =() => {
    props.removeTodolist(props.todolistId)
  }

  const onAllClickHandler = () => props.changeFilter(props.todolistId, "All")
  const onActiveClickHandler = () => props.changeFilter(props.todolistId, "Active")
  const onCompletedClickHandler = () => props.changeFilter(props.todolistId, "Completed")

  return (
    <div>
      <h3>{props.title} <button onClick = {removeTodolist}>X</button></h3>
      <div>
        <input
          className={error ? "error" : ""}
          value={newTaskTitle}
          onKeyDown={onPressHandler}
          onChange={onNewTitleChangeHandler} />
        <button
          onClick={addTask}>+
        </button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {props.tasks.map((task) => {

          const onRemoveHandler = () => {
            props.removeTask(props.todolistId, task.id)
          }
          const onChangeHandler = () => {
            props.changeTaskStatus(props.todolistId, task.id)
          }

          return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
              <input type="checkbox" checked={task.isDone} onChange={onChangeHandler} /><span>{task.title}</span>
              <button onClick={onRemoveHandler}>X</button>
            </li>
          )
        })}

      </ul>
      <button className={props.filter === "All" ? "active-filter" : "" } onClick={onAllClickHandler}>All</button>
      <button className={props.filter === "Active" ? "active-filter" : "" } onClick={onActiveClickHandler}>Active</button>
      <button className={props.filter === "Completed" ? "active-filter" : "" } onClick={onCompletedClickHandler}>Completed</button>

    </div>
  )
}

