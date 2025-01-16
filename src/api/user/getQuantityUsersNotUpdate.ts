'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

const backendDomain = process.env.BACKEND_DOMAIN

export async function getQuantityUsersNotUpdate() {

    const userParse: ITokenUserInitialValues = await GetUserToken()

    const resp = await fetch(`${backendDomain}/get-user-quantity-not-update-data`, {
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
                return 0
            }

            return data.data
        })
        .catch((error) => {
            return 0
        })

    return resp
}