'use client'

import { Button } from "@/components/Button"
import { DialogCreateQuestion } from "./DialogCreateQuestion"
import { useRef } from "react"
import { Toaster } from "react-hot-toast"
import { IContainerQuestionsProps } from "@/interfaces/register/questions/IContainerQuestions"
import { Ancora } from "@/components/Ancora"
import { CardMonitory } from "@/components/cards/CardMonitoria"

export function ContainerQuestions({ questions }: IContainerQuestionsProps) {

    const dialogRef = useRef<HTMLDialogElement>(null)

    function showDialogClick() {
        dialogRef.current?.showModal()
    }

    function closeDialog() {
        dialogRef.current?.close()
    }

    return (
        <>
            <main className="flex flex-col items-center">
                <div className=" w-11/12 h-fit">
                    <div className={`flex items-center justify-end mb-2`}>
                        <Button
                            type="button"
                            text="Crie uma pergunta"
                            OnClick={() => showDialogClick()}
                            styles={`w-fit h-full text-md`}
                        />
                        <dialog
                            id="dialog"
                            className={`w-[60%] h-fit p-4 rounded-lg dark:bg-slate-700 max-sm:w-full`}
                            ref={dialogRef}
                        >
                            <DialogCreateQuestion closeDialog={closeDialog} />
                        </dialog>
                    </div>

                    <div className={`p-2 border rounded-md w-full max-h-96 mb-2 overflow-y-auto`}>
                        <CardMonitory questions={questions} />
                    </div>
                </div>
            </main>

            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />

            <Ancora
                title="Voltar"
                toGo="/register"
                styles={`w-16 mb-1 ml-1`}
            />
        </>
    )
}