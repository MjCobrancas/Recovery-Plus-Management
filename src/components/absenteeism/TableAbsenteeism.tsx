'use client'

import { updateUserAbsenteeismStatus } from "@/api/absenteeism/updateUserAbsenteeismStatus";
import { IGetAllOperatorsInAbsenteeism } from "@/interfaces/absenteeism/IGetAllOperatorsInAbsenteeism";
import { ITableAbsenteeismProps } from "@/interfaces/absenteeism/ITableAbsenteeism";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "../Button";
import { CheckBoxButton } from "../CheckBoxButton";
import { FilterAbsenteeism } from "./FilterAbsenteeism";
import { useRef, useState } from "react";
import { DialogUpdateAbsenteeism } from "./DialogUpdateAbsenteeism/DialogUpdateAbsenteeism";
import { getOperatorInAbsenteeismById } from "@/api/absenteeism/getOperatorInAbsenteeismById";
import { IGetOperatorInAbsenteeismById } from "@/interfaces/absenteeism/IGetOperatorInAbsenteeismById";

export function TableAbsenteeism({ creditors, operators, operatorsInAbsenteeism }: ITableAbsenteeismProps) {

    const dialogRef = useRef<HTMLDialogElement>(null)
    const [fieldIndex, setFieldIndex] = useState(0)

    const [userInfoDialog, setUserInfoDialog] = useState<IGetOperatorInAbsenteeismById | null>(null)
    const [isLoadingDialog, setIsLoadingDialog] = useState(false)

    const { control, setValue } = useForm<{ operatorsArray: IGetAllOperatorsInAbsenteeism[] }>({
        defaultValues: {
            operatorsArray: operatorsInAbsenteeism
        }
    })

    const { fields, update } = useFieldArray({
        control,
        name: "operatorsArray"
    })

    async function handleOpenDialog(id_absenteeism_schedule: number, index: number) {

        setIsLoadingDialog(true)
        dialogRef.current?.showModal()

        const { data, status } = await getOperatorInAbsenteeismById(id_absenteeism_schedule)

        setIsLoadingDialog(false)

        if (!status) {
            dialogRef.current?.close()

            toast.error("Não foi possível encontrar o usuário na agenda do absenteísmo, tente novamente mais tarde.", {
                duration: 7000
            })

            return
        }

        setFieldIndex(index)

        setUserInfoDialog(data)
    }

    function closeDialog() {
        dialogRef.current?.close()
    }

    function setValueOperatorsArray(operatorsArray: IGetAllOperatorsInAbsenteeism[]) {
        setValue("operatorsArray", operatorsArray)
    }

    function updateUserAbsenteeismField(status: boolean) {
        const allFields = fields
        allFields[fieldIndex].Is_On_Company = status

        update(fieldIndex, allFields[fieldIndex])
    }

    async function handleUpdateUserAbsenteeism(id_absenteeism_schedule: number, absenteeism_status: boolean, index: number) {
        const responseUpdateStatus = await updateUserAbsenteeismStatus(id_absenteeism_schedule, absenteeism_status)

        if (!responseUpdateStatus) {
            toast.error("Houve um erro para atualizar a presença do operador, tente novamente mais tarde", {
                duration: 7000,
                id: "absenteeism_toast"
            })

            return
        }

        toast.success(`Status de presença do operador ${fields[index].Name} atualizado com sucesso!`, {
            duration: 5000,
            id: "absenteeism_toast"
        })

        const operatorsListArray = fields
        operatorsListArray[index].Is_On_Company = absenteeism_status
        update(index, operatorsListArray[index])
    }

    return (
        <>
            <dialog
                ref={dialogRef}
                className="w-3/4 max-lg:w-4/5 p-4 rounded-lg dark:bg-zinc-800 max-sm:w-full"
            >
                <h1 className="font-semibold text-xl text-center dark:text-white">Atualizar dados do absenteísmo do operador</h1>
                <DialogUpdateAbsenteeism 
                    user={userInfoDialog}
                    closeDialog={closeDialog}
                    isLoadingDialog={isLoadingDialog}
                    updateUserAbsenteeismField={updateUserAbsenteeismField}
                />
            </dialog>
            <FilterAbsenteeism 
                creditors={creditors}
                operators={operators}
                setValueOperatorsArray={setValueOperatorsArray}
            />
            <section className="mt-4 px-2">
                <table className="w-full mx-auto my-4">
                    <thead className="bg-gray-200 dark:bg-zinc-800">
                        <tr>
                            <th className="font-semibold text-sm p-2 dark:text-white/80 rounded-tl-md">Data</th>
                            <th className="font-semibold text-sm p-2 dark:text-white/80">Nome</th>
                            <th className="font-semibold text-sm p-2 dark:text-white/80">Login</th>
                            <th className="font-semibold text-sm p-2 dark:text-white/80">Equipe</th>
                            <th className="font-semibold text-sm p-2 dark:text-white/80">Turno</th>
                            <th className="font-semibold text-sm p-2 dark:text-white/80">Data de admissão</th>
                            <th className="font-semibold text-sm p-2 dark:text-white/80 rounded-tr-md">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fields.map((operator, index) => {

                            const { Name, UserName, Creditor, Id_User_Turn, Admission, Date, Id_Absenteeism_Schedule, Is_On_Company } = operator

                            return (
                                <tr
                                    className="odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-zinc-700 dark:even:bg-zinc-800"
                                    key={operator.id}
                                >
                                    <td className="text-center text-sm p-2">{Date}</td>
                                    <td className="text-center text-sm p-2">{Name}</td>
                                    <td className="text-center text-sm p-2">{UserName == null ? "Sem Login registrado no sistema" : UserName}</td>
                                    <td className="text-center text-sm p-2">{Creditor}</td>
                                    <td className="text-center text-sm p-2">{Id_User_Turn == 1 ? "Manhã" : Id_User_Turn == 2 ? "Tarde" : "Sem turno definido no sistema"}</td>
                                    <td className="text-center text-sm p-2">{Admission}</td>
                                    <td className="flex justify-center items-center text-center text-sm p-2 gap-3">
                                        <Button
                                            type="button"
                                            styles="w-fit px-1 py-[3px] border-[2px] rounded-md"
                                            OnClick={() => handleOpenDialog(Id_Absenteeism_Schedule, index)}
                                        >
                                            <FontAwesomeIcon icon={faPencil} className="w-4 h-4" />
                                        </Button>
                                        <CheckBoxButton
                                            isActive={Is_On_Company}
                                            OnClick={() => handleUpdateUserAbsenteeism(Id_Absenteeism_Schedule, !Is_On_Company, index)}
                                        />
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </section>
        </>
    )
}
