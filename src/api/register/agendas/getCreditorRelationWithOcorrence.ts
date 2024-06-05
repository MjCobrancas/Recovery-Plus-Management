'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getCreditorRelationWithOcorrence(id_creditor: number, id_ocorrences: number[]) {

    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-creditor-relations`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify({
            id_creditor,
            id_ocorrences
        })
    })
        .then(async (value) => {
            const data = await value.json()

            if (value.status != 200 || data.length <= 0) {
                return {
                    status: false,
                    data: null
                }
            }

            return {
                data: data,
                status: true
            }
        })
        .catch((error) => {
            return {
                status: false,
                data: null
            }
        })

    return resp
}