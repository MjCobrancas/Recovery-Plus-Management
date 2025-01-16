'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

const backendDomain = process.env.BACKEND_DOMAIN

export async function getUserTurns() {

    const userParse: ITokenUserInitialValues = await GetUserToken()

    const resp = await fetch(`${backendDomain}/get-all-turns`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        }
    })
        .then(async (value) => {
            const data = await value.json()

            if (value.status != 200) {
                return []
            }

            return data.data
        })
        .catch((error) => {
            return []
        })

    return resp
}