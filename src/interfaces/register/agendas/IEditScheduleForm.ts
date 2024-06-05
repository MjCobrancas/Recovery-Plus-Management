import { IGetAllOcorrences } from "@/interfaces/generics/GetAllOcorrences"
import { IGetRelationCreditorsWithOcorrenceData } from "./IGetRelation"
import { IAgings } from "@/interfaces/generics/Agings"
import { z } from "zod"

interface IEditScheduleForm {
    ocorrences: IGetAllOcorrences
    schedules: IGetRelationCreditorsWithOcorrenceData[] | null
    agings: IAgings[]
    disableAllButtons: (value: boolean) => void
    disableButtons: boolean
    resetFormType: Function 
}

export const editScheduleSchema = z.object({
    editSchedules: z.array(
        z.object({
            Id_Creditors_Ocorrence: z.number().min(1).refine((value) => {
                if (Math.trunc(Number(value)) > 0) {
                    return true
                }

                return false
            }),
            Id_Creditor: z.number().min(1).refine((value) => {
                if (Math.trunc(Number(value)) > 0) {
                    return true
                }

                return false
            }),
            Id_Ocorrence: z.string().min(1).refine((value) => {
                if (Math.trunc(Number(value)) > 0) {
                    return true
                }

                return false
            }),
            Id_Aging: z.string().min(1).refine((value) => {
                if (Number(value) > 0) {
                    return true
                }

                return false
            }),
            Quantity: z.string().min(1).refine((value) => {
                if (Math.trunc(Number(value)) > 0) {
                    return true
                }

                return false
            }),
            Status: z.boolean()
        })
    ),
})

export type { IEditScheduleForm }