import React, { useState } from 'react';

import './App.css';
import { TaskType, Todolist } from './Todolist';


export type FilterValueType = "All" | "Completed" | "Active"

function App() {

  const [tasks, setTasks] = useState <Array<TaskType>>(
    [
      { id: 1, title: "css", isDone: true },
      { id: 2, title: "js", isDone: true },
      { id: 3, title: "react", isDone: false },
      { id: 4, title: "redux", isDone: false },
    ]
  
  );

  const [filter, setFilter] = useState<FilterValueType>("All");
 

  const removeTask = (id: number) => {
    let resultTask = tasks.filter( task => task.id !== id)
    setTasks(resultTask)
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
      />

    </div>
  );
}




export default App;
