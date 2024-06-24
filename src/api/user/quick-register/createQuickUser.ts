'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function createQuickUser<T>(object: T) {

    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/create-quick-user`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify(object),
    })
        .then(async (data) => {
            const datas = await data.json()

            if (datas.status != 201) {
                return false
            }

            return true

        })
        .catch((error) => {
            return false
        })

    return resp
}