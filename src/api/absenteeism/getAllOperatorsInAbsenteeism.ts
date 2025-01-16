'use server'

import { IGetAllOperatorsInAbsenteeism } from "@/interfaces/absenteeism/IGetAllOperatorsInAbsenteeism"
import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { getDateToday } from "@/utils/GetDateToday"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getAllOperatorsInAbsenteeism(date_init: string = getDateToday(), date_end: string = getDateToday(), id_creditor: number = 0, id_operator: number = 0) {
    const userParse: ITokenUserInitialValues = await GetUserToken()


    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-all-operators-in-absenteeism`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify({ date_init, date_end, id_creditor, id_operator })
    })
        .then(async (value) => {
            const data = await value.json()

            if (data.errors.length > 0) {
                return {
                    data: [],
                    status: false
                }
            }

            return {
                data: data.data as IGetAllOperatorsInAbsenteeism[],
                status: true
            }
        })
        .catch((error) => {
            return {
                data: [],
                status: false
            }
        })

    return resp
}
