'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function updateSchedules<T>(data: T) {
    const userParse: ITokenUserInitialValues = await GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/update-creditor-relations`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken
        },
        body: JSON.stringify({ data })
    })
        .then(async (value) => {

            if (value.status != 201) {
                return {
                    status: false
                }
            }

            return {
                status: true
            }
        })
        .catch((error) => {
            return {
                status: false,
            }
        })

    return resp
}