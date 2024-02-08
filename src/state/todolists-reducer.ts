import { v1 } from "uuid";
import { FilterValueType, TodolistType } from "../App";

export const todolistsReducer = (state: TodolistType[], action: todolistsReducerACType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter((tl) => tl.id !== action.payload.todolistId)
        }
        case "ADD-TODOLIST": {
            let newTodolist: TodolistType = {
                id: action.payload.todolistId,
                title: action.payload.newTitle,
                filter: "All"
            }
            return [newTodolist, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.payload.todolistId ? { ...tl, title: action.payload.localTitle } : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.payload.todolistId ? { ...tl, filter: action.payload.value } : tl)
        }

        default:
            throw new Error("не знаю такой тип экшена")
    }
}

type todolistsReducerACType = RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleACType | ChangeTodolistFilterACType

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>


export const removeTodolistAC = (todolistId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: { todolistId }
    } as const
}

export const addTodolistAC = (newTitle: string) => {
    const todolistId = v1()
    return {
        type: "ADD-TODOLIST",
        payload: {todolistId, newTitle }
    } as const
}

export const changeTodolistTitleAC = (todolistId: string, localTitle: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: { todolistId, localTitle }
    } as const
}

export const changeTodolistFilterAC = (todolistId: string, value: FilterValueType) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload: { todolistId, value }
    } as const
}