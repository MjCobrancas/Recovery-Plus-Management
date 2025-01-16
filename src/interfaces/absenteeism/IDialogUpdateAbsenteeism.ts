import { z } from "zod";
import { IGetOperatorInAbsenteeismById } from "./IGetOperatorInAbsenteeismById";

interface IDialogUpdateAbsenteeismProps {
    user: IGetOperatorInAbsenteeismById | null
    isLoadingDialog: boolean
    closeDialog: () => void
    updateUserAbsenteeismField: (status: boolean) => void
}

export const IDialogUpdateAbsenteeismSchema = z.object({
    Is_On_Company: z.boolean(),
    Is_Justified_Absence: z.boolean(),
    Observation: z.string()
})

export type IDialogUpdateAbsenteeismData = z.infer<typeof IDialogUpdateAbsenteeismSchema>

export type { IDialogUpdateAbsenteeismProps }
