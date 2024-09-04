import { create } from 'zustand'
import { generateId } from "../helpers.ts";

interface Task {
    id: string
    title: string
    createdAt: number
}

interface ToDoStore {
    tasks: Task[]
    createTask: (task: Task) => void
    updateTask: (id: string, title: string) => void
    removeTask: (id: string) => void
}

export const useToDoStore = create<ToDoStore>((set, get) => ({
    tasks: [
        {
          id: 'asfsdfsdf',
          title: 'Default task',
          createdAt: 123456789,
        },
    ],
    createTask: (title) => {
        const { tasks } = get()
        const newTask = {
            id: generateId(),
            title,
            createdAt: Date.now(),
        }

        set({
            tasks: [newTask].concat(tasks),
        })
    },

    updateTask: (id: string, title: string) => {
        const { tasks } = get()
        set({
            tasks: tasks.map((task) => ({
                ...task,
                title: task.id === id ? task.title : task.title,
            }))
        })
    },

    removeTask: (id: string) => {
        const { tasks } = get()
        set({
            tasks: tasks.filter((task) => task.id !== id)
        })
    },
}))