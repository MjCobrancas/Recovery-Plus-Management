import { z } from "zod"
import { IStatusOcorrence } from "./ICorrencePage"

interface IDialogCreateOcorrenceProps {
    CloseDialogOcorrences: Function
    statusOcorrences: IStatusOcorrence[]
}

interface IDialogForm {
    ocorrenceName: string
    cpc: string
    status: string
}

export const ocorrenceSchedule = z.object({
    ocorrenceName: z.string().min(1),
    cpc: z.string().min(1).refine((value) => {
        if (value !== '0' && value !== '1') {
            return false
        }

        return true
    }),
    status: z.string().min(1).refine((value) => {
        if (Number(value) <= 0) {
            return false
        }

        return true
    })
})

export type { IDialogCreateOcorrenceProps, IDialogForm }