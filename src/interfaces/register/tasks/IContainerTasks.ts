import { z } from "zod";
import { IManagerUsers } from "./IManagerUsers";
import { IUniqueCreditor } from "../unique-creditor/IUniqueCreditor";

interface IContainerTasks {
    creditors: IUniqueCreditor[]
    managerUsers: IManagerUsers[]
}

let regexHoursFormat = /^\d{2}:\d{2}$/g

export const createTaskSchema = z.object({
    creditor: z.string().min(1).refine((value => {
        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) <= 0) {
            return false
        }

        return true
    })),
    responsable: z.string().min(1).refine((value => {
        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) <= 0) {
            return false
        }

        return true
    })),
    hour: z.string().min(5),
    task: z.string().min(1),
    observation: z.string().min(1),
    sunday: z.boolean(),
    monday: z.boolean(),
    tuesday: z.boolean(),
    wednesday: z.boolean(),
    thursday: z.boolean(),
    friday: z.boolean(),
    saturday: z.boolean()
})

export type createTaskData = z.infer<typeof createTaskSchema>

export type { IContainerTasks };
