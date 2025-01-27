import { validDate } from "@/utils/ValidDate";
import { ValidateCpf } from "@/utils/ValidateCpf";
import { z } from "zod";

export const CreateUserFormSchema = z.object({
    name: z.string().min(1).max(50),
    lastName: z.string().min(1).max(120),
    password: z.string().min(1),
    mother: z.string(),
    father: z.string(),
    birthDate: z.string().refine((value) => {
        const verifyBirthDate = validDate(value, true)

        return verifyBirthDate
    }),
    admission: z.string().refine((value) => {
        const verifyAdmission = validDate(value)

        return verifyAdmission
    }),
    cpf: z.string().min(1).refine(async (value) => {
        const regexCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/g
        const regexCNPJ = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/g

        const isCPF = regexCPF.test(value)

        if (isCPF) {
            const isValidateCpf = ValidateCpf(value.replace('.', '').replace('.', '').replace('-', '').replace('/', '').toString())

            return isValidateCpf
        }

        const isCNPJ = regexCNPJ.test(value)

        return isCPF || isCNPJ
    }),
    dismissal: z.string(),
    position: z.string().min(1).max(50),
    permission: z.string().refine((value) => {
        if (Number(value) >= 1 && Number(value) <= 6) {
            return true
        }
    }),
    maritalStatus: z.string().refine((value) => {
        if (Number(value) >= 1 && Number(value) <= 5) {
            return true
        }
    }),
    educationStatus: z.string().refine((value) => {
        if (Number(value) >= 1 && Number(value) <= 9) {
            return true
        }
    }),
    id_turn: z.string().min(1).refine((value) => {
        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) <= 0) {
            return false
        }

        return true
    }),
    salary: z.string().min(1).refine((value) => {
        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) <= 0) {
            return false
        }

        return true
    }),
    bonus: z.string().min(1).refine((value) => {
        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) <= 0) {
            return false
        }

        return true
    }),
    payment_method: z.string(),
    contract: z.string().min(1).refine((value) => {
        const regexContract = /\d{4}-\d{2}-\d{2}/g
        
        if (!regexContract.test(value)) {
            return false
        }

        return true
    }),
    id_responsable: z.string().min(1).refine((value) => {
        if (String(value == "disabled")) {
            return true
        }

        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) <= 0) {
            return false
        }

        return true
    }),
    is_responsable: z.string().min(1).refine((value) => {
        if (String(Number(value)) == "NaN") {
            return false
        }

        if (String(value) != "0" && String(value) != "1") {
            return false
        }

        return true
    }),
    id_responsable_technical: z.string().min(1).refine((value) => {
        if (value == "disabled") {
             return true
        }

        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) < 0) {
            return false
        }

        return true
    }),
    is_responsable_technical: z.string().min(1).refine((value) => {
        if (String(Number(value)) == "NaN") {
            return false
        }

        if (String(value) != "0" && String(value) != "1") {
            return false
        }

        return true
    }),
    id_credor: z.string(),
    registration: z.string().min(1),
    userName: z.string()
})

export type CreateUserFormData = z.infer<typeof CreateUserFormSchema>
