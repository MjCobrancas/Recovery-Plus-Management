'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getAllStatusOcorrences() {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-all-statusOcorrences`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        next: {
            tags: ["statusOcorrences"]
        }
    })
        .then(async (value) => {
            const data = await value.json()

            if (data.statusOcorrence.length <= 0 || data.statusOcorrence == undefined) {
                return {
                    status: false,
                    data: []
                }
            }

            return {
                data: data.statusOcorrence,
                status: true
            }
        })
        .catch((error) => {
            return {
                status: false,
                data: []
            }
        })

    return resp
}