import { z } from "zod"

interface IGetQuestionById {
    Id_Question: number
    Is_Behavioral: boolean
    Question: string
    Status: boolean
    Type: number
    Is_Critical_Question: boolean
    MonitoringSubquestions: ISubQuestions[]
}

interface ISubQuestions {
    Id_Question: number
    Id_Subquestions: number
    Status: boolean
    Subquestion: string
}

interface IDialogUpdateQuestion {
    question: IGetQuestionById
    closeDialog: Function
}

interface IDialogUpdateForm {
    question: string
    type: string
    subquestions: ISubQuestionsForm[]
}

interface ISubQuestionsForm {
    question: string
    id_question: number
    status: boolean
    id_subquestion: number
    new: boolean
}

export const IDialogUpdateQuestionSchedule = z.object({
    question: z.string().min(1),
    type: z.string().min(1).refine((value) => {
        if (Number(value) <= 0) {
            return false
        }

        return true
    }),
    subquestions: z.array(
        z.object({
            question: z.string().min(1),
            id_question: z.number().min(1),
            status: z.boolean(),
            id_subquestion: z.number().min(0),
            new: z.boolean()
        })
    )
})

export type { IGetQuestionById, IDialogUpdateQuestion, IDialogUpdateForm, ISubQuestionsForm }