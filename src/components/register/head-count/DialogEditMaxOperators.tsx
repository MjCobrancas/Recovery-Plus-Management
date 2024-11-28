'use client'

import { updateMaxOperators } from "@/api/register/creditor/updateMaxOperators";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Input } from "@/components/Input";
import { IDialogEditMaxOperatorsData, IDialogEditMaxOperatorsProps, IDialogEditMaxOperatorsSchema } from "@/interfaces/register/head-count/IDialogEditMaxOperators";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

export function DialogEditMaxOperators({ operatorsCount }: IDialogEditMaxOperatorsProps) {

    const [disableAllButtons, setDisableAllButtons] = useState(false)

    const { register, handleSubmit, watch, formState: { errors } } = useForm<IDialogEditMaxOperatorsData>({
        defaultValues: {
            max_operators_morning: String(operatorsCount.Max_Operators_Morning),
            max_operators_afternoon: String(operatorsCount.Max_Operators_Afternoon)
        },
        resolver: zodResolver(IDialogEditMaxOperatorsSchema)
    })

    const dialogRef = useRef<HTMLDialogElement>(null)

    function openDialog() {

        if (operatorsCount.Id_Head_Count == 0) {
            toast.error("Houve um erro ao buscar os dados dos operadores, tente novamente mais tarde", {
                duration: 7000
            })

            return
        }

        dialogRef.current?.showModal()
    }

    function closeDialog() {
        dialogRef.current?.close()
    }

    async function handleUpdateMaxOperators(data: FieldValues) {
        setDisableAllButtons(true)

        const responseStatus = await updateMaxOperators(operatorsCount.Id_Head_Count, Number(data.max_operators_morning), Number(data.max_operators_afternoon))

        setDisableAllButtons(false)

        if (!responseStatus) {

            toast.error("Houve um erro ao atualizar a quantidade máxima de operadores, revise os valores e tente novamente!", {
                duration: 7000
            })
            
            return
        }

        toast.success("Quantidade máxima de operadores por turno atualizada com sucesso!", {
            duration: 7000
        })

        closeDialog()
    }

    return (
        <>
            <button
                type="button"
                className="absolute bottom-4 right-1 py-1 px-2 bg-blue-400 text-white rounded-md hover:bg-blue-500 duration-300"
                onClick={() => openDialog()}
            >
                <FontAwesomeIcon icon={faPencil} />
            </button>
            <dialog
                ref={dialogRef}
                className="w-3/4 h-fit p-4 rounded-lg dark:bg-zinc-800 max-sm:w-full"
            >
                <h2 className="text-center text-xl font-semibold dark:text-white">Editar quantidade máxima dos operadores por turno</h2>

                <form 
                    className="mt-10"
                    onSubmit={handleSubmit(handleUpdateMaxOperators)}
                >
                    <div className="flex justify-center items-center gap-1 mb-16">
                        <FieldForm 
                            name="Operadores no turno da manhã"
                            error={errors.max_operators_morning && "Inválido"}
                        >
                            <Input 
                                id="max_operators_morning"
                                name="max_operators_morning"
                                type="number"
                                onForm={true}
                                register={register}
                                value={watch("max_operators_morning")}
                                styles={classNames("", {
                                    "border-red-500": errors.max_operators_morning
                                })}
                                disabled={disableAllButtons}
                            />
                        </FieldForm>

                        <FieldForm
                            name="Operadores no turno da tarde"
                            error={errors.max_operators_afternoon && "Inválido"}
                        >
                            <Input 
                                id="max_operators_afternoon"
                                name="max_operators_afternoon"
                                type="number"
                                onForm={true}
                                register={register}
                                value={watch("max_operators_afternoon")}
                                styles={classNames("", {
                                    "border-red-500": errors.max_operators_afternoon
                                })}
                                disabled={disableAllButtons}
                            />
                        </FieldForm>
                    </div>

                    <Button
                        styles="w-fit px-6 py-2 float-right"
                        text="Salvar"
                        disabled={disableAllButtons}
                    />

                    <Button
                        type="button"
                        styles="w-fit px-6 py-2 float-right text-red-400 border-red-400 hover:bg-red-400 focus:bg-red-400 hover:text-white mr-1"
                        text="Fechar"
                        OnClick={closeDialog}
                        disabled={disableAllButtons}
                    />

                </form>

                <Toaster
                    position="bottom-right"
                    reverseOrder={false}
                />
            </dialog>
        </>
    )
}