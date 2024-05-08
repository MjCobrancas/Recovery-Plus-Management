'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"
import { revalidateTag } from "next/cache"

export async function updateNotes<T>(value: T) {

    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/update-days-notes`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userParse.accessToken,
      },
      body: JSON.stringify(value),
    })
      .then(async (value: any) => {  
        if (value.status == 400) {
          return false
        }
  
        return true
      })
      .catch((error) => {
        return false
      })

      revalidateTag("getAllNotes")
  
    return resp
  }