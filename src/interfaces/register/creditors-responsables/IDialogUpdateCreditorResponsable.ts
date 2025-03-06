import { RefObject } from "react"
import { z } from "zod"

interface IDialogUpdateCreditorResponsableProps {
    id_unique_creditor: number
    creditor: string
    responsablesList: { id_user: string, name: string, status: boolean }[]
    dialogRef: RefObject<HTMLDialogElement>
}

export const IDialogUpdateCreditorResponsableSchema = z.object({
    responsables: z.array(
        z.object({
            id_user: z.string().min(1),
            name: z.string().min(1),
            status: z.boolean()
        })
    )
})

type IDialogUpdateCreditorResponsableData = z.infer<typeof IDialogUpdateCreditorResponsableSchema>

export type { IDialogUpdateCreditorResponsableData, IDialogUpdateCreditorResponsableProps }

