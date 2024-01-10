import { ControlPoint } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import Button from "@mui/material/Button/Button";
import { ChangeEvent, KeyboardEvent, useState } from "react";

export type AddItemFormPropsType = {
  addItem: (newTaskTitle: string) => void

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
      <TextField
        variant="outlined"
        label="type Value"
        error={!!error}
        helperText={error}
        value={newTaskTitle}
        onKeyDown={onPressHandler}
        onChange={onNewTitleChangeHandler} />
      <IconButton  color="primary" onClick={addTask}>
        <ControlPoint />
      </IconButton>
      {/* {error && <div className="error-message">{error}</div>} */}
    </div>
  )
}

