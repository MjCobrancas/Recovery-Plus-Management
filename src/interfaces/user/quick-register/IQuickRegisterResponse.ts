interface IQuickRegisterResponse {
    data: string | null
    errors: {
        message: string
    }[]
    customErrorMessage: {
        message: string
    }[]
    status: number
    serverError: boolean
}

export type { IQuickRegisterResponse }
