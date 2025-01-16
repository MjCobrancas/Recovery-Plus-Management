'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getOperatorsInCompany() {
    const userParse: ITokenUserInitialValues = await GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-operators-in-company`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        next: {
            tags: ["operators-in-company"]
        }
    })
        .then(async (value) => {
            const data = await value.json()

            if (value.status != 200) {
                return {
                    Id_Head_Count: 0,
                    Max_Operators: 0,
                    Max_Operators_Morning: 0,
                    Max_Operators_Afternoon: 0,
                    Operators_Count: 0,
                    Operators_Morning_Count: 0,
                    Operators_Afternoon_Count: 0,
                    Operators_Presence: 0,
                    Operators_Morning_Count_Presence: 0,
                    Operators_Afternoon_Count_Presence: 0
                }
            }

            return data.data
        })
        .catch((error) => {
            return {
                Id_Head_Count: 0,
                Max_Operators: 0,
                Max_Operators_Morning: 0,
                Max_Operators_Afternoon: 0,
                Operators_Count: 0,
                Operators_Morning_Count: 0,
                Operators_Afternoon_Count: 0,
                Operators_Presence: 0,
                Operators_Morning_Count_Presence: 0,
                Operators_Afternoon_Count_Presence: 0
            }
        })

    return resp
}