import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getAllDisabledCreditors() {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-all-disabled-creditors`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userParse.accessToken,
      },
      next: {
        tags: ["allDisabledCreditors"]
      }
    })
      .then(async (value) => {
        const data = await value.json()
  
        if (value.status == 400) {
          return false
        }
  
        return data
      })
      .catch((error) => {
        return false
      })
  
    return resp
  }