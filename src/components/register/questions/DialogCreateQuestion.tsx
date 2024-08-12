import { verifyUserToken } from "@/api/generics/verifyToken";
import { createNewQuestion } from "@/api/register/questions/createQuestion";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { IDialogCreateForm, IDialogCreateQuestionProps, IDialogCreateQuestionSchedule } from "@/interfaces/register/questions/IDialogCreateQuestion";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function DialogCreateQuestion({ closeDialog }: IDialogCreateQuestionProps) {
    const router = useRouter()

    const [openSubQuestions, setOpenSubQuestions] = useState(false)
    const [disableButton, setDisableButton] = useState(false)

    const { control, register, handleSubmit, watch, formState: { errors }, reset } = useForm<IDialogCreateForm>({
        defaultValues: {
            question: "",
            type: "1",
            subquestions: []
        },
        resolver: zodResolver(IDialogCreateQuestionSchedule)
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: "subquestions"
    })

    function addSubQuestion() {
        setOpenSubQuestions(true)

        append({
            question: ""
        })
    }

    function removeSubQuestion(index: number) {
        remove(index)
    }

    async function createQuestion(data: FieldValues) {

        const isValidToken = await verifyUserToken()

        if (!isValidToken) {
            return router.push('/login')
        }

        setDisableButton(true)

        const object = {
            question: data.question,
            is_Behavioral: data.type == "4" ? true : false,
            type: data.type,
            subquestions: data.type == "4" ? [] : data.subquestions
        }

        const createQuestion = await createNewQuestion<typeof object>(object)

        setDisableButton(false)

        if (!createQuestion.status) {
            toast.error("Houve um erro na criação de uma nova pergunta, revise os valores e tente novamente!", {
                duration: 5000
            })
            
            return
        }

        toast.success("Pergunta criada com sucesso!", {
            duration: 5000
        })

        reset()
    }

    function handleCloseDialog() {
        reset()
        closeDialog()
    }

    return (
        <form onSubmit={handleSubmit(createQuestion)}>
            <p className="font-semibold text-xl dark:text-slate-100">Perguntas</p>

            <button
                type="button"
                className={`text-blue-800 mb-2 dark:text-blue-500`}
                onClick={() => addSubQuestion()}
            >
                + Adicionar subperguntas
            </button>

            <article className={`flex items-center justify-center gap-2 mb-2`}>
                <Input
                    id="question"
                    name="question"
                    type="text"
                    value={watch("question")}
                    placeholder="Nome da Pergunta"
                    required
                    maxlength={255}
                    styles={`${
                            errors.question 
                            ? `border-[--label-color-error] dark:border-[--label-color-error] focus:border-[--focus-input-login]`
                            : ""
                        }`}
                    onForm={true}
                    register={register}
                />

                <SelectField
                    name="type"
                    id="type"
                    value={watch("type")}
                    styles={`
                        h-full pt-2
                        ${errors.type
                            ? "border-[--label-color-error] dark:border-[--label-color-error]"
                            : ""
                        }`}
                    required
                    onForm={true}
                    register={register}
                >
                    <Option value="1" firstValue="Abertura" />
                    <Option value="2" firstValue="Negociação" />
                    <Option value="3" firstValue="Finalização" />
                    <Option value="4" firstValue="Comportamental" />
                </SelectField>
            </article>


            {openSubQuestions && fields.length > 0 && (
                <article className={`flex flex-col justify-center gap-1 my-2`}>
                    <p className="font-semibold text-lg dark:text-slate-100 mt-2">
                        Sub Perguntas
                    </p>

                    {fields.length > 0 && fields.map((item, index) => {
                        return (
                            <div key={item.id} className="flex">
                                <Input
                                    id="question"
                                    name={`subquestions.${index}.question`}
                                    value={watch(`subquestions.${index}.question`)}
                                    type="text"
                                    placeholder="Nome da sub Pergunta"
                                    required
                                    styles={`${errors.subquestions && errors.subquestions[index]?.question
                                            ? `border-[--label-color-error] dark:border-[--label-color-error] focus:border-[--focus-input-login]`
                                            : ""
                                        }`}
                                    onForm={true}
                                    register={register}
                                />

                                <button
                                    type="button"
                                    className={` py-1 px-2 rounded hover:text-slate-500 dark:hover:text-slate-400 dark:text-white duration-200`}
                                    onClick={() => removeSubQuestion(index)}
                                >
                                    <FontAwesomeIcon icon={faXmark} />
                                </button>
                            </div>
                        )
                    })}
                </article>
            )}

            <div className={`flex items-end justify-end gap-2`}>
                <Button
                    type="submit"
                    text="Adicionar"
                    disabled={disableButton}
                    styles={`w-32 text-md h-12`}
                />
                <Button
                    type="reset"
                    text="Fechar"
                    styles={`w-fit text-md h-12 border-red-400 bg-red-400 text-white focus:bg-red-400 hover:bg-red-500 rounded-md `}
                    OnClick={() => handleCloseDialog()}
                    disabled={disableButton}
                />
            </div>
        </form>
    )
}