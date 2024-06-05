'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"
import { revalidateTag } from "next/cache"

export async function createNewQuestion<T>(question: T) {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/create-question`, {
        method: "POST",
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
                return {
                    status: false
                }
            }

            return {
                status: true,
            }
        })
        .catch((error) => {
            return {
                status: false,
            }
        })

    revalidateTag("questions")

    return resp
}