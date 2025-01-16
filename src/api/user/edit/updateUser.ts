'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"
import { revalidateTag } from "next/cache"

const backendDomain = process.env.BACKEND_DOMAIN

export async function updateUser<T>(object: T, userName: string, id: string) {

    const userParse: ITokenUserInitialValues = await GetUserToken()

    const resp = await fetch(`${backendDomain}/update-user/${userName}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify(object),
    })
        .then(async () => {
            return {
                status: true
            }
        })
        .catch((error) => {
            console.log(error)
            return {
                status: false
            }
        })

    revalidateTag(`user-edit-${id}`)

    return resp
}