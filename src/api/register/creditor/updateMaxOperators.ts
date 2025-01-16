'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"
import { revalidateTag } from "next/cache"

export async function updateMaxOperators(id_head_count: number, max_operators_morning: number, max_operators_afternoon: number) {
    const userParse: ITokenUserInitialValues = await GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/update-max-operators`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken
        },
        body: JSON.stringify({ id_head_count, max_operators_morning, max_operators_afternoon }),
    })
        .then(async (value) => {
            const data = await value.json()

            if (value.status != 201) {
                return false
            }

            return true
        })
        .catch((error) => {
            return false
        })

    revalidateTag("operators-in-company")

    return resp
}