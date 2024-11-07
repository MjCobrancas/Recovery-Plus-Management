'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { IVerifyUserDataResponse } from "@/interfaces/user/register/IVerifyUserData"
import { GetUserToken } from "@/utils/GetUserToken"

export async function verifyUserData(userName: string, cpf: string, toggleBoolean: string) {
    
    const userParse: ITokenUserInitialValues = GetUserToken()

    const response = await fetch(
        `${process.env.BACKEND_DOMAIN}/verify-username?&username=${userName}
      &cpfCnpj=${cpf}
      &isValidCpfCnpj=${toggleBoolean}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + userParse.accessToken,
            },
        }
    )
        .then(async (data) => {
            const { message, errors }: IVerifyUserDataResponse = await data.json()

            return {
                status: data.ok,
                message,
                errors
            }
        })
        .catch((error) => {
            return {
                status: false,
                message: "",
                errors: [{ message: String(error) }]
            }
        })

    return response
}