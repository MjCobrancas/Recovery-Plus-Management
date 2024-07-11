'use server'

import { ITokenUserInitialValues, ITokenUserValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"
import { parseJWT } from "@/utils/ParseJWT"

const backendDomain = process.env.BACKEND_DOMAIN

export async function verifyUserPermission(id_operator: number) {

    const userParse: ITokenUserInitialValues = GetUserToken()
    const userTokenValues: ITokenUserValues = parseJWT(userParse.accessToken)

    const resp = await fetch(`${backendDomain}/verify-user-role`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify({ id_user: userTokenValues.id, id_operator }),
    })
        .then(async (value) => {
            const data = await value.json()

            if (value.status != 200) {
                return {
                    status: false,
                    canChange: false
                }
            }

            return {
                status: true,
                canChange: data.canChange
            }
        })
        .catch((error) => {
            return {
                status: false,
                canChange: false
            }
        })

    return resp
}