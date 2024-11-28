'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getCreditorsOperators() {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-creditors-operators-count`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userParse.accessToken,
      },
      next: {
        tags: ["creditors-operators-count"]
      }
    })
      .then(async (value) => {
        const data = await value.json()
  
        if (value.status != 200) {
          return null
        }
  
        return data.data
      })
      .catch((error) => {
        return null
      })

      return resp
    }