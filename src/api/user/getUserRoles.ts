'use server'

import { ITokenUserInitialValues, ITokenUserValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"
import { parseJWT } from "@/utils/ParseJWT"

const backendDomain = process.env.BACKEND_DOMAIN

export async function getUserRoles() {

    const userParse: ITokenUserInitialValues = GetUserToken()
    const userTokenValues: ITokenUserValues = parseJWT(userParse.accessToken)

    const resp = await fetch(`${backendDomain}/get-user-roles`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify({ id_user: userTokenValues.id }),
    })
        .then(async (value) => {
            const data = await value.json()

            if (value.status != 200) {
                return {
                    data: [],
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
                data: [],
                status: false
            }
        })

    return resp
}