import { IDialogUpdateCreditorResponsableData, IDialogUpdateCreditorResponsableProps, IDialogUpdateCreditorResponsableSchema } from "@/interfaces/register/creditors-responsables/IDialogUpdateCreditorResponsable";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import { Button } from "../Button";
import { CheckBoxButton } from "../CheckBoxButton";
import { updateCreditorResponsable } from "@/api/register/creditor-responsable/updateCreditorResponsable";
import toast, { Toaster } from "react-hot-toast";

export function DialogUpdateCreditorResponsable({ id_unique_creditor, creditor, responsablesList, dialogRef }: IDialogUpdateCreditorResponsableProps) {

    const [disableButtons, setDisableButtons] = useState(false)

    const { control, handleSubmit, setValue } = useForm<IDialogUpdateCreditorResponsableData>({
        defaultValues: {
            responsables: responsablesList
        },
        resolver: zodResolver(IDialogUpdateCreditorResponsableSchema)
    })

    const { fields, update } = useFieldArray({
        control,
        name: "responsables"
    })

    useEffect(() => {
        setValue("responsables", responsablesList)
    }, [setValue, responsablesList])

    function handleChangeStatus(status: boolean, index: number) {
        const object = fields[index]
        object.status = !status
        update(index, object)
    }

    async function handleUpdateCreditorResponsable(data: FieldValues) {
        setDisableButtons(true)
        const responsablesList: { id_user: number, status: boolean }[] = []

        for (let i = 0; i < data.responsables.length; i++) {
            const responsable = data.responsables[i]

            responsablesList.push({
                id_user: Number(responsable.id_user),
                status: responsable.status
            })
        }

        const { status } = await updateCreditorResponsable(id_unique_creditor, responsablesList)

        setDisableButtons(false)

        if (!status) {
            toast.error("Houve um erro para atualizar os responsáveis da carteira, revise os valores e tente novamente!", {
                duration: 7000
            })

            return
        }

        toast.success("Responsáveis da carteira atualizados com sucesso!", {
            duration: 5000
        })
    }

    return (
        <form
            onSubmit={handleSubmit(handleUpdateCreditorResponsable)}
        >
            <h2 className="text-center font-medium mb-5">{creditor}</h2>

            <div className="mx-auto w-1/2 border-[1px] mb-5 border-slate-200 p-4 rounded-md">
                {fields.map((field, index) => {
                    return (
                        <div
                            key={field.id}
                            className="flex justify-between items-center gap-1 mb-4"
                        >
                            <div>{field.name}</div>
                            <CheckBoxButton 
                                isActive={field.status}
                                OnClick={() => handleChangeStatus(field.status, index)}
                            />
                        </div>
                    )
                })}
            </div>

            <Button 
                type="button"
                styles="w-fit text-sm float-right px-2 py-2 ml-1 border-red-400 text-red-400 hover:bg-red-400 focus:bg-red-400"
                text="Fechar"
                OnClick={() => dialogRef.current?.close()}
                disabled={disableButtons}
            />

            <Button 
                text="Salvar"
                styles="w-fit text-sm px-2 py-2 float-right"
                disabled={disableButtons}
            />

            <Toaster 
                reverseOrder={false}
                position="bottom-right"
            />
        </form>
    )

}
