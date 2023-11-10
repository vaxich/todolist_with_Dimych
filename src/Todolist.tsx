import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValueType } from "./App"

type PropsType = {
  title: string
  tasks: Array<TaskType>
  filter: FilterValueType
  removeTask: (id: string) => void
  changeFilter: (value: FilterValueType) => void
  addTask: (newTaskTitle: string) => void
  changeTaskStatus: (taskId: string) => void

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
      props.addTask(newTaskTitle);
      setNewTaskTitle("")
    } else {
      setError("Title is requared")
    }
  }

  const onAllClickHandler = () => props.changeFilter("All")
  const onActiveClickHandler = () => props.changeFilter("Active")
  const onCompletedClickHandler = () => props.changeFilter("Completed")

  return (
    <div>
      <h3>{props.title}</h3>
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
            props.removeTask(task.id)
          }
          const onChangeHandler = () => {
            props.changeTaskStatus(task.id)
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

