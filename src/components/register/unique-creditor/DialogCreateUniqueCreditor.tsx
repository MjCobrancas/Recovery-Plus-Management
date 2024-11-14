'use client'

import { verifyUserToken } from "@/api/generics/verifyToken"
import { createUniqueCreditor } from "@/api/register/unique-creditor/createUniqueCreditor"
import { Button } from "@/components/Button"
import { FieldForm } from "@/components/FieldForm"
import { Input } from "@/components/Input"
import { createUniqueCreditorData, createUniqueCreditorSchema } from "@/interfaces/register/unique-creditor/IUniqueCreditor"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import { FieldValues, useForm } from "react-hook-form"

export function DialogCreateUniqueCreditor() {
    const router = useRouter()

    const dialog = useRef<HTMLDialogElement>(null)

    const [result, setResult] = useState(false)
    const [saveForm, setSaveForm] = useState(false)
    const [disableButton, setDisableButton] = useState(false)

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<createUniqueCreditorData>({
        resolver: zodResolver(createUniqueCreditorSchema)
    })

    async function handleCreateUniqueCreditor(data: FieldValues) {

        const isValidToken = await verifyUserToken()

        if (!isValidToken) {
            return router.push('/login')
        }

        setDisableButton(true)

        const object = {
            unique_creditor: data.uniqueCreditor,
            status: true
        }

        const response = await createUniqueCreditor<typeof object>(object)

        setResult(response.status)
        setSaveForm(true)

        setTimeout(() => {
            setSaveForm(false)
            setResult(false)
            setDisableButton(false)
        }, 3000)
    }

    return (
        <>
            <dialog
                id="createUniqueCreditorModal"
                className={`w-2/4 max-lg:w-3/4 p-2 rounded-lg dark:bg-zinc-800 max-sm:w-full`}
                ref={dialog}
            >
                <h2
                    className={`text-2xl font-bold text-center text-slate-500 my-2 mb-8 dark:text-slate-100`}
                >
                    Crie o Credor
                </h2>

                <form
                    onSubmit={handleSubmit(handleCreateUniqueCreditor)}
                >
                    <div className={`flex justify-center items-center`}>
                        <div className={`flex justify-center items-center w-fit`}>
                            <FieldForm
                                label="uniqueCreditor"
                                name="Nome do credor"
                                error={errors.uniqueCreditor && "Inválido"}
                                styles={`w-fit`}
                            >
                                <Input
                                    type="text"
                                    id="uniqueCreditor"
                                    name="uniqueCreditor"
                                    placeholder="Digite o nome do credor"
                                    maxlength={150}
                                    required
                                    onForm={true}
                                    value={watch("uniqueCreditor")}
                                    register={register}
                                    styles={`${errors.uniqueCreditor ? "border-[--label-color-error] dark:border-[--label-color-error]" : ""}`}
                                />
                            </FieldForm>
                        </div>
                    </div>

                    <div className={`flex justify-end gap-2 mt-10`}>
                        <div className={`flex justify-between items-center mr-2 gap-2`}>
                            {saveForm &&
                                <p className={result == true ? `font-bold text-green-500` : `font-bold text-red-500`}>{result == true ? "Dados cadastrados!" : "Erro ao cadastrar os dados"}</p>
                            }

                            <Button
                                type="button"
                                text="Fechar"
                                styles={`w-fit h-10 border-red-400 bg-red-400 text-white hover:bg-red-500 focus:bg-red-400 text-md px-2 py-2 hover:border-red-500`}
                                OnClick={() => { reset(); dialog.current?.close() }}
                            />

                            <Button
                                name="answers"
                                type="submit"
                                text="Cadastrar"
                                styles={`w-fit h-10 text-md dark:bg-blue-500 dark:text-white dark:hover:bg-blue-600 dark:hover:border-blue-600`}
                                disabled={disableButton}
                            />
                        </div>
                    </div>
                </form>
            </dialog>

            <Button
                text="Criar credor"
                type="button"
                styles={`w-fit text-md p-2 ml-2 border border-green-500 rounded-md bg-transparent duration-200 text-green-500 hover:bg-green-500 dark:bg-transparent dark:hover:bg-green-500 focus:bg-transparent focus:text-white-500`}
                OnClick={() => dialog.current?.showModal()}
            />
        </>
    )
}