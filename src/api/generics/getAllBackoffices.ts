import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { IBackOffice } from "@/interfaces/generics/IBackOffice"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getAllBackoffices() {
    const userParse: ITokenUserInitialValues = await GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-all-backoffices`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userParse.accessToken,
      },
      next: {
        tags: ["allCreditors"]
      }
    })
      .then(async (value) => {
        const data = await value.json()
  
        if (value.status == 400) {
          return []
        }
  
        return data as IBackOffice[]
      })
      .catch((error) => {
        return []
      })
  
    return resp
  }