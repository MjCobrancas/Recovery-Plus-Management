import { ICreditors } from "@/interfaces/generics/Creditors";
import { CreateUserFormData } from "./FormUser";
import { IUserProps } from "../User";
import { IFormAdresses } from "./FormAdresses";
import { IFormContacts } from "./FormContacts";
import { IFormEmail } from "./FormEmail";

interface IContainerRegisterProps {
    creditors: ICreditors[]
    userRoles: IUserRoles[]
    userEducation: IUserEducation[]
    BACKEND_DOMAIN: string
    userMaritalStatus: IUserMaritalStatus[]
    user?: IUserProps
    userAdressesFormat?: IFormAdresses[]
    userContactsFormat?: IFormContacts[]
    userEmailsFormat?: IFormEmail[]
    idUser?: string
}

interface IUserRoles {
    Id_Permissions: number
    Permission: string
}

interface IUserEducation {
    Id_Education: number
    Education_Status: string
}

interface IUserMaritalStatus {
    Id_Marital: number
    Marital_Status: string
}

interface IFormUser extends IContainerRegisterProps {
    updatePage: (value: number) => void
    setUserFormValue: Function
    userForm: CreateUserFormData | null
    changeUserStatus?: (status: boolean) => void
    userStatus?: boolean
    avatar: string | ArrayBuffer
    setAvatar: (value: string) => void
    setPicture: (value: string | File) => void
}

export type { IContainerRegisterProps, IFormUser, IUserRoles, IUserEducation, IUserMaritalStatus }