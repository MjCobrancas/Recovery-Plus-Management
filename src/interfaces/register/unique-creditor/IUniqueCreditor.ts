import { z } from "zod"

interface IUniqueCreditor {
    Id_Unique_Creditor: number
    Creditor: string
    Status: boolean
}

interface IUniqueCreditorTable {
    creditors: IUniqueCreditor[]
}

interface IUniqueCreditorDialog {
    Id_Unique_Creditor: number
}

interface IUniqueCreditorRequest {
    Id_Unique_Creditor: number
    Creditor: string
    Status: boolean
}

export const editUniqueCreditorSchema = z.object({
    uniqueCreditor: z.string().min(1),
    status: z.boolean()
})

export type { IUniqueCreditor, IUniqueCreditorTable, IUniqueCreditorDialog, IUniqueCreditorRequest }
export type editUniqueCreditorData = z.infer<typeof editUniqueCreditorSchema>