import { v1 } from "uuid";
import { FilterValueType, TodolistType } from "../App";

export const todolistsReducer = (state: TodolistType[], action: todolistsReducerACType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter((tl) => tl.id !== action.payload.todolistId)
        }
        case "ADD-TODOLIST": {
            let newTodolist: TodolistType = {
                id: v1(),
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

type RemoveTodolistACType = ReturnType<typeof RemoveTodolistAC>
type AddTodolistACType = ReturnType<typeof AddTodolistAC>
type ChangeTodolistTitleACType = ReturnType<typeof ChangeTodolistTitleAC>
type ChangeTodolistFilterACType = ReturnType<typeof ChangeTodolistFilterAC>


export const RemoveTodolistAC = (todolistId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: { todolistId }
    } as const
}

export const AddTodolistAC = (newTitle: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: { newTitle }
    } as const
}

export const ChangeTodolistTitleAC = (todolistId: string, localTitle: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: { todolistId, localTitle }
    } as const
}

export const ChangeTodolistFilterAC = (todolistId: string, value: FilterValueType) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload: { todolistId, value }
    } as const
}