import { updateTasks } from "@/api/register/tasks/updateTasks";
import { Button } from "@/components/Button";
import { ButtonError } from "@/components/ButtonError";
import { Input } from "@/components/Input";
import { InputCheckbox } from "@/components/InputCheckbox";
import { IEditTaskFormData, IEditTaskFormProps, IEditTaskFormSchema } from "@/interfaces/register/tasks/IEditTaskForm";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

export function EditTaskForm({ tasks, closeDialog }: IEditTaskFormProps) {

    const { control, register, handleSubmit, watch, formState: { errors }, reset, getValues } = useForm<{ tasksList: IEditTaskFormData[] }>({
        defaultValues: {
            tasksList: tasks.map((task) => {

                const { Id_Task_Config, Task, Observation, Id_Responsable, Id_Creditor, Creditor, Days, Hours, Minutes, Status } = task

                return {
                    Id_Task_Config,
                    Task,
                    Observation,
                    Id_Responsable,
                    Id_Creditor,
                    Creditor,
                    Hours: `${String(Hours).padStart(2, "0")}:${String(Minutes).padStart(2, "0")}`,
                    Status,
                    Sunday: Days.slice(0, 1) == '1' ? true : false,
                    Monday: Days.slice(2, 3) == '1' ? true : false,
                    Tuesday: Days.slice(4, 5) == '1' ? true : false,
                    Wednesday: Days.slice(6, 7) == '1' ? true : false,
                    Thursday: Days.slice(8, 9) == '1' ? true : false,
                    Friday: Days.slice(10, 11) == '1' ? true : false,
                    Saturday: Days.slice(12, 13) == '1' ? true : false
                }
            })
        },
        resolver: zodResolver(IEditTaskFormSchema)
    })

    const [disableButton, setDisableButton] = useState(false)

    const { fields, update } = useFieldArray({
        control,
        name: "tasksList"
    })

    function handleChangeTaskStatus(status: boolean, index: number) {
        const object = fields[index]
        object.Status = !status

        update(index, object)
    }

    async function handleUpdateTasks(data: FieldValues) {
        const taskData = []

        for (let i = 0; i < data.tasksList.length; i++) {
            let foundModificationToUpdate = false
            const task = data.tasksList[i];

            const days = [task.Sunday, task.Monday, task.Tuesday, task.Wednesday, task.Thursday, task.Friday, task.Saturday]
            const splitHour = task.Hours.split(':')

            let str = ''

            for (let i = 0; i < days.length; i++) {
                if (days[i]) {
                    str += "1 "
                } else {
                    str += "0 "
                }
            }

            const object = {
                Id_Task_Config: task.Id_Task_Config,
                Task: task.Task,
                Observation: task.Observation,
                Status: task.Status,
                Days: str.trim(),
                Hours: Number(splitHour[0]),
                Minutes: Number(splitHour[1])
            }

            const arrayItemsNewValues = [object.Id_Task_Config, object.Task, object.Observation, object.Status, object.Days, object.Hours, object.Minutes]
            const arrayItemsOldValues = [tasks[i].Id_Task_Config, tasks[i].Task, tasks[i].Observation, tasks[i].Status, tasks[i].Days, tasks[i].Hours, tasks[i].Minutes]

            for (let j = 0; j < arrayItemsNewValues.length; j++) {
                if (arrayItemsNewValues[j] != arrayItemsOldValues[j]) {
                    foundModificationToUpdate = true
                    break
                }
            }

            if (foundModificationToUpdate) {
                taskData.push(object)
            }
        }

        setDisableButton(true)

        const updateTaskResponse = await updateTasks<typeof taskData>(taskData)

        if (!updateTaskResponse.status) {
            toast.error("Houve um erro ao atualizar a tarefa. Revise os valores e tente novamente!", {
                duration: 5000
            })

            setDisableButton(false)

            return
        }

        toast.success("Tarefa atualizada com sucesso!", {
            duration: 5000
        })

        setDisableButton(false)

        closeDialog()
    }

    return (
        <form onSubmit={handleSubmit(handleUpdateTasks)}>
            <table className="w-full mx-auto my-4">
                <thead className="bg-gray-200 dark:bg-zinc-800">
                    <tr>
                        <th className="w-[10%] font-semibold p-2 dark:text-white/80 rounded-tl-md">
                            Horário
                        </th>
                        <th className="w-1/5 font-semibold p-2 dark:text-white/80">
                            Credor
                        </th>
                        <th className="w-1/5 font-semibold p-2 dark:text-white/80">
                            Tarefa
                        </th>
                        <th className="w-[30%] font-semibold p-2 dark:text-white/80">
                            Observação
                        </th>
                        <th className="w-[10%] font-semibold p-2 dark:text-white/80">
                            Status da tarefa
                        </th>
                        <th className="w-[30%] font-semibold p-2 dark:text-white/80 rounded-tr-md">
                            Dias da tarefa
                        </th>
                    </tr>
                </thead>
                <tbody className="items-center p-1 bg-slate-100">
                    {fields.map((task, index) => {
                        return (
                            <tr
                                key={task.id}
                                className="odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-zinc-700 dark:even:bg-zinc-800"
                            >
                                <td className="p-2 text-center">
                                    <Input
                                        id={`tasksList.${index}.Hours`}
                                        name={`tasksList.${index}.Hours`}
                                        type="text"
                                        onForm={true}
                                        register={register}
                                        value={watch(`tasksList.${index}.Hours`)}
                                    />
                                </td>
                                <td className="p-2 text-center">
                                    <Input
                                        id="Creditor"
                                        name="Creditor"
                                        type="text"
                                        disabled={true}
                                        value={task.Creditor}
                                    />
                                </td>
                                <td className="p-2 text-center">
                                    <Input
                                        id={`tasksList.${index}.Task`}
                                        name={`tasksList.${index}.Task`}
                                        type="text"
                                        onForm={true}
                                        register={register}
                                        value={watch(`tasksList.${index}.Task`)}
                                    />
                                </td>
                                <td className="p-2 text-center">
                                    <Input
                                        id={`tasksList.${index}.Observation`}
                                        name={`tasksList.${index}.Observation`}
                                        type="text"
                                        onForm={true}
                                        register={register}
                                        value={watch(`tasksList.${index}.Observation`)}
                                    />
                                </td>
                                <td className="p-2 text-center">
                                    <button
                                        type="button"
                                        className={`px-2 py-1 duration-200 rounded-md hover:text-white w-fit disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:cursor-not-allowed disabled:hover:text-black
                                            ${task.Status ?
                                                "bg-green-400 hover:bg-green-500" :
                                                "bg-red-400 hover:bg-red-500 px-[9px]"
                                            }    
                                        `}
                                        onClick={() => handleChangeTaskStatus(task.Status, index)}
                                    >
                                        {task.Status ? (
                                            <FontAwesomeIcon icon={faCheck} />
                                        ) : (
                                            <FontAwesomeIcon icon={faXmark} />
                                        )}

                                    </button>
                                </td>
                                <td className="p-2 text-center">
                                    <div className={`grid grid-cols-3 grid-rows-3 gap-2`}>
                                        <label className={`flex gap-1 justify-center items-center select-none dark:text-white`}>
                                            <InputCheckbox
                                                id={`tasksList.${index}.Sunday`}
                                                name={`tasksList.${index}.Sunday`}
                                                type="checkbox"
                                                register={register}
                                                checked={task.Sunday}
                                            />
                                            D
                                        </label>

                                        <label className={`flex gap-1 justify-center items-center select-none dark:text-white`}>
                                            <InputCheckbox
                                                id={`tasksList.${index}.Monday`}
                                                name={`tasksList.${index}.Monday`}
                                                type="checkbox"
                                                register={register}
                                                checked={task.Monday}
                                            />
                                            S
                                        </label>

                                        <label className={`flex gap-1 justify-center items-center select-none dark:text-white`}>
                                            <InputCheckbox
                                                id={`tasksList.${index}.Tuesday`}
                                                name={`tasksList.${index}.Tuesday`}
                                                type="checkbox"
                                                register={register}
                                                checked={task.Tuesday}
                                            />
                                            T
                                        </label>

                                        <label className={`flex justify-center items-center select-none dark:text-white`}>
                                            <InputCheckbox
                                                id={`tasksList.${index}.Wednesday`}
                                                name={`tasksList.${index}.Wednesday`}
                                                type="checkbox"
                                                register={register}
                                                checked={task.Wednesday}
                                            />
                                            Q
                                        </label>

                                        <label className={`flex justify-center items-center select-none dark:text-white`}>
                                            <InputCheckbox
                                                id={`tasksList.${index}.Thursday`}
                                                name={`tasksList.${index}.Thursday`}
                                                type="checkbox"
                                                register={register}
                                                checked={task.Thursday}
                                            />
                                            Q
                                        </label>

                                        <label className={`flex justify-center items-center select-none dark:text-white`}>
                                            <InputCheckbox
                                                id={`tasksList.${index}.Friday`}
                                                name={`tasksList.${index}.Friday`}
                                                type="checkbox"
                                                register={register}
                                                checked={task.Friday}
                                            />
                                            S
                                        </label>

                                        <label className={`flex justify-center items-center select-none dark:text-white`}>
                                            <InputCheckbox
                                                id={`tasksList.${index}.Saturday`}
                                                name={`tasksList.${index}.Saturday`}
                                                type="checkbox"
                                                register={register}
                                                checked={task.Saturday}
                                            />
                                            S
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <ButtonError
                styles="text-red-500 float-right ml-2"
                name="Fechar"
                onClick={() => closeDialog()}
            />

            <Button
                styles="border-2 border-blue-400 p-2 px-4 rounded-md duration-150
                font-semibold hover:bg-blue-400 hover:text-white w-fit float-right text-md"
                disabled={disableButton}
                name="save"
                type="submit"
                text="Salvar"
            />

            <Toaster 
                position="bottom-right"
                reverseOrder={true}
            />

        </form>
    )
}