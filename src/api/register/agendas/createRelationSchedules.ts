'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function createRelationToSchedules<T>(object: T[]) {
    const userParse: ITokenUserInitialValues = await GetUserToken()

    let data = [
        ...object
    ]

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/create-creditor-relations`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify({ data })
    })
        .then(async (value) => {

            if (value.status != 201) {
                return {
                    status: false,
                    data: null
                }
            }

            return {
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