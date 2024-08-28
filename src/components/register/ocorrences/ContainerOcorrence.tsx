'use client'

import { Button } from "@/components/Button";
import { IContainerOcorrenceProps } from "@/interfaces/register/ocorrences/IContainerOcorrence";
import { useRef, useState } from "react";
import { DialogCreateOcorrence } from "./DialogCreateOcorrence";
import { Toaster } from "react-hot-toast";
import { UpdateOcorrenceForm } from "./UpdateOcorrenceForm";

export function ContainerOcorrence({ ocorrences, statusOcorrences }: IContainerOcorrenceProps) {
    const [filterCpc, setFilterCpc] = useState(true)
    const [filterStatus, setFilterStatus] = useState(true)
    const [editOcorrence, setEditOcorrence] = useState(false)
    const [idOcorrence, setIdOcorrence] = useState(0)
    const dialogRef = useRef<HTMLDialogElement>(null)

    function openDialogOcorrences() {
        dialogRef.current?.showModal()
    }

    function CloseDialogOcorrences() {
        dialogRef.current?.close()
    }

    function enableEdit(id_ocorrence: number) {
        setIdOcorrence(Number(id_ocorrence))
        setEditOcorrence(true)
    }

    function cancelOcorrenceEdit() {
        setIdOcorrence(0)
        setEditOcorrence(false)
    }

    return (
        <>
            <dialog
                id="createOcorrence-dialog"
                className={`w-3/4 max-lg:w-3/4 p-2 rounded-lg dark:bg-slate-600 max-sm:w-full`}
                ref={dialogRef}
            >
                <DialogCreateOcorrence
                    CloseDialogOcorrences={CloseDialogOcorrences}
                    statusOcorrences={statusOcorrences}
                />
            </dialog>
            <div className={`flex items-end justify-between p-2`}>
                <div className={`flex gap-4 items-end ml-1`}>
                    <label
                        className="flex justify-center items-center gap-2"
                        htmlFor="CPC"
                    >
                        CPC
                        <input
                            type="checkbox"
                            id="CPC"
                            name="CPC"
                            checked={filterCpc}
                            onClick={() => {
                                setFilterCpc((state) => !state)
                                cancelOcorrenceEdit()
                            }}
                        />
                    </label>

                    <label
                        className="flex justify-center items-center gap-2"
                        htmlFor="ocorrenceStatus"
                    >
                        Status
                        <input
                            type="checkbox"
                            id="ocorrenceStatus"
                            name="ocorrenceStatus"
                            checked={filterStatus}
                            onClick={() => {
                                setFilterStatus((state) => !state)
                                cancelOcorrenceEdit()
                            }}
                        />
                    </label>
                </div>

                <Button
                    text="Criar ocorrência"
                    type="button"
                    styles={`w-fit text-md p-2 ml-2 border border-green-500 rounded-md bg-transparent
                        duration-200 text-green-500 hover:bg-green-500 dark:bg-transparent
                        dark:hover:bg-green-500 focus:bg-transparent focus:text-white focus:bg-green-500
                    `}
                    OnClick={() => openDialogOcorrences()}
                />
            </div>

            <div className={`p-2`}>
                <div className={`gap-1 max-h-96 overflow-y-auto`}>
                    {ocorrences.ocorrence.map((ocorrences, index) => {

                        if (filterCpc != ocorrences.cpc || filterStatus != ocorrences.Status) {
                            return
                        }

                        return (
                            <UpdateOcorrenceForm
                                key={index}
                                ocorrences={ocorrences}
                                statusOcorrences={statusOcorrences}
                                editOcorrence={editOcorrence}
                                idOcorrence={idOcorrence}
                                enableEdit={enableEdit}
                                cancelOcorrenceEdit={cancelOcorrenceEdit}
                            />
                        )
                    })}
                </div>
            </div>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
        </>
    )

}