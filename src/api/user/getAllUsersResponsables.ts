'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { IUsersResponsables } from "@/interfaces/generics/IUsersResponsables"
import { GetUserToken } from "@/utils/GetUserToken"

const backendDomain = process.env.BACKEND_DOMAIN

export async function getAllUsersResponsables() {

    const userParse: ITokenUserInitialValues = await GetUserToken()

    const resp = await fetch(`${backendDomain}/get-all-users-responsables`, {
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
                    data: [],
                    status: false
                }
            }

            return {
                data: data.data as IUsersResponsables[],
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