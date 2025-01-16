'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"
import { revalidateTag } from "next/cache"

export async function updateCreditorUniqueCapacity(id_unique_creditor: number, capacity: number) {
  const userParse: ITokenUserInitialValues = await GetUserToken()

  const resp = await fetch(`${process.env.BACKEND_DOMAIN}/update-creditor-unique-capacity`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + userParse.accessToken
    },
    body: JSON.stringify({ id_unique_creditor, capacity }),
  })
    .then(async (value) => {
      const data = await value.json()

      if (data.errors.length > 0) {
        return false
      }

      return true
    })
    .catch((error) => {
      return false
    })

  revalidateTag("creditors-operators-count")

  return resp
}