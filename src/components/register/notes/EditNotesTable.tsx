'use client'

import { verifyUserToken } from "@/api/generics/verifyToken"
import { updateNotes } from "@/api/register/notes/updateNotes"
import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { IGetAllNotes, INotes, editNotesSchema } from "@/interfaces/register/notes/GetAllNotes"
import { faPencil, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, useFieldArray, useForm } from "react-hook-form"
import toast, { Toaster } from "react-hot-toast"

export function EditNotesTable({ Notes }: INotes) {

    const router = useRouter()

    const { control, register, handleSubmit, watch, formState: { errors } } = useForm<{ Notes: IGetAllNotes[] }>({
        defaultValues: {
            Notes
        },
        resolver: zodResolver(editNotesSchema)
    })

    const { fields } = useFieldArray({ control, name: "Notes" })
    const [disableButton, setDisableButton] = useState(false)

    const [enableToEdit, setEnableToEdit] = useState(true)

    async function handleRequestEditNote() {
        setEnableToEdit((state) => !state)
    }

    async function handleUpdateNotes(data: FieldValues) {

        const isValidToken = await verifyUserToken()

        if (!isValidToken) {
            return router.push('/login')
        }

        setDisableButton(true)
        const objectResponse = []

        for (let i = 0; i < data.Notes.length; i++) {
            const item = data.Notes[i]
            objectResponse.push({
                idDays: Number(item.Id_Notes),
                days: Number(item.Days)
            })
        }

        const result = await updateNotes<typeof objectResponse>(objectResponse)

        setDisableButton(false)
        if (!result) {
            toast.error("Houve um erro no momento de atualizar as notas")

            return
        }

        toast.success("Notas alteradas com sucesso!", {
            duration: 7000
        })
    }

    return (
        <section className={`p-2 flex flex-col items-center justify-center w-full`}>
            <div className={`p-2`}>
                <div className={`flex items-center justify-between mb-1`}>
                    <p className={`font-bold text-lg text-black/80 dark:text-slate-100 mr-[165px]`}>
                        Habilite para editar
                    </p>
                    <Button
                        styles={`bg-blue-500 px-2 py-1 rounded-md text-white w-[30px] h-[30px]`}
                        OnClick={() => handleRequestEditNote()}
                    >
                        {enableToEdit &&
                            <FontAwesomeIcon icon={faPencil} fontSize={16} />
                        }

                        {!enableToEdit &&
                            <FontAwesomeIcon icon={faXmark} fontSize={16} />
                        }

                    </Button>
                </div>
            </div>

            <form
                onSubmit={handleSubmit(handleUpdateNotes)}
                className={`flex flex-col p-2 overflow-y-auto max-h-[22rem] border-2 border-slate-400 rounded-md`}
            >
                <div className={`flex items-center justify-between text-black/90 font-medium dark:text-slate-50`}>
                    <span>Notas</span>
                    <span>Tempo em dias</span>
                </div>

                {fields.length > 0 && fields.map((item: IGetAllNotes, index) => {

                    let errorsDays = ""

                    if (errors.Notes) {
                        errorsDays = errors.Notes[index]?.Days?.message || ""
                    }

                    return (
                        <article key={index} className={`flex gap-1`}>
                            <Input
                                type="text"
                                id="days"
                                name="days"
                                value={item.Description}
                                styles={`w-16`}
                                disabled
                            />

                            <Input
                                type="number"
                                id={"Notes"}
                                name={`Notes.${index}.Days`}
                                value={watch(`Notes.${index}.Days`, item.Days)}
                                onForm={true}
                                register={register}
                                styles={`
                                    ${errorsDays != "" ? `border-[--label-color-error] dark:border-[--label-color-error] focus:border-[--focus-input-login]` : ""}
                                `}
                                disabled={enableToEdit}
                            />
                        </article>
                    )
                })}


                <Button
                    name="days"
                    value=""
                    type="submit"
                    text="Editar"
                    styles={`w-full mt-2 h-10 text-md`}
                    disabled={enableToEdit || disableButton}
                />
            </form>

            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
        </section>
    )
}