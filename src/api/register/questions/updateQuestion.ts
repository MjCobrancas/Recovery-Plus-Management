'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"
import { revalidateTag } from "next/cache"

export async function updateQuestion<T>(question: T) {
    const userParse: ITokenUserInitialValues = await GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/update-question`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify(question),
    })
        .then(async (value) => {
            const data = await value.json()

            if (value.status == 400) {
                return false
            }

            return true
        })
        .catch((err) => {
            return false
        })

    revalidateTag("questions")
    
    return resp
}