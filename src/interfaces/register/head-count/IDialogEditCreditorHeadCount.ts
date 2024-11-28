import { z } from "zod";
import { IGetCreditorsOperators } from "./IGetCreditorOperators";

interface IDialogEditCreditorHeadCountProps {
    creditor: IGetCreditorsOperators
}

interface IDialogEditCreditorHeadCountFormData {
    capacity: string
}

export const IDialogEditCreditorHeadCountSchema = z.object({
    capacity: z.string().min(1).refine((value) => {
        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) <= 0) {
            return false
        }

        return true
    })
})

export type { IDialogEditCreditorHeadCountFormData, IDialogEditCreditorHeadCountProps };

