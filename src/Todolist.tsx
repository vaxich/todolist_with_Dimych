import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValueType } from "./App"

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (id: string) => void
  changeFilter: (value: FilterValueType) => void
  addTask: (newTaskTitle: string) => void

}

export type TaskType = {
  id: string
  title: string
  isDone: boolean

}

export function Todolist(props: PropsType) {

  const [newTaskTitle, setNewTaskTitle] = useState("");

  const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.currentTarget.value)
  }
  const onPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.charCode = 13) { props.addTask(newTaskTitle); setNewTaskTitle("") }
  }

  const addTask = () => {
    props.addTask(newTaskTitle);
    setNewTaskTitle("")
  }

  const onAllClickHandler = () => props.changeFilter("All")
  const onActiveClickHandler = () => props.changeFilter("Active")
  const onCompletedClickHandler = () => props.changeFilter("Completed")

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={newTaskTitle}
          onKeyPress={onPressHandler}
          onChange={onNewTitleChangeHandler} />
        <button
          onClick={addTask}>+
        </button>
      </div>
      <ul>
        {props.tasks.map((task) => {

          const onRemoveHandler = () => {
            props.removeTask(task.id)
          }

          return (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} /><span>{task.title}</span>
              <button onClick={onRemoveHandler}>X</button>
            </li>
          )
        })}

      </ul>
      <button onClick={onAllClickHandler}>All</button>
      <button onClick={onActiveClickHandler}>Active</button>
      <button onClick={onCompletedClickHandler}>Completed</button>

    </div>
  )
}

