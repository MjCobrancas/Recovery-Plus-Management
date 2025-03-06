'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { ICreditorResponsableById } from "@/interfaces/register/creditors-responsables/ICreditorResponsableById"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getCreditorResponsableById(id_unique_creditor: number) {
  const userParse: ITokenUserInitialValues = await GetUserToken()

  const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-creditor-responsable-by-id/${id_unique_creditor}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + userParse.accessToken,
    }
  })
    .then(async (value) => {
      const data = await value.json()

      if (data.errors.length > 0) {
        return []
      }

      return data.data as ICreditorResponsableById[]
    })
    .catch((error) => {
      return []
    })

  return resp
}
