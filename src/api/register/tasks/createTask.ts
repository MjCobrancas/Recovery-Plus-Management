'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function createTask<T>(object: T) {

    const userParse: ITokenUserInitialValues = await GetUserToken()

    const resp = await fetch(
        `${process.env.BACKEND_DOMAIN}/create-task`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify(object)
    })
        .then(async (value) => {
            const data = await value.json()

            console.log(data.errors)

            if (data.errors.length > 0) {
                return {
                    data: data.errors,
                    status: false
                }
            }

            return {
                data: data.data,
                status: true
            }
        })
        .catch((error) => {
            console.log(error)

            return {
                data: [],
                status: false
            }
        })

    return resp
}
