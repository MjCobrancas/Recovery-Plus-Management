'use server'

import { IGetOperatorInAbsenteeismById } from "@/interfaces/absenteeism/IGetOperatorInAbsenteeismById"
import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getOperatorInAbsenteeismById(id_absenteeism_schedule: number) {
    const userParse: ITokenUserInitialValues = await GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-operator-in-absenteeism-by-id/${id_absenteeism_schedule}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        }
    })
        .then(async (value) => {
            const data = await value.json()

            if (data.errors.length > 0) {
                return {
                    data: null,
                    status: false
                }
            }

            return {
                data: data.data as IGetOperatorInAbsenteeismById,
                status: true
            }
        })
        .catch((error) => {
            return {
                data: null,
                status: false
            }
        })

    return resp
}
