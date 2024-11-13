'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getUniqueCreditorById(id_unique_creditor: number) {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-unique-creditor-by-id/${id_unique_creditor}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userParse.accessToken,
      },
      next: { tags: [ "uniqueCreditor" ] }
    })
      .then(async (value) => {
        const data = await value.json()
  
        if (value.status == 400) {
          return false
        }
  
        return data.data
      })
      .catch((error) => {
        return false
      })

      return resp
    }