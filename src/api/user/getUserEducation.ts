'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

const backendDomain = process.env.BACKEND_DOMAIN

export async function getUserEducation() {

    const userParse: ITokenUserInitialValues = await GetUserToken()

    const resp = await fetch(`${backendDomain}/get-user-education`, {
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
                return {
                    data: [],
                    status: false
                }
            }

            return {
                data: data.data,
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