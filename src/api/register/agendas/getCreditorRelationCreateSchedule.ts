'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getCreditorRelationToCreateSchedule(id_creditor: number, id_ocorrences: number[]) {

    const userParse: ITokenUserInitialValues = GetUserToken()

    let ocorrencesArray: { id_ocorrence: number }[] = []

    for (let value of id_ocorrences) {
        ocorrencesArray.push({
            id_ocorrence: value
        })
    }

    let correctObject = {
        id_creditor: id_creditor,
        ocorrences: ocorrencesArray
    }


    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-creditors-relation-filter-agings`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify(correctObject)
    })
        .then(async (value) => {
            const data = await value.json()

            if (value.status != 200 || data.length <= 0) {
                return {
                    status: false,
                    data: null
                }
            }

            return {
                data: data,
                status: true
            }
        })
        .catch((error) => {
            return {
                status: false,
                data: null
            }
        })

    return resp
}