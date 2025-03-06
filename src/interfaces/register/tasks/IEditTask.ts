import { z } from "zod";
import { IManagerUsers } from "./IManagerUsers";
import { IUniqueCreditor } from "../unique-creditor/IUniqueCreditor";

interface IEditTaskData {
    managerUsers: IManagerUsers[]
    creditors: IUniqueCreditor[]
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
    responsable: z.string().min(1).refine((value) => {
        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) <= 0) {
            return false
        }

        return true
    }),
    id_unique_creditor: z.string().min(1).refine((value) => {
        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) < 0) {
            return false
        }

        return true
    })
})

export type editTaskData = z.infer<typeof editTaskSchema>

export type { IEditTaskData, ITaskById }