'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

const backendDomain = process.env.BACKEND_DOMAIN

export async function createUser<T>(object: T) {

    const userParse: ITokenUserInitialValues = await GetUserToken()

    const resp = await fetch(`${backendDomain}/create-user`, {
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

            const { message, page, position } = datas

            return {
                status: data.ok,
                error: message,
                page: page,
                position: position,
            } as { status: boolean, error: string, page: number, position: number }
        })
        .catch((error) => {
            return {
                status: false,
                error: "",
                page: 0,
                position: 0,
            } as { status: boolean, error: string, page: number, position: number }
        })

    return resp
}