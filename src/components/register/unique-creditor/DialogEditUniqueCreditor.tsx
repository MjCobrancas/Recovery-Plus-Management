'use client'

import { verifyUserToken } from "@/api/generics/verifyToken";
import { getUniqueCreditorById } from "@/api/register/unique-creditor/getUniqueCreditorById";
import { updateUniqueCreditor } from "@/api/register/unique-creditor/updateUniqueCreditor";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Input } from "@/components/Input";
import { editUniqueCreditorData, editUniqueCreditorSchema, IUniqueCreditorDialog, IUniqueCreditorRequest } from "@/interfaces/register/unique-creditor/IUniqueCreditor";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

export function DialogEditUniqueCreditor({ Id_Unique_Creditor }: IUniqueCreditorDialog) {

    const dialog = useRef<HTMLDialogElement>(null)
    const router = useRouter()

    const [isLoadingData, setIsLoadingData] = useState(false)
    const [result, setResult] = useState(false)
    const [saveForm, setSaveForm] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const [isCreditorActive, setIsCreditorActive] = useState(false)

    const { register, handleSubmit, watch, setValue, formState: { errors }, getValues } = useForm<editUniqueCreditorData>({
        resolver: zodResolver(editUniqueCreditorSchema)
    })

    async function handleRequestEditCreditor() {
        dialog.current?.showModal()

        setIsLoadingData(true)

        const data: IUniqueCreditorRequest[] | false = await getUniqueCreditorById(Id_Unique_Creditor)

        setIsLoadingData(false)

        if (!data) {
            return
        }

        setValue("uniqueCreditor", data[0].Creditor)
        setValue("status", data[0].Status)

        setIsCreditorActive(data[0].Status)
    }

    function handleIsCreditorActive(isCreditorActive: boolean) {
        setIsCreditorActive(!isCreditorActive)
        setValue("status", !isCreditorActive)
    }

    async function handleUpdateCreditor(data: FieldValues) {

        const isValidToken = await verifyUserToken()

        if (!isValidToken) {
            return router.push('/login')
        }

        setDisableButton(true)

        const object = [
            {
                Id_Unique_Creditor: Id_Unique_Creditor,
                Creditor: data.uniqueCreditor,
                Status: data.status
            }
        ]

        const updateCreditor = await updateUniqueCreditor<typeof object>(object)

        setResult(updateCreditor.status)
        setSaveForm(true)

        setTimeout(() => {
            setSaveForm(false)
            setResult(false)
            setDisableButton(false)
        }, 3000)
    }

    return (
        <>
            <Button
                type="button"
                name="editUniqueCreditor"
                value={String()}
                OnClick={() => handleRequestEditCreditor()}
                styles={`bg-blue-400 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-[6px] py-[0.8px] rounded-md hover:bg-blue-500 duration-200 w-[26px] h-[26px]`}
            >
                <FontAwesomeIcon icon={faPencil} fontSize={14} />
            </Button>

            <dialog
                id="editUniqueCreditor"
                className={`w-5/6 max-lg:w-3/4 h-fit p-2 rounded-lg dark:bg-zinc-800 max-sm:w-full`}
                ref={dialog}
            >
                {isLoadingData ? (
                    <p className={`text-left font-bold dark:text-white`}>
                        Carregando...
                    </p>
                ) : (
                    <>
                        <h2
                            className={`text-2xl font-bold text-center text-slate-500 my-2 mb-8 dark:text-slate-100`}
                        >
                            Editar Credor
                        </h2>

                        <form onSubmit={handleSubmit(handleUpdateCreditor)}>
                            <div className={`flex justify-center items-center gap-2`}>
                                <FieldForm
                                    label="idUniqueCreditor"
                                    name="Id:"
                                    obrigatory={false}
                                    styles={`w-fit`}
                                >
                                    <Input
                                        type="text"
                                        id="idUniqueCreditor"
                                        name="idUniqueCreditor"
                                        value={Id_Unique_Creditor}
                                        disabled
                                        styles={``}
                                    />

                                </FieldForm>

                                <FieldForm
                                    label="uniqueCreditor"
                                    name="Editar o credor:"
                                    obrigatory={false}
                                    error={errors.uniqueCreditor && "Inválido"}
                                    styles={`w-fit`}
                                >
                                    <Input
                                        type="text"
                                        id="uniqueCreditor"
                                        name="uniqueCreditor"
                                        placeholder="Digite o nome do credor"
                                        maxlength={150}
                                        onForm={true}
                                        value={watch("uniqueCreditor")}
                                        register={register}
                                        required
                                        styles={`${errors.uniqueCreditor ? "border-[--label-color-error] dark:border-[--label-color-error]" : ""}`}
                                    />
                                </FieldForm>

                                {getValues("status") ? (
                                    <button
                                        type="button"
                                        className="w-[200px] bg-red-400 text-white font-bold px-2 py-2 mt-7 rounded-md hover:bg-red-500 duration-300"
                                        onClick={() => handleIsCreditorActive(isCreditorActive)}
                                    >
                                        Desativar credor
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="w-[200px] bg-green-400 text-white font-bold px-2 py-2 mt-7 rounded-md hover:bg-green-500 duration-300"
                                        onClick={() => handleIsCreditorActive(isCreditorActive)}
                                    >
                                        Ativar credor
                                    </button>
                                )}
                            </div>

                            <div className={`flex items-end justify-end gap-2 mt-[3rem]`}>
                                <div className={`flex justify-between items-center mr-2 gap-2`}>
                                    {saveForm &&
                                        <p className={result == true ? `font-bold text-green-500` : `font-bold text-red-500`}>{result == true ? "Dados atualizados com sucesso!" : "Erro ao atualizar os dados"}</p>
                                    }

                                    <Button
                                        type="reset"
                                        text="Fechar"
                                        styles={`w-fit text-md h-12 border-red-400 bg-red-400 text-white focus:bg-red-400 hover:bg-red-500 rounded-md `}
                                        OnClick={() => dialog.current?.close()}
                                    />

                                    <Button
                                        type="submit"
                                        text="Salvar Alterações"
                                        styles={`w-fit text-md h-12`}
                                        disabled={disableButton}
                                    />
                                </div>
                            </div>
                        </form>
                    </>
                )}
            </dialog>
        </>
    )
}