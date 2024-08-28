import { changeStatusOfQuestion } from "@/api/register/questions/changeStatusOfQuestion";
import { ICardMonitoryProps } from "@/interfaces/components/cards/ICardMonitory";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { DialogUpdateQuestion } from "../register/questions/DialogUpdateQuestion";
import { getQuestionById } from "@/api/register/questions/getQuestionById";
import { IResultDefaultResponse } from "@/interfaces/Generics";
import { IGetQuestionById } from "@/interfaces/register/questions/IDialogUpdateQuestion";
import { verifyUserToken } from "@/api/generics/verifyToken";
import { useRouter } from "next/navigation";

export function CardMonitory({ questions }: ICardMonitoryProps) {
    const router = useRouter()

    const [isActive, setIsActive] = useState(true)
    const [isBehavioral, setIsBehavioral] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const [question, setQuestion] = useState<IGetQuestionById | null>(null)
    const dialogRef = useRef<HTMLDialogElement>(null)

    async function changeQuestionStatus(id_question: number) {
        const isValidToken = await verifyUserToken()

        if (!isValidToken) {
            return router.push('/login')
        }

        setDisableButton(true)
        const updateStatusQuestion = await changeStatusOfQuestion(String(id_question))
        setDisableButton(false)

        if (!updateStatusQuestion) {
            toast.error("Erro na atualização do status da pergunta, tente novamente", {
                duration: 5000
            })
        }

        toast.success("Status da pergunta atualizado com sucesso!", {
            duration: 5000
        })
    }

    async function showDialogClick(id_question: number) {
        const questionItem: IResultDefaultResponse<IGetQuestionById | null> = await getQuestionById(String(id_question))

        if (!questionItem.status) {
            return
        }

        setQuestion(questionItem.data)

        dialogRef.current?.showModal()
    }

    function closeDialog() {
        dialogRef.current?.close()
    }

    return (
        <>
            <dialog
                id="dialog2"
                className={`w-[60%] h-fit p-4 rounded-lg dark:bg-zinc-800 max-sm:w-full`}
                ref={dialogRef}
            >
                {question != null && (
                    <DialogUpdateQuestion closeDialog={closeDialog} question={question} />
                )}
            </dialog>
            <div className="flex">
                <label
                    htmlFor="isActive"
                    className="flex gap-2 items-center font-medium my-2 ml-2 cursor-pointer"
                >
                    Ativos
                    <input
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        checked={isActive}
                        className="cursor-pointer"
                        onClick={() => setIsActive((state) => !state)}
                    />
                </label>

                <label
                    htmlFor="isBehavorial"
                    className="flex gap-2 items-center font-medium my-2 ml-2 cursor-pointer"
                >
                    Comportamental
                    <input
                        type="checkbox"
                        id="isBehavorial"
                        checked={isBehavioral}
                        className={`cursor-pointer`}
                        onClick={() => setIsBehavioral((state) => !state)}
                    />
                </label>
            </div>

            {questions.map((item, index) => {

                if (item.Status != isActive || item.Is_Behavioral != isBehavioral) {
                    return
                }

                return (
                    <article
                        key={index}
                        className={`flex justify-between items-center p-2 mx-6 mb-1 rounded odd:bg-slate-200 even:bg-slate-300 dark:odd:bg-zinc-700 dark:even:bg-zinc-800`}
                    >
                        <div className={`flex items-center gap-2`}>
                            <p>{item.Question}</p>

                            {item.count > 0 && (
                                <span
                                    className={`bg-slate-50 px-1 text-gay-500 rounded dark:bg-zinc-900`}
                                >
                                    Mais {item.count}
                                </span>
                            )}
                        </div>

                        <div className={`flex gap-2`}>
                            <div>
                                <button
                                    type="submit"
                                    name="editQuestion"
                                    onClick={() => showDialogClick(item.Id_Question)}
                                    className={`bg-blue-400 dark:bg-blue-500 hover:bg-blue-500 dark:hover:bg-blue-600 hover:text-slate-200 duration-200 py-1 px-2 rounded disabled:bg-slate-300 disabled:border-slate-400 disabled:cursor-not-allowed disabled:text-gray-100 dark:disabled:bg-slate-500 dark:disabled:text-gray-200`}
                                    disabled={disableButton}
                                >
                                    <FontAwesomeIcon icon={faPencil} />
                                </button>
                            </div>

                            <div>
                                <button
                                    type="button"
                                    name="question"
                                    className={`text-white font-bold w-60 py-1 px-2 rounded hover:text-slate-200 duration-200 disabled:bg-slate-300 disabled:border-slate-400 disabled:cursor-not-allowed disabled:text-gray-100 dark:disabled:bg-slate-500 dark:disabled:text-gray-200 ${item.Status
                                        ? `bg-red-400 dark:bg-red-500 hover:bg-red-500 dark:hover:bg-red-600`
                                        : `bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700`
                                        }`}
                                    onClick={() => changeQuestionStatus(item.Id_Question)}
                                    disabled={disableButton}
                                >
                                    {item.Status ? (
                                        "Desativar pergunta"
                                    ) : (
                                        "Ativar pergunta"
                                    )}
                                </button>
                            </div>
                        </div>
                    </article>
                )
            })}
        </>
    )
}
