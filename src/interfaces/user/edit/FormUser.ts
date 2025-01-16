import { validDate } from "@/utils/ValidDate";
import { z } from "zod";

export const CreateUserFormSchemaEdit = z.object({
    name: z.string().min(1).max(50),
    lastName: z.string().min(1).max(120),
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
    id_credor: z.string().min(1),
    id_turn: z.string().min(1).refine((value) => {
        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) <= 0) {
            return false
        }

        return true
    }),
    contract: z.string().refine((value) => {
        const regexContract = /\d{4}-\d{2}-\d{2}/g

        return regexContract.test(value)
    }),
    salary: z.string().min(1),
    payment_method: z.string(),
    is_responsable: z.string().refine((value) => {
        if (String(value) != "1" && String(value) != "0") {
            return false
        }

        return true
    }),
    id_responsable: z.string().refine((value) => {
        if (String(value) == "disabled") {
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
    bonus: z.string().min(1),
    registration: z.string().min(1),
    is_responsable_technical: z.string().refine((value) => {
        if (String(value) != "1" && String(value) != "0") {
            return false
        }

        return true
    }),
    id_responsable_technical: z.string().refine((value) => {
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
    userName: z.string()
})

export type CreateUserFormDataEdit = z.infer<typeof CreateUserFormSchemaEdit>
