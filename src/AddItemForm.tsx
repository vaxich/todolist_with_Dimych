import { ChangeEvent, KeyboardEvent, useState } from "react";

export type AddItemFormPropsType =  {
    addItem: ( newTaskTitle: string) => void
    
  }
  
  export const AddItemForm = (props: AddItemFormPropsType) => {
  
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
        props.addItem(newTaskTitle);
        setNewTaskTitle("")
      } else {
        setError("Title is requared")
      }
    }
  
    return (
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
    )
  }
  
  