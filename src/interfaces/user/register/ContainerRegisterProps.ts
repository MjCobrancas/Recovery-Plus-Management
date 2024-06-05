import { ICreditors } from "@/interfaces/generics/Creditors";
import { CreateUserFormData } from "./FormUser";
import { IUserProps } from "../User";
import { IFormAdresses } from "./FormAdresses";
import { IFormContacts } from "./FormContacts";
import { IFormEmail } from "./FormEmail";

interface IContainerRegisterProps {
    creditors: ICreditors[]
    user?: IUserProps
    userAdressesFormat?: IFormAdresses[]
    userContactsFormat?: IFormContacts[]
    userEmailsFormat?: IFormEmail[]
    idUser?: string
}

interface IFormUser extends IContainerRegisterProps {
    updatePage: (value: number) => void
    setUserFormValue: Function
    userForm: CreateUserFormData | null
    changeUserStatus?: (status: boolean) => void
    userStatus?: boolean
}

export type { IContainerRegisterProps, IFormUser }