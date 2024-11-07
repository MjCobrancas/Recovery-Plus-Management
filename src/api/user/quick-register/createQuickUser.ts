'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { IQuickRegisterResponse } from "@/interfaces/user/quick-register/IQuickRegisterResponse"
import { GetUserToken } from "@/utils/GetUserToken"

export async function createQuickUser<T>(object: T) {

    const userParse: ITokenUserInitialValues = GetUserToken()

    const errorDefaultMessage = [{ message: "Houve um erro na criação do usuário, revise os valores e tente novamente!" }]

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/create-quick-user`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify(object),
    })
        .then(async (data) => {
            const { status, customErrorMessage }: IQuickRegisterResponse = await data.json()

            if (status != 201) {
                return {
                    messages: customErrorMessage.length > 0 ? customErrorMessage : errorDefaultMessage,
                    status: false
                }
            }

            return {
                messages: [{ message: "Usuário criado com sucesso!" }],
                status: true
            }

        })
        .catch(() => {
            return {
                messages: errorDefaultMessage,
                status: false
            }
        })

    return resp
}