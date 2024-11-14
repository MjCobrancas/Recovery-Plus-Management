import { z } from "zod"

interface IEditCreditorModal {
    Id_Creditor: number
}

interface IEditRequestCreditorModal {
    creditor: {
        Active: boolean
        Creditor: string
        Identifier: number
        Returns: number
        Target: number
        Number_Operators: number
        Working_Days: number
    }    
    creditorsUniqueRelation: ICreditorsUniqueRelation[]
    creditorsUniqueGeneric: ICreditorsUniqueRelation[]
}

interface ICreditorsUniqueRelation {
    Id_Unique_Creditor: number
    Creditor: string
    Status: boolean
    Is_New_Element: boolean
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
    active: z.boolean(),
    creditorUniqueRelation: z.array(z.object({
        Id_Unique_Creditor: z.number().min(1),
        Creditor: z.string().min(1),
        Status: z.boolean(),
        Is_New_Element: z.boolean()
    })),
    creditorUniqueGeneric: z.array(z.object({
        Id_Unique_Creditor: z.number().min(1),
        Creditor: z.string().min(1),
        Status: z.boolean(),
        Is_New_Element: z.boolean()
    }))
})

export type { IEditCreditorModal, IEditRequestCreditorModal }
export type editCreditorModalData = z.infer<typeof editCreditorModalSchema>