'use client'

import { getCreditorResponsableById } from "@/api/register/creditor-responsable/getCreditorResponsablesById"
import { IContainerResponsableCreditorProps } from "@/interfaces/register/creditors-responsables/IContainerResponsableCreditor"
import { faPencil } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef, useState } from "react"
import { Button } from "../Button"
import { DialogUpdateCreditorResponsable } from "./DialogUpdateCreditorResponsable"

export function ContainerResponsableCreditor({ backOffices, creditorsResponsables }: IContainerResponsableCreditorProps) {

    const [creditorUnique, setCreditorUnique] = useState("")
    const [idUniqueCreditor, setIdUniqueCreditor] = useState(0)
    const [responsablesList, setResponsablesList] = useState<{ id_user: string, name: string, status: boolean }[]>([])

    const dialogRef = useRef<HTMLDialogElement>(null)

    async function handleOpenDialog(id_unique_creditor: number, creditor: string) {
        const responsables = await getCreditorResponsableById(id_unique_creditor)

        function handleUnionArrays() {
            const listResponsable: { id_user: string, name: string, status: boolean }[] = []
            const idResponsables: number[] = []
    
            for (let i = 0; i < responsables.length; i++) {
                const responsable = responsables[i]
                idResponsables.push(responsable.Id_User)
    
                listResponsable.push({
                    id_user: String(responsable.Id_User),
                    name: responsable.Name,
                    status: responsable.Status
                })
            }
    
            backOffices.map((backOffice) => {
                let found = false
                for (let i = 0; i < listResponsable.length; i++) {
                    if (String(backOffice.Id_User) == String(listResponsable[i].id_user)) {
                        found = true

                        break
                    }    
                }
    
                if (!found) {
                    listResponsable.push({
                        id_user: String(backOffice.Id_User),
                        name: `${backOffice.Name} ${backOffice.Last_Name}`,
                        status: false
                    })
                }
            })
    
            return listResponsable.sort((a, b) => a.name.localeCompare(b.name))
        }

        const responsablesListSort = handleUnionArrays()

        setResponsablesList(responsablesListSort)

        dialogRef.current?.showModal()
        setIdUniqueCreditor(id_unique_creditor)
        setCreditorUnique(creditor)
    }

    return (
        <>
            <dialog
                ref={dialogRef}
                className="w-3/4 max-lg:w-4/5 p-4 rounded-lg dark:bg-zinc-800 max-sm:w-full"
            >
                <DialogUpdateCreditorResponsable 
                    id_unique_creditor={idUniqueCreditor}
                    creditor={creditorUnique}
                    responsablesList={responsablesList}
                    dialogRef={dialogRef}
                />
            </dialog>
            <section className="px-2">
                <table className="w-full border-[1px] my-14">
                    <thead className="bg-gray-200 dark:bg-zinc-800 border-[1px] border-black dark:border-slate-200">
                        <tr>
                            <th className="font-semibold p-2 dark:text-white/80 rounded-tl-md">Credor</th>
                            <th className="font-semibold p-2 dark:text-white/80">Responsável</th>
                            <th className="font-semibold p-2 dark:text-white/80 rounded-tr-md">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {creditorsResponsables.map((creditorResponsable) => {
                            return (
                                <tr
                                    key={creditorResponsable.Id_Unique_Creditor}
                                    className="odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-zinc-700 dark:even:bg-zinc-800"
                                >
                                    <td className="p-2 text-center border-[1px] border-black dark:border-slate-200">{creditorResponsable.Creditor}</td>
                                    <td className="p-2 text-center border-[1px] border-black dark:border-slate-200">
                                        {creditorResponsable.Responsables.map((responsable, index) => {
                                            return (
                                                <span
                                                    key={index}
                                                >
                                                    {responsable.Name.length == 0 ? "N/A" : (creditorResponsable.Responsables.length - 1) != index ? `${responsable.Name} |` : ` ${responsable.Name}`}
                                                </span>
                                            )
                                        })}
                                    </td>
                                    <td className="p-2 text-center border-[1px] border-black dark:border-slate-200 ">
                                        <Button
                                            type="button"
                                            styles="mx-auto w-fit px-2 py-2"
                                            OnClick={() => handleOpenDialog(creditorResponsable.Id_Unique_Creditor, creditorResponsable.Creditor)}
                                        >
                                            <FontAwesomeIcon
                                                icon={faPencil}
                                            />
                                        </Button>
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
