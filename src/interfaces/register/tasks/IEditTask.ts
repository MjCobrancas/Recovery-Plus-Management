import { z } from "zod";
import { IManagerUsers } from "./IManagerUsers";

interface IEditTaskData {
    managerUsers: IManagerUsers[]
}

interface ITaskById {
    Id_Task_Config: number
    Task: string
    Observation: string
    Id_Responsable: number
    Id_Creditor: number
    Creditor: string
    Days: string
    Hours: number
    Minutes: number
    Status: boolean
}

export const editTaskSchema = z.object({
    responsable: z.string().min(1),
})

export type editTaskData = z.infer<typeof editTaskSchema>

export type { IEditTaskData, ITaskById }