import { z } from "zod";
import { ITaskById } from "./IEditTask";

interface IEditTaskFormProps {
    tasks: ITaskById[]
    closeDialog: () => void
}

interface IEditTaskFormData {
    Id_Task_Config: number
    Task: string
    Observation: string
    Id_Responsable: number
    Id_Creditor: number
    Creditor: string
    Hours: string
    Status: boolean
    Sunday: boolean
    Monday: boolean
    Tuesday: boolean
    Wednesday: boolean
    Thursday: boolean
    Friday: boolean
    Saturday: boolean
}

export const IEditTaskFormSchema = z.object({
    tasksList: z.array(
        z.object({
            Id_Task_Config: z.number().min(1),
            Task: z.string().min(1),
            Observation: z.string().min(1),
            Id_Responsable: z.number().min(1),
            Id_Creditor: z.number().min(1),
            Creditor: z.string().min(1),
            Hours: z.string().min(1),
            Status: z.boolean(),
            Sunday: z.boolean(),
            Monday: z.boolean(),
            Tuesday: z.boolean(),
            Wednesday: z.boolean(),
            Thursday: z.boolean(),
            Friday: z.boolean(),
            Saturday: z.boolean()
        })
    )
})

export type { IEditTaskFormProps, IEditTaskFormData }