import { z } from "zod"
import { IGetOperatorsInCompany } from "./IGetOperatorsInCompany"

interface IDialogEditMaxOperatorsProps {
    operatorsCount: IGetOperatorsInCompany
}

interface IDialogEditMaxOperatorsData {
    max_operators_morning: string
    max_operators_afternoon: string
}

export const IDialogEditMaxOperatorsSchema = z.object({
    max_operators_morning: z.string().min(1).refine((value) => {
        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) <= 0) {
            return false
        }

        return true
    }),
    max_operators_afternoon: z.string().min(1).refine((value) => {
        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) <= 0) {
            return false
        }

        return true
    })
})

export type { IDialogEditMaxOperatorsProps, IDialogEditMaxOperatorsData }
