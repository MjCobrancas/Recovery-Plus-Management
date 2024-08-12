import { verifyUserToken } from "@/api/generics/verifyToken";
import { createRelationToSchedules } from "@/api/register/agendas/createRelationSchedules";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { ICreateScheduleFormProps, createScheduleSchema } from "@/interfaces/register/agendas/ICreateScheduleForm";
import { ICreditorRelationFilterAgingsForm } from "@/interfaces/register/agendas/IGetRelation";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function CreateScheduleForm({ ocorrences, schedules, disableAllButtons, disableButtons, resetFormType }: ICreateScheduleFormProps) {
    const router = useRouter()

    const [isDuplicateAging, setIsDuplicateAging] = useState(false)

    const { control, register, handleSubmit, watch, formState: { errors }, reset, setError, clearErrors } = useForm<{ createSchedules: ICreditorRelationFilterAgingsForm[] }>({
        defaultValues: {
            createSchedules: useMemo(() => {
                return schedules?.map((item) => {
                    return {
                        id_creditor: item.id_creditor,
                        id_creditors_ocorrence: item.id_creditors_ocorrence,
                        id_ocorrence: String(item.id_ocorrence),
                        agings: item.agings,
                        creditor: item.creditor,
                        quantity: String(0),
                        id_aging: String(item.agings[0].Id_Aging),
                        new: false
                    }
                })
            }, [schedules])
        },
        resolver: zodResolver(createScheduleSchema)
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: "createSchedules"
    })

    useEffect(() => {
        const schedulesData: ICreditorRelationFilterAgingsForm[] = []
        if (schedules == null) {
            return
        }

        schedules.map((item) => {
            schedulesData.push({
                id_creditor: item.id_creditor,
                id_creditors_ocorrence: item.id_creditors_ocorrence,
                id_ocorrence: String(item.id_ocorrence),
                agings: item.agings,
                creditor: item.creditor,
                quantity: String(0),
                id_aging: String(item.agings[0].Id_Aging),
                new: false
            })
        })

        reset({ createSchedules: schedulesData });
    }, [schedules, reset]);

    function removeRowOnList(index: number) {
        remove(index)
    }

    function copyRowToListCreate(index: number) {
        const object = fields[index]
        object.new = true

        append(object)
    }

    async function createSchedules(data: FieldValues) {
        const isValidToken = await verifyUserToken()

        if (!isValidToken) {
            return router.push('/login')
        }

        let findAgingDuplicate = false
        disableAllButtons(true)

        for (let i = 0; i < data.createSchedules.length; i++) {
            for (let cont = 0; cont < data.createSchedules.length; cont++) {

                if (i == 0) {
                    break
                }

                if (data.createSchedules[i].id_ocorrence == data.createSchedules[cont].id_ocorrence && i != cont) {
                    if (data.createSchedules[i].id_aging == data.createSchedules[cont].id_aging) {
                        findAgingDuplicate = true
                        setError(`createSchedules.${i}.id_aging`, {
                            type: "400"
                        })
                        setError(`createSchedules.${cont}.id_aging`, {
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

        for (let i = 0; i < data.createSchedules.length; i++) {
            objectValues.push({
                id_credor: data.createSchedules[i].id_creditor,
                id_ocorrence: Number(data.createSchedules[i].id_ocorrence),
                id_aging: Number(data.createSchedules[i].id_aging),
                quantity: Number(data.createSchedules[i].quantity),
                status: true
            })
        }

        const createSchedules = await createRelationToSchedules(objectValues)

        if (!createSchedules.status) {
            toast.error("Erro na criação de novas agendas, revise os valores e tente novamente", {
                duration: 5000
            })

            setTimeout(() => {
                disableAllButtons(false)
            }, 5000);

            return
        }

        toast.success("Agendas criadas com sucesso!", {
            duration: 5000
        })

        setTimeout(() => {
            disableAllButtons(false)
        }, 5000);

        resetFormType()
    }

    return (
        <form onSubmit={handleSubmit(createSchedules)}>
            <h2 className={`font-semibold black/80 text-xl my-5 mb-1`}>
                Crie as agendas
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
                            <th className={`font-semibold p-2 dark:text-white/80`}>Credor</th>
                            <th className={`font-semibold p-2 dark:text-white/80`}>
                                Ocorrência
                            </th>
                            <th className={`font-semibold p-2 dark:text-white/80`}>Fase</th>
                            <th className={`font-semibold p-2 dark:text-white/80`}>
                                Quantidade
                            </th>
                            <th className={`font-semibold p-2 dark:text-white/80`}>Ações</th>
                        </tr>
                    </thead>
                    <tbody className={`items-center p-1 bg-slate-100`}>
                        {fields != null && fields.map((item, index) => {
                            return (
                                <tr
                                    key={item.id}
                                    className={`odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-black/80 dark:even:bg-black/70`}
                                >
                                    <td className="p-2 text-center">{item.creditor}</td>
                                    <td className="p-2">
                                        <SelectField
                                            name={`createSchedules.${index}.id_ocorrence`}
                                            id="idOcorrence"
                                            styles={`bg-white text-black
                                                ${errors.createSchedules && errors.createSchedules[index]?.id_ocorrence
                                                    ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                                    : ""
                                                }
                                            `}
                                            onForm={true}
                                            register={register}
                                            value={watch(`createSchedules.${index}.id_ocorrence`)}
                                        >
                                            {ocorrences.ocorrence.map((ocorrence) => {
                                                return (
                                                    <Option
                                                        key={ocorrence.Id_Ocorrence}
                                                        selectedValue={item.id_ocorrence}
                                                        value={ocorrence.Id_Ocorrence}
                                                        firstValue={ocorrence.Ocorrence}
                                                    />
                                                )
                                            })}
                                        </SelectField>
                                    </td>
                                    <td className="p-2">
                                        <SelectField
                                            name={`createSchedules.${index}.id_aging`}
                                            id="idAging"
                                            styles={`
                                                text-black bg-white
                                                ${errors.createSchedules && errors.createSchedules[index]?.id_aging
                                                    ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                                    : ""
                                                }
                                            `}
                                            onForm={true}
                                            register={register}
                                            value={watch(`createSchedules.${index}.id_aging`)}
                                        >
                                            {item.agings.map((aging) => {
                                                return (
                                                    <Option
                                                        key={aging.Id_Aging}
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
                                            name={`createSchedules.${index}.quantity`}
                                            type="number"
                                            value={watch(`createSchedules.${index}.quantity`)}
                                            styles={`w-32
                                                    ${errors.createSchedules && errors.createSchedules[index]?.quantity
                                                    ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                                    : ""
                                                }
                                            `}
                                            onForm={true}
                                            register={register}
                                        />
                                    </td>
                                    <td className="p-2 text-center">
                                        <div className={`flex gap-2 items-center justify-center`}>
                                            {!item.new && (
                                                <button
                                                    type="button"
                                                    title="Copiar linha"
                                                    onClick={() => copyRowToListCreate(index)}
                                                    className={`bg-blue-400 text-white px-2 py-1 rounded-md hover:bg-blue-500 duration-150`}
                                                >
                                                    <FontAwesomeIcon icon={faCopy} />
                                                </button>
                                            )}

                                            <button
                                                title="Remover da lista"
                                                type="button"
                                                className={`py-1 px-2 rounded hover:text-slate-500 dark:hover:text-slate-400 dark:text-white duration-200`}
                                                onClick={() => removeRowOnList(index)}
                                            >
                                                <FontAwesomeIcon icon={faXmark} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <div className={`w-full flex items-end justify-end mt-2`}>
                <Button
                    type="submit"
                    name="create-schedule"
                    text="Salvar Configuração"
                    disabled={disableButtons}
                    styles={`w-fit text-md h-12`}
                />
            </div>

        </form>
    )
}