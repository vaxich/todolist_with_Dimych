import React, { useState } from 'react';

import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';


export type FilterValueType = "All" | "Completed" | "Active"

function App() {

  const [tasks, setTasks] = useState <Array<TaskType>>(
    [
      { id: v1(), title: "css", isDone: true },
      { id: v1(), title: "js", isDone: true },
      { id: v1(), title: "react", isDone: false },
      { id: v1(), title: "redux", isDone: false },
    ]
  
  );

  const [filter, setFilter] = useState<FilterValueType>("All");
 

  const removeTask = (id: string) => {
    let resultTask = tasks.filter( task => task.id !== id)
    setTasks(resultTask)
  }

  const addTask = (newTaskTitle: string) => {
    let newTask = {
      id: v1(),
      title: newTaskTitle,
      isDone: false
    }

    let newTasks = [newTask, ...tasks];
    setTasks(newTasks)
  }

  const changeFilter = (value: FilterValueType) => {
    setFilter(value)
  }

  let tasksForTodolist = tasks;

  if (filter === "Completed" ) {
    tasksForTodolist = tasks.filter( (task) => task.isDone === true)
  }
  if (filter === "Active" ) {
    tasksForTodolist = tasks.filter( (task) => task.isDone === false)
  }

  return (
    <div className="App">
      <Todolist 
      title="what to learn" 
      tasks={tasksForTodolist} 
      removeTask = {removeTask}
      changeFilter = {changeFilter}
      addTask = {addTask}
      />

    </div>
  );
}




export default App;
