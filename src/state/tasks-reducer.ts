import { v1 } from "uuid";
import { FilterValueType, TasksStateType, TodolistType } from "../App";
import { TaskType } from "../Todolist";
import { AddTodolistACType, RemoveTodolistACType } from "./todolists-reducer";

export const tasksReducer = (state: TasksStateType, action: tasksReducerACType) => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = { ...state };
            const tasks = state[action.payload.todolistId];
            const filteredTasks = tasks.filter(task => task.id !== action.payload.taskId);
            stateCopy[action.payload.todolistId] = filteredTasks;
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = { ...state };
            let newTask: TaskType = {
                id: v1(),
                title: action.payload.newTaskTitle,
                isDone: false
            }

            stateCopy[action.payload.todolistId] = [newTask, ...state[action.payload.todolistId]]
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            const stateCopy = { ...state, [action.payload.todolistId]: state[action.payload.todolistId].map( task => task.id !== action.payload.taskId ? task : {...task, isDone: !task.isDone})}
            return stateCopy
            
        }
        case "CHANGE-TASK-TITLE": {
            const stateCopy = { ...state, [action.payload.todolistId]: state[action.payload.todolistId].map( task => task.id !== action.payload.taskId ? task : {...task, title: action.payload.newTitle})}
            return stateCopy
       
        }
        case "ADD-TODOLIST":{
            const stateCopy = {...state}
            stateCopy[action.payload.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.payload.todolistId]
            return stateCopy
        }

        default:
            throw new Error("не знаю такой тип экшена")
    }
}

type tasksReducerACType = RemoveTaskACType 
| AddTaskACType 
| ChangeTaskStatusACType 
| ChangeTaskTitleACType 
| AddTodolistACType 
| RemoveTodolistACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>


export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: { todolistId, taskId }
    } as const
}

export const addTaskAC = (todolistId: string, newTaskTitle: string) => {
    return {
        type: "ADD-TASK",
        payload: { todolistId, newTaskTitle }
    } as const
}

export const changeTaskStatusAC = (todolistId: string, taskId: string) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: { todolistId, taskId }
    } as const
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: { todolistId, taskId,  newTitle}
    } as const
}