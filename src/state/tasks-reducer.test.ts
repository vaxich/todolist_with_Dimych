
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from './todolists-reducer';

import { v1 } from 'uuid';
import { TodolistType, FilterValueType, TasksStateType } from '../App';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './tasks-reducer';

test('correct task should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TasksStateType = {
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
    }

    const endState = tasksReducer(startState, removeTaskAC(todolistId2, startState[todolistId2][3].id))

    expect(endState[todolistId1].length).toBe(4)
    expect(endState[todolistId2].length).toBe(3)

})

test('correct task should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTaskTitle = 'New Task'

    const startState: TasksStateType = {
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
    }

    const endState = tasksReducer(startState, addTaskAC(todolistId1, newTaskTitle))

    expect(endState[todolistId1].length).toBe(5)
    expect(endState[todolistId2].length).toBe(4)
    expect(endState[todolistId1][0].title).toBe(newTaskTitle)
})

test('correct task should change status', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TasksStateType = {
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
    }

    const endState = tasksReducer(startState, changeTaskStatusAC(todolistId1, startState[todolistId1][0].id))

    expect(endState[todolistId1][0].isDone).toBe(false)

})

test('correct title of task should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTitle =  'new title'

    const startState: TasksStateType = {
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
    }




    const endState = tasksReducer(startState, changeTaskTitleAC(todolistId2, startState[todolistId2][3].id ,newTitle))

    expect(endState[todolistId2][3].title).toBe(newTitle)
    
})


