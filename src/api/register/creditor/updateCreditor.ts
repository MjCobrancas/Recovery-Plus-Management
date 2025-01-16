'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"
import { revalidateTag } from "next/cache"

export async function updateCreditor<T>(object: T) {
  const userParse: ITokenUserInitialValues = await GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/update-creditor?isCreated=false`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userParse.accessToken
      },
      body: JSON.stringify(object),
    })
      .then(async (value) => {
        const data = await value.json()
  
        if (data.message != "Updated") {
          return {
            status: false,
            data: data[0].message
          }
        }
  
        return {
          status: true,
          data: data
        }
      })
      .catch((error) => {
        return {
          status: false,
          data: null
        }
      })

      revalidateTag("allCreditors")
  
    return resp
  }