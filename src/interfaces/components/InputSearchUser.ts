import { ChangeEvent } from "react"
import { FieldValue, UseFormRegister } from "react-hook-form"

interface IInputSearchUser {
    id: string
    name: string
    title: string
    placeholder: string
    maxlength?: number | undefined
    searchUser?: string
    styles: string
    onForm: boolean
    value: string
    register?: UseFormRegister<FieldValue<any>>
    onChangeFunction?: (event: ChangeEvent<HTMLInputElement>) => void
}

export type { IInputSearchUser }
