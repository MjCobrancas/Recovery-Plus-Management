'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getUserInfo(idUser: string) {

    const userParse: ITokenUserInitialValues = await GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-user-info/${idUser}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        next: {
            tags: [`user-info-${idUser}`]
        },
        cache: "no-cache"
    })
        .then(async (data) => {
            const datas = await data.json()

            if (datas.data == null || datas.data == undefined) {
                return {
                    data: null,
                    status: false
                }
            }

            return {
                data: datas.data,
                status: true
            }
        })
        .catch((error) => {
            return {
                data: null,
                status: false
            }
        })

    return resp
}