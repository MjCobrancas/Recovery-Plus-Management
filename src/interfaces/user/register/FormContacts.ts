import { verifyDDD } from "@/utils/phone/ValidDDD"
import { z } from "zod"

interface IFormContactsProps {
    updatePage: (index: number) => void
    setContactsFormValue: (value: IFormContacts[]) => void
    contactsForm: IFormContacts[]
    userContacts?: IFormContacts[]
}

interface IFormContacts {
    contact_owner: string
    ddd: string
    phone: string
    type: string
    saved: boolean
    status?: boolean | string
    id?: string
}

interface IFormContactCardFormProps {
    id?: string
    item: IFormContacts
    index: number
    removeContact: (index: number) => void
    resetContact: (index: number) => void
    saveContact: (index: number, objectData: IFormContacts) => void
    changeContactsStatus?: (index: number) => void
}

export const createFormContactsSchema = z.object({
    contact_owner: z.string().min(1).refine((value) => {
        if (typeof value != "string" || value.trim().length <= 0) {
            return false
        }

        return true
    }),
    ddd: z.string().refine((value) => {
        const isValidDDD = verifyDDD(value)

        return isValidDDD
    }),
    phone: z.string().refine((value) => {
        const phoneLength = value.length == 8 ? true : false
        const phoneLength2 = value.length == 9 ? true : false
        const phoneNumber = Number(value) > 0 ? true : false

        if (phoneLength || phoneLength2) {
            if (phoneNumber) {
                return true
            }
        }

        return false
    }),
    type: z.string().refine((value) => {
        if (value == "Residencial" || value == "Pessoal") {
            return true
        }

        return false
    }),
    status: z.string().or(z.boolean())
})

export type createFormContactsData = z.infer<typeof createFormContactsSchema>

export type { IFormContacts, IFormContactCardFormProps, IFormContactsProps }