import { z } from "zod"

interface IUniqueCreditor {
    Id_Unique_Creditor: number
    Creditor: string
    Status: boolean
}

interface IDisabledUniqueCreditor {
    Id_Unique_Creditor: number
    Creditor: string
    Status: boolean
}

interface IUniqueCreditorTable {
    UniqueCreditors: IUniqueCreditor[]
    DisabledUniqueCreditors: IDisabledUniqueCreditor[]
}

interface IUniqueCreditorEditDialog {
    Id_Unique_Creditor: number
}

interface IUniqueCreditorRequest {
    Id_Unique_Creditor: number
    Creditor: string
    Status: boolean
}

export const createUniqueCreditorSchema = z.object({
    uniqueCreditor: z.string().min(1)
})

export const editUniqueCreditorSchema = z.object({
    uniqueCreditor: z.string().min(1),
    status: z.boolean()
})

export type { IUniqueCreditor, IDisabledUniqueCreditor, IUniqueCreditorTable, IUniqueCreditorEditDialog, IUniqueCreditorRequest }
export type createUniqueCreditorData = z.infer<typeof createUniqueCreditorSchema>
export type editUniqueCreditorData = z.infer<typeof editUniqueCreditorSchema>