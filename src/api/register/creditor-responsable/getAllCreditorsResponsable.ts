'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { ICreditorsResponsables } from "@/interfaces/register/creditors-responsables/ICreditorsResponsables"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getAllCreditorsResponsable() {
  const userParse: ITokenUserInitialValues = await GetUserToken()

  const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-all-creditors-responsables`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + userParse.accessToken,
    },
    next: {
      tags: ["get-all-creditors-responsables"]
    }
  })
    .then(async (value) => {
      const data = await value.json()

      if (data.errors.length > 0) {
        return []
      }

      return data.data as ICreditorsResponsables[]
    })
    .catch((error) => {
      return []
    })

  return resp
}
