'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"
import { revalidateTag } from "next/cache"

export async function updateOcorrenceStatus<T>(value: T) {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(
        `${process.env.BACKEND_DOMAIN}/update-or-create-ocorrence`,
        {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + userParse.accessToken,
            },
            body: JSON.stringify(value),
        }
    )
        .then(async (value) => {
            const data = await value.json()

            if (data.message != "Created") {
                return false
            }

            return true
        })
        .catch((error) => {
            return false
        })

    revalidateTag("ocorrences")
    revalidateTag("statusOcorrences")

    return resp
}