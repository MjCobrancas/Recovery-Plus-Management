import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getAllOcorrences(getAll = false) {

    const userParse: ITokenUserInitialValues = await GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-all-ocorrences?getAll=${getAll}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userParse.accessToken,
      },
      next: {
        tags: ["ocorrences"]
      }
    })
      .then(async (value) => {
        const data = await value.json()
  
        if (value.status == 400) {
          return []
        }
  
        return data
      })
      .catch((error) => {
        return []
      })
  
    return resp
  }