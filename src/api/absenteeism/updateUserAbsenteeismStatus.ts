'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function updateUserAbsenteeismStatus(id_absenteeism_schedule: number, absenteeism_status: boolean) {
    const userParse: ITokenUserInitialValues = await GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/update-user-absenteeism-status`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify({ id_absenteeism_schedule, absenteeism_status })
    })
        .then(async (value) => {
            const data = await value.json()

            if (data.errors.length > 0) {
                return false
            }

            return true
        })
        .catch((error) => {
            return false
        })

    return resp
}
