'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"
import { revalidateTag } from "next/cache"

export async function changeStatusOcorrence(id: string) {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(
        `${process.env.BACKEND_DOMAIN}/changeStatus-ocorrence-statusOcorrence/${id}`,
        {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + userParse.accessToken,
            },
        }
    )
        .then(async (value) => {
            if (value.status == 400) {
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