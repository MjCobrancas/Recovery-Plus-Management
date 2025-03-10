'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function updateTasks<T>(object: T) {

    const userParse: ITokenUserInitialValues = await GetUserToken()

    const resp = await fetch(
        `${process.env.BACKEND_DOMAIN}/update-tasks`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify({ dataTasks: object })
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
                data: data.data,
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
