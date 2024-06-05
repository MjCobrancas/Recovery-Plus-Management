import { changeStatusOfSubQuestion } from "@/api/register/questions/changeStatusOfSubQuestion";
import { updateQuestion } from "@/api/register/questions/updateQuestion";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { IDialogUpdateForm, IDialogUpdateQuestion, IDialogUpdateQuestionSchedule, ISubQuestionsForm } from "@/interfaces/register/questions/IDialogUpdateQuestion";
import { faThumbsDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function DialogUpdateQuestion({ question, closeDialog }: IDialogUpdateQuestion) {

    const [disableButton, setDisableButton] = useState(false)

    const { control, register, handleSubmit, watch, formState: { errors }, reset, setValue } = useForm<IDialogUpdateForm>({
        defaultValues: useMemo(() => {
            return {
                question: question.Question,
                type: String(question.Type),
                subquestions: question.MonitoringSubquestions.length > 0 ? question.MonitoringSubquestions.map((item) => {
                    return {
                        question: item.Subquestion,
                        id_question: item.Id_Question,
                        id_subquestion: item.Id_Subquestions,
                        status: item.Status,
                        new: false
                    }
                }) : []
            }
        }, [question]),
        resolver: zodResolver(IDialogUpdateQuestionSchedule)
    })

    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "subquestions"
    })

    useEffect(() => {
        setValue("question", question.Question)
        setValue("type", String(question.Type))
        setValue("subquestions", question.MonitoringSubquestions.length > 0 ? question.MonitoringSubquestions.map((item) => {
            return {
                question: item.Subquestion,
                id_question: item.Id_Question,
                id_subquestion: item.Id_Subquestions,
                status: item.Status,
                new: false
            }
        }) : [])
    }, [question, setValue]);

    function addSubQuestion() {
        append({
            question: "",
            status: true,
            id_question: question.Id_Question,
            id_subquestion: 0,
            new: true
        })
    }

    function removeSubQuestion(index: number) {
        remove(index)
    }

    async function updateQuestionForm(data: FieldValues) {
        setDisableButton(true)

        const object = {
            idQuestion: question.Id_Question,
            question: data.question,
            is_Behavioral: question.Is_Behavioral,
            type: Number(data.type),
            subquestions: data.type == "4" ? [] : data.subquestions.map((item: ISubQuestionsForm) => {
                return {
                    question: item.question,
                    idSubquestion: item.id_subquestion
                }
            })
        }

        const updateQuestionStatus = await updateQuestion<typeof object>(object)

        setDisableButton(false)

        if (!updateQuestionStatus) {
            toast.error("Houve um erro na atualização da pergunta, revise os valores e tente novamente!", {
                duration: 5000
            })

            return
        }

        toast.success("Pergunta atualizada com sucesso!", {
            duration: 5000
        })

        closeDialog()
    }

    async function changeSubQuestionStatus(id_subquestion: number, index: number, status: boolean) {
        const changeStatusSubquestion = await changeStatusOfSubQuestion(String(id_subquestion))

        if (!changeStatusSubquestion) {
            return
        }

        const object = fields[index]
        object.status = !object.status

        update(index, object)
    }

    function handleCloseDialog() {
        reset()
        closeDialog()
    }

    return (
        <form onSubmit={handleSubmit(updateQuestionForm)}>
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
                    maxlength={255}
                    styles={`${errors.question
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
                    {String(question.Type) == "4" ? (
                        <Option value="4" firstValue="Comportamental" selectedValue={String(question.Type)} />
                    ) : (
                        <>
                            <Option value="1" firstValue="Abertura" selectedValue={String(question.Type)} />
                            <Option value="2" firstValue="Negociação" selectedValue={String(question.Type)} />
                            <Option value="3" firstValue="Finalização" selectedValue={String(question.Type)} />
                        </>
                    )}

                </SelectField>
            </article>


            {fields.length > 0 && (
                <article className={`flex flex-col justify-center gap-1 my-2`}>
                    <p className="font-semibold text-lg dark:text-slate-100 mt-2">
                        Sub Perguntas
                    </p>

                    {fields.length > 0 && fields.map((item, index) => {
                        return (
                            <div
                                key={item.id}
                                className={`flex items-center justify-center last:mb-2
                                        ${item.status == false
                                        ? `bg-red-300 w-full p-1 rounded-md`
                                        : ""
                                    }
                                    `}
                            >
                                <Input
                                    id="question"
                                    name={`subquestions.${index}.question`}
                                    value={watch(`subquestions.${index}.question`)}
                                    type="text"
                                    placeholder="Nome da sub Pergunta"
                                    styles={`${errors.subquestions && errors.subquestions[index]?.question
                                        ? `border-[--label-color-error] dark:border-[--label-color-error] focus:border-[--focus-input-login]`
                                        : ""
                                        }`}
                                    onForm={true}
                                    register={register}
                                />

                                {!item.new ? (
                                    <button
                                        name="subQuestionId"
                                        type="button"
                                        className={`ml-2 bg-red-400 h-full px-2 py-1 rounded hover:text-slate-200 dark:hover:bg-red-500 dark:text-white duration-200`}
                                        onClick={() => changeSubQuestionStatus(item.id_subquestion, index, item.status)}
                                    >
                                        <FontAwesomeIcon icon={faThumbsDown} />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className={`ml-3 py-1 px-2 rounded hover:text-slate-500 dark:hover:text-slate-400 dark:text-white duration-200`}
                                        onClick={() => removeSubQuestion(index)}
                                    >
                                        <FontAwesomeIcon icon={faXmark} />
                                    </button>
                                )}
                            </div>
                        )
                    })}
                </article>
            )}

            <div className={`flex items-end justify-end gap-2`}>
                <Button
                    type="submit"
                    text="Salvar alterações"
                    disabled={disableButton}
                    styles={`w-48 text-md h-12`}
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