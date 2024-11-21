import { z } from "zod"
import { IUniqueCreditor } from "../unique-creditor/IUniqueCreditor"

interface ICreateCreditorModal {
    CreditorsUnique: IUniqueCreditor[]
}

export const createCreditorModalSchema = z.object({
    idCreditor: z.string().min(1),
    creditor:  z.string().min(1),
    identifier: z.string().refine((value) => {
        return value == "1"
    }),
    returns: z.string().min(1),
    meta: z.string().min(1),
    operatorsNumber: z.string().min(1),
    workingDays: z.string().min(1),
    creditorsUniqueArray: z.array(z.object({
        idCreditorUnique: z.number().min(1),
        creditorName: z.string().min(1),
        appendToTeam: z.boolean()
    }))
})

export type createCreditorModalData = z.infer<typeof createCreditorModalSchema>

export type { ICreateCreditorModal }
