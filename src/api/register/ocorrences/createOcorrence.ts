'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"
import { revalidateTag } from "next/cache"

export async function createOcorrence<T>(object: T) {
    const userParse: ITokenUserInitialValues = await GetUserToken()

    const resp = await fetch(
        `${process.env.BACKEND_DOMAIN}/update-or-create-ocorrence`,
        {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + userParse.accessToken,
            },
            body: JSON.stringify(object),
        }
    )
        .then(async (value) => {
            const data = await value.json()

            if (data.status == 400) {
                return { message: data } as { message: string}
            }

            return data as { message: string }
        })
        .catch((error) => {
            return { message: error } as { message: string}
        })

    revalidateTag("ocorrences")
    revalidateTag("statusOcorrences")
        
    return resp
}