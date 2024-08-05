import { ICreditorGetAllCreditors } from "@/interfaces/generics/GetAllCreditors";
import { IGetUserInfo } from "./IGetUserInfo";
import { z } from "zod";
import { IUserRoles } from "../register/ContainerRegisterProps";

interface IContainerQuickEdit {
    creditors: ICreditorGetAllCreditors[]
    userInfo: IGetUserInfo
    userRoles: IUserRoles[]
}

interface IContainerQuickEditForm {
    name: string
    lastName: string
    userName: string
    operatorStatus: string
    creditor: string
    profession: string
}

export const IContainerQuickEditFormSchema = z.object({
    name: z.string().min(1),
    lastName: z.string().min(1),
    userName: z.string().min(1),
    operatorStatus: z.string().min(1).refine((value) => {
        if (value != "0" && value != "1") {
            return false
        }

        return true
    }),
    creditor: z.string().min(1).refine((value) => {
        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) <= 0) {
            return false
        }

        return true
    }),
    profession: z.string().min(1).refine((value) => {
        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) <= 0) {
            return false
        }

        return true
    })
})

export type { IContainerQuickEdit, IContainerQuickEditForm }