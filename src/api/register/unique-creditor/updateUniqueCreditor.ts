'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"
import { revalidateTag } from "next/cache"

export async function updateUniqueCreditor<T>(object: T) {

    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(
        `${process.env.BACKEND_DOMAIN}/update-unique-creditor`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify({ uniqueCreditor: object })
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

    revalidateTag("uniqueCreditor")
    return resp
}
