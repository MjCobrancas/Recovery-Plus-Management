import { IGetAllOcorrences } from "@/interfaces/generics/GetAllOcorrences";
import { ICreditorRelationFilterAgings } from "./IGetRelation";
import { z } from "zod";

interface ICreateScheduleFormProps {
    ocorrences: IGetAllOcorrences
    schedules: ICreditorRelationFilterAgings[] | null
    disableAllButtons: (value: boolean) => void
    disableButtons: boolean
    resetFormType: Function
}

export const createScheduleSchema = z.object({
    createSchedules: z.array(
        z.object({
            id_creditor: z.number().min(1).refine((value) => {
                if (value <= 0 && String(Number(value)) == "NaN") {
                    return false
                }

                return true
            }),
            quantity: z.string().min(1).refine((value) => {
                if (Math.trunc(Number(value)) > 0) {
                    return true
                }

                return false
            }),
            id_ocorrence: z.string().min(1).refine((value) => {
                if (Math.trunc(Number(value)) > 0) {
                    return true
                }

                return false
            }),
            id_aging: z.string().min(1).refine((value) => {
                if (Number(value) > 0) {
                    return true
                }

                return false
            })
        })
    ),
})

export type { ICreateScheduleFormProps }