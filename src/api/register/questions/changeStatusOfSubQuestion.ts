'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function changeStatusOfSubQuestion(subQuestionId: string) {
    const userParse: ITokenUserInitialValues = await GetUserToken()

    const resp = await fetch(
        `${process.env.BACKEND_DOMAIN}/change-status-subquestion/${subQuestionId}`,
        {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + userParse.accessToken,
            },
        }
    )
        .then(async (value) => {
            if (value.status == 400) {
                return false
            }

            return true
        })
        .catch((error) => {
            return false
        })

    return resp
}