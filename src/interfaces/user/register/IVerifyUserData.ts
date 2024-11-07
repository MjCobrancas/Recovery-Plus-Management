interface IVerifyUserDataResponse {
    message: string
    page: number
    errors: {
        message: string
    }[]
}

export type { IVerifyUserDataResponse }
