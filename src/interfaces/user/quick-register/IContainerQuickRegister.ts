import { ICreditorGetAllCreditors } from "@/interfaces/generics/GetAllCreditors";
import { ValidateCpf } from "@/utils/ValidateCpf";
import { z } from "zod";

interface IContainerQuickRegisterProps {
    creditors: ICreditorGetAllCreditors[]
}

interface IContainerQuickRegisterForm {
    name: string
    lastName: string
    userName: string
    cpf: string
    creditor: string
}

export const IContainerQuickRegisterFormSchema = z.object({
    name: z.string().min(1),
    lastName: z.string().min(1),
    userName: z.string().min(1),
    cpf: z.string().min(14).refine((value) => {
        const regexCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/g

        const isValidateCpf = ValidateCpf(value.replace('.', '').replace('.', '').replace('-', '')
        .replace('/', '').toString())

        if (!isValidateCpf || !regexCPF.test(value)) {
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
    })
})

export type { IContainerQuickRegisterProps, IContainerQuickRegisterForm }