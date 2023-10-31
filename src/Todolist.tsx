import { FilterValueType } from "./App"

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (id: number) => void
  changeFilter: (value: FilterValueType) => void

}

export type TaskType = {
  id: number
  title: string
  isDone: boolean

}

export function Todolist(props: PropsType) {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {props.tasks.map((task) => {
          return (
            <li key = {task.id}>
              <input type="checkbox" checked={task.isDone} /><span>{task.title}</span> 
              <button onClick={ () => {props.removeTask(task.id)}}>X</button> 
              </li>
          )
        })}

      </ul>
      <button onClick={ () => {props.changeFilter("All")}}>All</button>
      <button onClick={ () => {props.changeFilter("Active")}}>Active</button>
      <button onClick={ () => {props.changeFilter("Completed")}}>Completed</button>

    </div>
  )
}

