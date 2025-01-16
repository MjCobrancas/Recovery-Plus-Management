import { z } from "zod"

interface IFormEmailProps {
    updatePage: (index: number) => void
    setEmailsFormValue: (value: IFormEmail[], isFetchRequest: boolean) => void
    emailsForm: IFormEmail[]
    userEmails?: IFormEmail[]
}

interface IFormEmail {
    email_owner: string
    userEmail: string
    saved: boolean
    status?: string | boolean
    id?: string
}

interface IFormEmailCardProps {
    id?: string
    index: number
    item: IFormEmail
    removeUserEmail: (index: number) => void
    resetEmail: (index: number) => void
    saveEmail: (index: number, objectData: IFormEmail) => void
    changeEmailStatus?: (index: number) => void
}

export const createFormEmailSchema = z.object({
    userEmail: z.string().refine((value) => {
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

        return regexEmail.test(value)
    }),
    status: z.string().or(z.boolean()),
    email_owner: z.string().min(1)
})

export type createFormEmailData = z.infer<typeof createFormEmailSchema>

export type { IFormEmailProps, IFormEmail, IFormEmailCardProps }