import { IOcorrence } from "@/interfaces/generics/GetAllOcorrences"
import { IStatusOcorrence } from "./ICorrencePage"
import { z } from "zod"

interface IUpdateOcorrenceFormProps {
    ocorrences: IOcorrence
    statusOcorrences: IStatusOcorrence[]
    editOcorrence: boolean
    idOcorrence: number
    enableEdit: (index: number) => void
    cancelOcorrenceEdit: Function
}

interface IUpdateOcorrenceForm {
    idOcorrence: number
    ocorrence: string
    idStatusOcorrence: string
    cpc: string
    status: string
}

export const updateOcorrenceSchedule = z.object({
    idOcorrence: z.number().min(1).refine((value) => {
        if (value <= 0) {
            return false
        }

        return true
    }),
    cpc: z.string().min(1).refine((value) => {
        if (value !== 'true' && value !== 'false') {
            return false
        }

        return true
    }),
    status: z.string().min(1).refine((value) => {
        if (value !== 'true' && value !== 'false') {
            return false
        }

        return true
    }),
    idStatusOcorrence: z.string().min(1).refine((value) => {
        if (Number(value) <= 0) {
            return false
        }

        return true
    }),
    ocorrence: z.string().min(1)
})

export type { IUpdateOcorrenceFormProps, IUpdateOcorrenceForm }