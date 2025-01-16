import { z } from "zod";
import { ICreditorGetAllCreditors } from "../generics/GetAllCreditors";
import { IGetAllOperators } from "../generics/IGetAllOperators";
import { IGetAllOperatorsInAbsenteeism } from "./IGetAllOperatorsInAbsenteeism";

interface IFilterAbsenteeismProps {
    creditors: ICreditorGetAllCreditors[]
    operators: IGetAllOperators[]
    setValueOperatorsArray: (operatorsArray: IGetAllOperatorsInAbsenteeism[]) => void
}

export const IFilterAbsenteeismSchema = z.object({
    date_init: z.string().min(1).refine((value) => {
        const regexDateInit = /\d{4}-\d{2}-\d{2}/g

        return regexDateInit.test(value)
    }),
    date_end: z.string().min(1).refine((value) => {
        const regexDateEnd = /\d{4}-\d{2}-\d{2}/g

        return regexDateEnd.test(value)
    }),
    id_creditor: z.string().min(1).refine((value) => {
        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) < 0) {
            return false
        }

        return true
    }),
    id_operator: z.string().min(1).refine((value) => {
        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) < 0) {
            return false
        }

        return true
    })
})

export type IFilterAbsenteeismData = z.infer<typeof IFilterAbsenteeismSchema>

export type { IFilterAbsenteeismProps }