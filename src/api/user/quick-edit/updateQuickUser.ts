'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"
import { revalidateTag } from "next/cache"

export async function updateQuickUser<T>(object: any) {

    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/update-quick-user`, {
        method: "PUT",
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

    revalidateTag(`user-info-${object.id_user}`)

    return resp
}