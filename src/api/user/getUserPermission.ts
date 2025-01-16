'use server'

import { ITokenUserInitialValues, ITokenUserValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"
import { parseJWT } from "@/utils/ParseJWT"

const backendDomain = process.env.BACKEND_DOMAIN

export async function getUserPermission() {

    const userParse: ITokenUserInitialValues = await GetUserToken()
    const userTokenValues: ITokenUserValues = parseJWT(userParse.accessToken)

    const resp = await fetch(`${backendDomain}/get-user-permission/${userTokenValues.id}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        }
    })
        .then(async (value) => {
            const data = await value.json()

            if (data.errors.length > 0) {
                return {
                    Permission_Level_Id: 6
                }
            }

            return {
                Permission_Level_Id: data.data.Permission_Level_Id as number,
            }
        })
        .catch((error) => {
            return {
                Permission_Level_Id: 6
            }
        })

    return resp
}
