import React, { useState } from 'react';

import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';



export type FilterValueType = "All" | "Completed" | "Active";
export type TodolistType = {
  id: string
  title: string
  filter: FilterValueType
}
export type TasksStateType = {
  [key: string]: TaskType[]
}

function App() {

  let todolistId1 = v1();
  let todolistId2 = v1();

  const [tasksObj, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      { id: v1(), title: "css", isDone: true },
      { id: v1(), title: "js", isDone: true },
      { id: v1(), title: "react", isDone: false },
      { id: v1(), title: "redux", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "book", isDone: true },
      { id: v1(), title: "milk", isDone: true },
      { id: v1(), title: "bread", isDone: false },
      { id: v1(), title: "sigi", isDone: false },
    ],
  })


  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistId1, title: "what to learn", filter: "All" },
    { id: todolistId2, title: "what to buy", filter: "All" },
  ]);

  const removeTask = (todolistId: string, taskId: string) => {
    let tasks = tasksObj[todolistId]
    let resultTask = tasks.filter(task => task.id !== taskId)
    tasksObj[todolistId] = resultTask
    setTasks({ ...tasksObj })
  }

  const addTask = (todolistId: string, newTaskTitle: string) => {
    let newTask = { // создаём новую таску
      id: v1(),
      title: newTaskTitle,
      isDone: false
    }
    let tasks = tasksObj[todolistId]; // запихиваем все таски одного тудулиста в один массив
    let newTasks = [newTask, ...tasks];// запихиваем в новый массив предыдущие таски плюс новую таску
    tasksObj[todolistId] = newTasks; //запихиаем в основной массив то что получилось
    setTasks({ ...tasksObj }) // сетает обновлённый объект

    //let newTasks = [newTask, ...tasksObj];
    //setTasks(newTasks)
  }

  const changeFilter = (todolistId: string, value: FilterValueType) => {
    let todolist = todolists.find(tl => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists])
    }
    //setFilter(value)
  }

  const changeStatus = (todolistId: string, taskId: string) => {
    let tasks = tasksObj[todolistId]; // запихиваем все таски одного тудулиста в один массив
    let task = tasks.find(t => t.id === taskId);
    if (task) {
      task.isDone = !task.isDone
      setTasks({ ...tasksObj })
    }
  }

  const changeTaskTitle = (todolistId: string, taskId: string, localTitle: string) => {
    let tasks = tasksObj[todolistId]; // запихиваем все таски одного тудулиста в один массив
    let task = tasks.find(t => t.id === taskId);
    if (task) {
      task.title = localTitle
      setTasks({ ...tasksObj })
    }
  }

  const removeTodolist = (todolistId: string) => {
    let filteredTodolists = todolists.filter((tl) => tl.id !== todolistId)
    setTodolists(filteredTodolists)
    delete tasksObj[todolistId]
    setTasks({ ...tasksObj })
  }

  const changeTodolistTitle = (todolistId: string, localTitle: string) => {

    let filteredTodolists = todolists.find((tl) => tl.id === todolistId)
    if (filteredTodolists) {
      filteredTodolists.title = localTitle;
      setTodolists([...todolists])
    }
  }

  const addTodolist = (newTaskTitle: string) => {
    let newTodolist: TodolistType = {
      id: v1(),
      title: newTaskTitle,
      filter: "All"
    }

    setTodolists([newTodolist, ...todolists])
    setTasks({ ...tasksObj, [newTodolist.id]: [] })
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodolist} />
      {todolists.map((tl) => {

        let tasksForTodolist = tasksObj[tl.id];


        if (tl.filter === "Completed") {
          tasksForTodolist = tasksForTodolist.filter((task) => task.isDone === true)
        }
        if (tl.filter === "Active") {
          tasksForTodolist = tasksForTodolist.filter((task) => task.isDone === false)
        }
        return <Todolist
          key={tl.id}
          todolistId={tl.id}
          title={tl.title}
          tasks={tasksForTodolist}
          filter={tl.filter}
          removeTask={removeTask}
          changeFilter={changeFilter}
          addTask={addTask}
          changeTaskStatus={changeStatus}
          changeTaskTitle={changeTaskTitle}
          removeTodolist={removeTodolist}
          changeTodolistTitle={changeTodolistTitle}

        />
      })}


    </div>
  );
}




export default App;
