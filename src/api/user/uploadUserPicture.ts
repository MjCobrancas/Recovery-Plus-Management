'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function uploadImageOfUser(nameOfUser: string, file: any, removed: boolean) {

    const userParse: ITokenUserInitialValues = await GetUserToken()

    const uploadImage = await fetch(
        `${process.env.BACKEND_DOMAIN}/upload-image/${nameOfUser}?&remove=${removed}`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${userParse.accessToken}`,
            },
            body: file,
        }
    )
        .then(async (resp) => {
            if (resp.status == 400) {
                return false
            }

            return true
        })
        .catch(() => {
            return false
        })

    return uploadImage
}