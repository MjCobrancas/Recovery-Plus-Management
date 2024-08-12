import { verifyUserToken } from "@/api/generics/verifyToken";
import { updateSchedules } from "@/api/register/agendas/updateSchedules";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { IEditScheduleForm, editScheduleSchema } from "@/interfaces/register/agendas/IEditScheduleForm";
import { IGetRelationCreditorsWithOcorrenceData } from "@/interfaces/register/agendas/IGetRelation";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function EditScheduleForm({ ocorrences, schedules, agings, disableAllButtons, disableButtons, resetFormType }: IEditScheduleForm) {
    const router = useRouter()

    const [isDuplicateAging, setIsDuplicateAging] = useState(false)

    const { control, register, handleSubmit, watch, formState: { errors }, reset, setError, clearErrors } = useForm<{ editSchedules: IGetRelationCreditorsWithOcorrenceData[] }>({
        defaultValues: {
            editSchedules: useMemo(() => {
                return schedules?.map((item) => {
                    return {
                        Id_Creditor: item.Id_Creditor,
                        Id_Creditors_Ocorrence: item.Id_Creditors_Ocorrence,
                        Id_Ocorrence: String(item.Id_Ocorrence),
                        Creditor: item.Creditor,
                        Quantity: String(item.Quantity),
                        Id_Aging: String(item.Id_Aging),
                        Status: item.Status,
                        Description: item.Description,
                        Ocorrence: item.Ocorrence
                    }
                })
            }, [schedules])
        },
        resolver: zodResolver(editScheduleSchema)
    })

    const { fields, update } = useFieldArray({
        control,
        name: "editSchedules"
    })

    useEffect(() => {
        const schedulesData: IGetRelationCreditorsWithOcorrenceData[] = []
        if (schedules == null) {
            return
        }

        schedules.map((item) => {
            schedulesData.push({
                Id_Creditor: item.Id_Creditor,
                Id_Creditors_Ocorrence: item.Id_Creditors_Ocorrence,
                Id_Ocorrence: String(item.Id_Ocorrence),
                Creditor: item.Creditor,
                Quantity: String(item.Quantity),
                Id_Aging: String(item.Id_Aging),
                Status: item.Status,
                Description: item.Description,
                Ocorrence: item.Ocorrence
            })
        })

        reset({ editSchedules: schedulesData });
    }, [schedules, reset]);

    function changeStatusOfEditSchedules(status: boolean, index: number) {
        const object = fields[index]
        object.Status = !status
        update(index, object)
    }

    async function saveEditSchedules(data: FieldValues) {
        const isValidToken = await verifyUserToken()

        if (!isValidToken) {
            return router.push('/login')
        }

        disableAllButtons(true)
        let findAgingDuplicate = false

        for (let i = 0; i < data.editSchedules.length; i++) {
            for (let cont = 0; cont < data.editSchedules.length; cont++) {

                if (i == 0) {
                    break
                }

                if (data.editSchedules[i].Id_Ocorrence == data.editSchedules[cont].Id_Ocorrence && i != cont) {
                    if (data.editSchedules[i].Id_Aging == data.editSchedules[cont].Id_Aging) {
                        findAgingDuplicate = true
                        setError(`editSchedules.${i}.Id_Aging`, {
                            type: "400"
                        })
                        setError(`editSchedules.${cont}.Id_Aging`, {
                            type: "400"
                        })
                    }
                }
            }
        }

        if (findAgingDuplicate) {
            setIsDuplicateAging(true)
            setTimeout(() => {
                clearErrors()
                setIsDuplicateAging(false)
                disableAllButtons(false)
            }, 5000);
            return
        }

        const objectValues = []

        for (let i = 0; i < data.editSchedules.length; i++) {
            objectValues.push({
                id_creditors_ocorrence: Number(data.editSchedules[i].Id_Creditors_Ocorrence),
                id_credor: Number(data.editSchedules[i].Id_Creditor),
                id_ocorrence: Number(data.editSchedules[i].Id_Ocorrence),
                id_aging: Number(data.editSchedules[i].Id_Aging),
                quantity: Number(data.editSchedules[i].Quantity),
                status: data.editSchedules[i].Status
            })
        }

        const updateSchedulesResponse = await updateSchedules<typeof objectValues>(objectValues)

        if (!updateSchedulesResponse.status) {
            toast.error("Erro na atualização das agendas, revise os valores e tente novamente", {
                duration: 5000
            })

            setTimeout(() => {
                disableAllButtons(false)
            }, 5000);

            return
        }

        toast.success("Agendas atualizadas com sucesso!", {
            duration: 5000
        })

        setTimeout(() => {
            disableAllButtons(false)
        }, 5000);

        resetFormType()

    }

    return (
        <>
            <form onSubmit={handleSubmit(saveEditSchedules)}>
                <h2 className={`font-semibold black/80 text-xl my-5 mb-1`}>
                    Edite as agendas
                </h2>

                {isDuplicateAging && (
                    <p className={`text-red-400 font-semibold my-2`}>
                        Escolha fases diferentes para a mesma ocorrência.
                    </p>
                )}

                <div className={`max-h-96 overflow-y-auto`}>
                    <table className={`w-full my-4`}>
                        <thead className={` bg-slate-100 dark:bg-slate-500 rounded-md`}>
                            <tr>
                                <th className={`rounded-tl-md font-semibold p-2 dark:text-white/80`}>ID</th>
                                <th className={`font-semibold p-2 dark:text-white/80`}>Credor</th>
                                <th className={`font-semibold p-2 dark:text-white/80`}>Ocorrência</th>
                                <th className={`font-semibold p-2 dark:text-white/80`}>Fase</th>
                                <th className={`font-semibold p-2 dark:text-white/80`}>Quantidade</th>
                                <th className={`font-semibold p-2 dark:text-white/80`}>Status</th>
                            </tr>
                        </thead>
                        <tbody className={`items-center p-1 bg-slate-100`}>
                            {fields.map((item, index) => {
                                return (
                                    <tr
                                        key={item.id}
                                        className={`odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-gray-300 dark:even:bg-gray-400/80`}
                                    >
                                        <td className="p-2 text-center">
                                            <button 
                                                {...register(`editSchedules.${index}.Id_Creditors_Ocorrence`)}
                                                value={watch(`editSchedules.${index}.Id_Creditors_Ocorrence`, item.Id_Creditors_Ocorrence)}
                                                disabled={true}
                                            >
                                                {item.Id_Creditors_Ocorrence}
                                            </button>
                                        </td>
                                        <td className="p-2 text-center">
                                            <button 
                                                {...register(`editSchedules.${index}.Id_Creditor`)}
                                                value={watch(`editSchedules.${index}.Id_Creditor`, item.Id_Creditor)}
                                                disabled={true}
                                            >
                                                {item.Creditor}
                                            </button>
                                        </td>
                                        <td className="p-2">
                                            <SelectField
                                                name={`editSchedules.${index}.Id_Ocorrence`}
                                                id="idOcorrence"
                                                styles={`bg-white text-black
                                                        ${errors.editSchedules && errors.editSchedules[index]?.Id_Ocorrence
                                                        ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                                        : ""
                                                    }
                                                `}
                                                onForm={true}
                                                register={register}
                                                value={watch(`editSchedules.${index}.Id_Ocorrence`)}
                                            >
                                                {ocorrences.ocorrence.length > 0 && ocorrences.ocorrence.map((ocorrence, index) => {
                                                    return (
                                                        <Option
                                                            key={index}
                                                            selectedValue={item.Id_Ocorrence}
                                                            value={ocorrence.Id_Ocorrence}
                                                            firstValue={ocorrence.Ocorrence}
                                                        />
                                                    )
                                                })}

                                            </SelectField>
                                        </td>
                                        <td className="p-2">
                                            <SelectField
                                                name={`editSchedules.${index}.Id_Aging`}
                                                id="idAging"
                                                styles={`bg-white text-black
                                                    ${errors.editSchedules && errors.editSchedules[index]?.Id_Aging
                                                        ? `border border-red-400`
                                                        : ``
                                                    }
                                                `}
                                                onForm={true}
                                                register={register}
                                                value={watch(`editSchedules.${index}.Id_Aging`)}
                                            >
                                                {agings.map((aging, index) => {
                                                    return (
                                                        <Option
                                                            key={index}
                                                            selectedValue={item.Id_Aging}
                                                            value={aging.Id_Aging}
                                                            firstValue={aging.Description}
                                                        />
                                                    )
                                                })}

                                            </SelectField>
                                        </td>
                                        <td className="p-2 flex items-center justify-center">
                                            <Input
                                                id="quantity"
                                                name={`editSchedules.${index}.Quantity`}
                                                type="number"
                                                styles={`w-32
                                                    ${errors.editSchedules && errors.editSchedules[index]?.Quantity
                                                        ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                                        : ""
                                                    }
                                                `}
                                                onForm={true}
                                                register={register}
                                                value={watch(`editSchedules.${index}.Quantity`)}
                                            />
                                        </td>
                                        <td className="p-2 text-center">
                                            <button
                                                type="button"
                                                onClick={() => changeStatusOfEditSchedules(item.Status, index)}
                                                className={`px-2 py-1 duration-200 rounded-md hover:text-white 
                                                    ${item.Status
                                                        ? ` bg-green-400 hover:bg-green-500`
                                                        : `bg-red-400 hover:bg-red-500`
                                                    }`}
                                                {...register(`editSchedules.${index}.Status`)}
                                            >
                                                {watch(`editSchedules.${index}.Status`, item.Status) ? (
                                                    <FontAwesomeIcon icon={faCheck} />
                                                ) : (
                                                    <FontAwesomeIcon icon={faXmark} />
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className={`w-full flex items-end justify-end`}>
                    <Button
                        type="submit"
                        name="editSchedules"
                        text="Salvar alterações"
                        disabled={disableButtons}
                        styles={`w-fit text-md h-12 mt-2`}
                    />
                </div>
            </form>
        </>
    )
}