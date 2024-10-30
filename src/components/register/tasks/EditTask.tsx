'use client'

import { getTasksByIdResponsable } from "@/api/register/tasks/getTasksByIdResponsable";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { editTaskData, editTaskSchema, IEditTaskData, ITaskById } from "@/interfaces/register/tasks/IEditTask";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { EditTaskForm } from "./EditTaskForm";
import { ButtonError } from "@/components/ButtonError";

export function EditTask({ managerUsers }: IEditTaskData) {

    const [disableButton, setDisableButton] = useState(false)
    const [didFilter, setDidFilter] = useState(false)
    const [tasks, setTasks] = useState<ITaskById[]>([])

    const dialog = useRef<HTMLDialogElement>(null)
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<editTaskData>({
        defaultValues: {
            responsable: "0"
        },
        resolver: zodResolver(editTaskSchema)
    })

    function openDialog() {
        dialog.current?.showModal()
    }

    function closeDialog() {
        resetFilter()
        dialog.current?.close()
    }

    async function handleGetTasks(data: FieldValues) {

        setDisableButton(true)

        const tasksData = await getTasksByIdResponsable(Number(data.responsable))

        if (!tasksData.status) {
            toast.error("Não foi possível encontrar tarefas deste usuário, revise os valores e tente novamente!", {
                duration: 5000
            })

            setDisableButton(false)

            return
        }

        if (tasksData.data.length <= 0) {
            toast.error("Este usuário ainda não possui tarefas cadastradas.", {
                duration: 5000
            })

            setDisableButton(false)

            return
        }

        setDidFilter(true)
        setDisableButton(false)
        setTasks(tasksData.data)

        toast.success("Tarefas encontradas com sucesso!")
    }

    function resetFilter() {
        reset()
        setDidFilter(false)
        setTasks([])
    }

    return (
        <>
            <div className="absolute top-20 right-10 max-md:top-[65px]">
                <Button
                    name="editTask"
                    text="Editar Tarefa"
                    styles={`ml-2 border border-blue-500 focus:bg-transparent focus:text-blue-500 rounded-md bg-transparent
                        duration-200 px-2 py-2 text-blue-500 hover:bg-blue-500 dark:bg-transparent
                        dark:hover:bg-blue-500 dark:focus:bg-transparent
                        w-fit text-md`}
                    OnClick={() => openDialog()}
                />
            </div>


            <dialog
                ref={dialog}
                id={`w-11/12 max-lg:w-3/4 p-2 rounded-lg dark:bg-slate-600 max-sm:w-full`}
                className={`w-11/12 max-lg:w-3/4 p-2 rounded-lg dark:bg-zinc-900 max-sm:w-full`}
            >
                <form onSubmit={handleSubmit(handleGetTasks)}>
                    <section>
                        <h2
                            className={`text-2xl font-bold text-center text-slate-500 my-2 mb-8 dark:text-slate-100`}
                        >
                            Editar Tarefa
                        </h2>
                    </section>

                    <div className={`flex items-center justify-center gap-2`}>
                        <FieldForm
                            label="responsable"
                            name="Responsável"
                            error={errors.responsable && "Inválido!"}
                            styles={`w-fit`}
                        >
                            <SelectField
                                name="responsable"
                                id="responsable"
                                styles={`h-11 w-fit`}
                                value={watch("responsable")}
                                required
                                disabled={false}
                                onForm={true}
                                register={register}
                            >
                                <Option value={"0"} firstValue={"Selecione"} />

                                {managerUsers.map((item, i) => {
                                    return (
                                        <Option
                                            key={i}
                                            value={item.Id_User}
                                            firstValue={item.Name + " " + item.Last_Name}
                                        />
                                    )
                                })}
                            </SelectField>
                        </FieldForm>

                        <Button
                            text="Buscar"
                            name="submitButton"
                            styles={`w-30 p-2 text-md self-end`}
                            disabled={disableButton || didFilter}
                        />

                        <Button
                            type="reset"
                            text="Remover Filtros"
                            styles={`w-30 self-end text-md font-medium p-2 border border-red-400 text-red-500 rounded-md hover:bg-red-400 hover:text-white focus:bg-red-400 duration-200 cursor-pointer disabled:bg-slate-300 disabled:border-slate-400 disabled:cursor-not-allowed disabled:text-gray-100 dark:disabled:bg-slate-500 dark:disabled:text-gray-200`}
                            disabled={disableButton || !didFilter}
                            OnClick={() => resetFilter()}
                        />
                    </div>
                </form>

                {tasks.length > 0 && (
                    <EditTaskForm
                        tasks={tasks}
                        closeDialog={closeDialog}
                    />
                )}

                {tasks.length == 0 && (
                    <ButtonError 
                        type="button" 
                        name="Fechar" 
                        styles="text-red-500 float-right mt-24"
                        onClick={() => closeDialog()}
                    />
                )}

            </dialog >
        </>
    )
}