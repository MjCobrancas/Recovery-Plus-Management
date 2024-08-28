import { verifyUserToken } from "@/api/generics/verifyToken"
import { changeStatusOcorrence } from "@/api/register/ocorrences/changeStatusOcorrence"
import { updateOcorrenceStatus } from "@/api/register/ocorrences/updateOcorrence"
import { Option } from "@/components/Option"
import { SelectField } from "@/components/SelectField"
import { IUpdateOcorrenceForm, IUpdateOcorrenceFormProps, updateOcorrenceSchedule } from "@/interfaces/register/ocorrences/IUpdateOcorrenceForm"
import { faPencil } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import toast from "react-hot-toast"

export function UpdateOcorrenceForm({ idOcorrence, editOcorrence, ocorrences, statusOcorrences, cancelOcorrenceEdit, enableEdit }: IUpdateOcorrenceFormProps) {
    const router = useRouter()

    const [disableButton, setDisableButton] = useState(false)

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<IUpdateOcorrenceForm>({
        defaultValues: {
            idOcorrence: ocorrences.Id_Ocorrence,
            ocorrence: ocorrences.Ocorrence,
            idStatusOcorrence: String(ocorrences.Id_Status_Ocorrence),
            cpc: String(ocorrences.cpc),
            status: String(ocorrences.Status)
        },
        resolver: zodResolver(updateOcorrenceSchedule)
    })

    async function updateOcorrence(data: FieldValues) {

        const isValidToken = await verifyUserToken()

        if (!isValidToken) {
            return router.push('/login')
        }

        setDisableButton(true)
        const valueObject = {
            ocorrences: [
                {
                    ocorrence: String(data.ocorrence),
                    cpc: data.cpc == "true" ? true : false,
                    Status: data.status == "true" ? true : false,
                    idOcorrence: Number(data.idOcorrence)
                }
            ],
            statusOcorrences: [
                {
                    idStatusOcorrence: Number(data.idStatusOcorrence)
                }
            ]
        }

        const changeOcorrenceValue = await updateOcorrenceStatus<typeof valueObject>(valueObject)

        setDisableButton(false)

        if (!changeOcorrenceValue) {
            toast.error("Erro na atualização da ocorrência, revise os valores e tente novamente", {
                duration: 5000
            })

            return
        }

        toast.success("Ocorrência atualizada com sucesso!", {
            duration: 5000
        })

        cancelOcorrenceEdit()
    }

    async function changeOcorrenceStatus(id: number) {

        const isValidToken = await verifyUserToken()

        if (!isValidToken) {
            return router.push('/login')
        }

        setDisableButton(true)
        const status = await changeStatusOcorrence(String(id))

        setDisableButton(false)
        if (!status) {
            toast.error("Erro na atualização do status da ocorrência, tente novamente mais tarde", {
                duration: 5000
            })

            return
        }

        toast.success("Status da ocorrência atualizada com sucesso!", {
            duration: 5000
        })
    }

    return (
        <form
            onSubmit={handleSubmit(updateOcorrence)}
            className={`flex items-center justify-between rounded-md p-1 pr-2 odd:bg-slate-200 even:bg-slate-300 dark:odd:bg-zinc-700 dark:even:bg-zinc-800 dark:border-[--border-dark] border-2 h-12`}
        >
            <div className={`w-full h-full flex items-center`}>
                <span className={`ml-2 mr-1`}>Nome:</span>
                <input
                    type="text"
                    id={String(ocorrences.Id_Ocorrence)}
                    value={watch("ocorrence", ocorrences.Ocorrence)}
                    disabled={!editOcorrence
                        ? !editOcorrence &&
                        Number(idOcorrence) != Number(ocorrences.Id_Ocorrence)
                        : editOcorrence &&
                        Number(idOcorrence) != Number(ocorrences.Id_Ocorrence)}
                    className={`disabled:bg-transparent bg-white dark:disabled:bg-transparent dark:bg-zinc-900 p-2 rounded-md outline-none border-none min-w-fit w-80
                        ${errors.ocorrence ? `border-2 border-[--label-color-error] dark:border-[--label-color-error]` : ""}
                    `}
                    {...register("ocorrence")}
                />

                <span className={`mr-2 ml-1`}>Status:</span>

                <SelectField
                    name="idStatusOcorrence"
                    id="idStatusOcorrence"
                    required
                    styles={`w-fit
                        ${errors.idStatusOcorrence && `border-2 border-[--label-color-error] dark:border-[--label-color-error]`}
                    `}
                    disabled={!editOcorrence
                        ? !editOcorrence &&
                        Number(idOcorrence) != Number(ocorrences.Id_Ocorrence)
                        : editOcorrence &&
                        Number(idOcorrence) != Number(ocorrences.Id_Ocorrence)
                    }
                    onForm={true}
                    register={register}
                    value={watch("idStatusOcorrence")}
                >
                    {statusOcorrences.map((status, index) => {
                        return (
                            <Option
                                key={index}
                                value={status.Id_Status_Ocorrence}
                                selectedValue={ocorrences.Id_Status_Ocorrence}
                                firstValue={status.Status_Name}
                            />
                        )
                    })}

                </SelectField>
                <input value={watch("idOcorrence")} {...register("idOcorrence")} className="sr-only" />
                <input value={watch("cpc", String(ocorrences.cpc))} {...register("cpc")} className="sr-only" />
                <input value={watch("status", String(ocorrences.Status))} {...register("status")} className="sr-only" />

                {editOcorrence && idOcorrence == ocorrences.Id_Ocorrence && (
                    <>
                        <button
                            name="ocorrences"
                            type="submit"
                            className={`ml-2 text-white bg-green-500 font-semibold p-2 rounded-sm hover:bg-green-600 duration-200 disabled:bg-slate-300 disabled:border-slate-400 disabled:cursor-not-allowed disabled:text-gray-100 dark:disabled:bg-slate-500 dark:disabled:text-gray-200`}
                            disabled={disableButton}
                        >
                            Salvar
                        </button>

                        <button
                            name="cancelOcorrenceEdit"
                            type="button"
                            className={`ml-2 text-white bg-red-500 font-semibold p-2 rounded-sm hover:bg-red-600 duration-200 disabled:bg-slate-300 disabled:border-slate-400 disabled:cursor-not-allowed disabled:text-gray-100 dark:disabled:bg-slate-500 dark:disabled:text-gray-200`}
                            onClick={() => {
                                reset()
                                cancelOcorrenceEdit()
                            }}
                            disabled={disableButton}
                        >
                            Cancelar
                        </button>
                    </>
                )}
            </div>

            <button
                type="button"
                className={`bg-blue-400 dark:bg-blue-500 dark:hover:bg-blue-600 mr-2 px-2 py-1 duration-200 rounded-sm hover:text-white hover:bg-blue-500 disabled:bg-slate-300 disabled:border-slate-400 disabled:cursor-not-allowed disabled:text-gray-100 dark:disabled:bg-slate-500 dark:disabled:text-gray-200`}
                onClick={() => enableEdit(ocorrences.Id_Ocorrence)}
                disabled={disableButton}
            >
                <FontAwesomeIcon icon={faPencil} />
            </button>

            <button
                name="id"
                value={ocorrences.Id_Ocorrence}
                type="button"
                className={`text-white font-bold w-64 px-2 py-1 duration-200 rounded-md hover:text-white disabled:bg-slate-300 disabled:border-slate-400 disabled:cursor-not-allowed disabled:text-gray-100 dark:disabled:bg-slate-500 dark:disabled:text-gray-200 ${ocorrences.Status
                    ? `bg-red-400 dark:bg-red-500 hover:bg-red-500 dark:hover:bg-red-600`
                    : `bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700`
                    }`}
                disabled={disableButton}
                onClick={() => changeOcorrenceStatus(ocorrences.Id_Ocorrence)}
            >
                {ocorrences.Status ? (
                    "Desativar Ocorrência"
                ) : (
                    "Ativar ocorrência"
                )}

            </button>

        </form>
    )
}