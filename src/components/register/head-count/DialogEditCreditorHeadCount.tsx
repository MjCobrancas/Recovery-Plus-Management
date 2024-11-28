'use client'

import { updateCreditorCapacity } from "@/api/register/creditor/updateCreditorCapacity";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Input } from "@/components/Input";
import { IDialogEditCreditorHeadCountFormData, IDialogEditCreditorHeadCountProps, IDialogEditCreditorHeadCountSchema } from "@/interfaces/register/head-count/IDialogEditCreditorHeadCount";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from 'classnames';
import { useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

export function DialogEditCreditorHeadCount({ creditor }: IDialogEditCreditorHeadCountProps) {

    const dialogRef = useRef<HTMLDialogElement>(null)
    const [disableAllButtons, setDisableAllButtons] = useState(false)

    function openDialog() {
        dialogRef.current?.showModal()
    }

    function closeDialog() {
        dialogRef.current?.close()
    }

    const { register, handleSubmit, watch, formState: { errors } } = useForm<IDialogEditCreditorHeadCountFormData>({
        defaultValues: {
            capacity: String(creditor.Capacity)
        },
        resolver: zodResolver(IDialogEditCreditorHeadCountSchema)
    })

    async function updateCapacity(data: FieldValues) {

        setDisableAllButtons(true)

        const responseStatus = await updateCreditorCapacity(creditor.Id_Creditor, Number(data.capacity))

        setDisableAllButtons(false)

        if (!responseStatus) {
            toast.error("Houve um erro ao atualizar a capacidade da Equipe, revise os valores e tente novamente!", {
                duration: 7000
            })

            return
        }

        toast.success("Capacidade da Equipe atualizada com sucesso!", {
            duration: 7000
        })

        closeDialog()
    }

    return (
        <>
            <button
                type="button"
                className="py-1 px-2 bg-blue-400 text-white rounded-md hover:bg-blue-500 duration-300"
                onClick={() => openDialog()}
            >
                <FontAwesomeIcon icon={faPencil} />
            </button>

            <dialog
                ref={dialogRef}
                className="w-[50%] h-fit p-4 rounded-lg dark:bg-zinc-800 max-sm:w-full"
            >
                <h2 className="text-xl text-center font-semibold dark:text-white">Editar capacidade da equipe {creditor.Creditor}</h2>

                <form
                    className="mt-5"
                    onSubmit={handleSubmit(updateCapacity)}
                >
                    <FieldForm
                        name="Capacidade"
                        error={errors.capacity && "Inválido"}
                    >
                        <Input
                            id="capacity"
                            name="capacity"
                            type="number"
                            styles={classNames("mb-5", {
                                "border-red-500": errors.capacity
                            })}
                            onForm={true}
                            register={register}
                            value={watch("capacity")}
                            disabled={disableAllButtons}
                        />
                    </FieldForm>

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
