'use server'

import { ITokenUserInitialValues, ITokenUserValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"
import { parseJWT } from "@/utils/ParseJWT"

export async function updateUserAbsenteeism(id_absenteeism_schedule: number, is_on_company: boolean, is_justified_absence: boolean, observation: string) {

    const userParse: ITokenUserInitialValues = await GetUserToken()
    const userValues: ITokenUserValues = parseJWT(userParse.accessToken)

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/update-user-absenteeism`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify({ id_absenteeism_schedule, is_on_company, is_justified_absence, observation, id_responsable: userValues.id })
    })
        .then(async (value) => {
            const data = await value.json()

            console.log(data.errors)

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
