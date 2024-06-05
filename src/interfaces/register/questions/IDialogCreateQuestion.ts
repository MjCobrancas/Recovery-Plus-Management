import { z } from "zod"

interface IDialogCreateQuestionProps  {
    closeDialog: Function
}

interface IDialogCreateForm {
    question: string
    type: string
    subquestions: ISubQuestionsForm[]
}

interface ISubQuestionsForm {
    question: string
}

export const IDialogCreateQuestionSchedule = z.object({
    question: z.string().min(1),
    type: z.string().min(1).refine((value) => {
        if (Number(value) <= 0) {
            return false
        }

        return true
    }),
    subquestions: z.array(
        z.object({
            question: z.string().min(1)
        })
    )
})

export type { IDialogCreateQuestionProps, IDialogCreateForm }