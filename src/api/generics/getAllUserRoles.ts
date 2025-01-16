'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { IUserRoles } from "@/interfaces/user/register/ContainerRegisterProps"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getAllUserRoles() {
    const userParse: ITokenUserInitialValues = await GetUserToken()


    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-all-user-roles`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
    })
        .then(async (value) => {
            const data = await value.json()

            if (data.errors.length > 0) {
                return {
                    data: [],
                    status: false
                }
            }

            return {
                data: data.data as IUserRoles[],
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
