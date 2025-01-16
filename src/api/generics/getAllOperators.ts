import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { IGetAllOperators } from "@/interfaces/generics/IGetAllOperators"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getAllOperators() {
    const userParse: ITokenUserInitialValues = await GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-all-operators`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userParse.accessToken,
      }
    })
      .then(async (value) => {
        const data = await value.json()
  
        if (value.status == 400) {
          return []
        }
  
        return data as IGetAllOperators[]
      })
      .catch((error) => {
        return []
      })
  
    return resp
  }