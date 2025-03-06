'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"
import { revalidateTag } from "next/cache"

export async function updateCreditorResponsable(id_unique_creditor: number, responsables: { id_user: number, status: boolean }[]) {
    const userParse: ITokenUserInitialValues = await GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/update-creditor-responsable`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify({ id_unique_creditor, responsables })
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
                data: data.data as string,
                status: true
            }
        })
        .catch((error) => {
            return {
                data: null,
                status: false
            }
        })

    revalidateTag("get-all-creditors-responsables")

    return resp
}
