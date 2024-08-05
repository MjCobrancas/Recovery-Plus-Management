'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

const backendDomain = process.env.BACKEND_DOMAIN

export async function getUsersByName(userName: string) {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(
        `${backendDomain}/get-user-by-name-id/${userName}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
                Authorization: "Bearer " + userParse.accessToken,
            },
        }
    )
        .then(async (value) => {
            const data1 = await value.json()

            if (data1.message) {
                return {
                    users: {
                        data: [],
                        count: 0
                    },
                    take: 0,
                    skip: 0,
                    count: 0
                 } as unknown
            }

            return {users: {data: data1}, take: 0, skip: 0, count: 0} as unknown
        })
        .catch(() => {
            return {
                users: {
                    data: [],
                    count: 0
                },
                take: 0,
                skip: 0,
                count: 0
             } as unknown
        })

    return resp
}