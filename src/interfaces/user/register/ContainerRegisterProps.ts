import { ICreditors } from "@/interfaces/generics/Creditors";
import { CreateUserFormData } from "./FormUser";

interface IContainerRegisterProps {
    creditors: ICreditors[]
}

interface IFormUser extends IContainerRegisterProps {
    updatePage: (value: number) => void
    setUserFormValue: Function
    userForm: CreateUserFormData | null
}

export type { IContainerRegisterProps, IFormUser }