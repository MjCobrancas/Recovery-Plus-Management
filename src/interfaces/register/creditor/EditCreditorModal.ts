import { z } from "zod"

interface IEditCreditorModal {
    Id_Creditor: number
}

interface IEditRequestCreditorModal {
    Active: boolean
    Creditor: string
    Identifier: number
    Returns: number
    Target: number
    Number_Operators: number
    Working_Days: number
}

export const editCreditorModalSchema = z.object({
    creditor:  z.string().min(1),
    identifier: z.string().refine((value) => {
        if (value == "1") {
            return true
        }

        return false
    }),
    returns: z.string().min(1),
    meta: z.string().min(1),
    operatorsNumber: z.string().min(1),
    workingDays: z.string().min(1),
    active: z.boolean()
})

export type { IEditCreditorModal, IEditRequestCreditorModal }
export type editCreditorModalData = z.infer<typeof editCreditorModalSchema>