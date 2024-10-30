'use client'

import { Ancora } from "@/components/Ancora";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Input } from "@/components/Input";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { InputCheckbox } from "@/components/InputCheckbox";
import { createTaskData, createTaskSchema, IContainerTasks } from "@/interfaces/register/tasks/IContainerTasks";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTask } from "@/api/register/tasks/createTask";
import toast, { Toaster } from "react-hot-toast";

export function ContainerTasks({ creditors, managerUsers }: IContainerTasks) {

    const { control, register, handleSubmit, watch, formState: { errors }, setError, reset } = useForm<createTaskData>({
        defaultValues: {
            creditor: "0",
            responsable: "0",
            hour: "",
            task: "",
            observation: "",
            sunday: false,
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false
        },
        resolver: zodResolver(createTaskSchema)
    })

    const [disableButton, setDisableButton] = useState(false)

    async function handleCreateTask(data: FieldValues) {
        const splitHour = data.hour.split(':')
        const days = [data.sunday, data.monday, data.tuesday, data.wednesday, data.thursday, data.friday, data.saturday]

        let str = ""

        for (let i = 0; i < days.length; i++) {
            if (days[i]) {
                str += "1 "
            } else {
                str += "0 "
            }
        }

        setDisableButton(true)

        const object = {
            task: data.task,
            observation: data.observation,
            id_creditor: Number(data.creditor),
            id_responsable: Number(data.responsable),
            days: str.trim(),
            hours: Number(splitHour[0]),
            minutes: Number(splitHour[1]),
            status: true
        }

        const responseCreateTask = await createTask<typeof object>(object)

        setDisableButton(false)

        if (!responseCreateTask.status) {
            toast.error("Houve um erro ao criar a tarefa. Revise os valores e tente novamente!", {
                duration: 5000
            })

            return
        }

        toast.success("Tarefa criada com sucesso!", {
            duration: 5000
        })

        reset()
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleCreateTask)}>
                <div className={`flex justify-center items-center mb-2`}>
                    <div className="flex w-[600px] h-fit gap-2">
                        <FieldForm
                            label="creditor"
                            name="Credor:"
                            error={errors.creditor && "Inválido"}
                        >
                            <SelectField
                                name="creditor"
                                id="creditor"
                                styles={`h-11`}
                                required
                                onForm={true}
                                value={watch("creditor")}
                                register={register}
                            >
                                <Option value={"0"} firstValue={"Selecione"} />

                                {creditors.map((creditor, index) => {
                                    return (
                                        <Option key={index} value={creditor.Id_Creditor} firstValue={creditor.Creditor} />
                                    )
                                })}
                            </SelectField>
                        </FieldForm>

                        <FieldForm
                            label="responsable"
                            name="Responsável:"
                            error={errors.responsable && "Inválido!"}
                        >
                            <SelectField
                                name="responsable"
                                id="responsable"
                                styles={`h-11`}
                                required
                                onForm={true}
                                value={watch("responsable")}
                                register={register}
                            >
                                <Option value={"0"} firstValue={"Selecione"} />

                                {managerUsers.map((item, i) => {
                                    return (
                                        <Option key={i} value={item.Id_User} firstValue={item.Name + " " + item.Last_Name} />
                                    )
                                })}
                            </SelectField>
                        </FieldForm>
                    </div>
                </div>

                <div className={`flex justify-center items-center mb-8`}>
                    <div className={`flex w-[600px] h-fit gap-2`}>
                        <FieldForm
                            label="hour"
                            name="Hora:"
                            error={errors.hour ? "Inválido!" : ""}
                        >
                            <Input
                                id="hour"
                                name="hour"
                                type="text"
                                placeholder="00:00"
                                onForm={true}
                                value={watch("hour")}
                                register={register}
                            />
                        </FieldForm>
                    </div>
                </div>

                <div className={`flex justify-center items-center mb-4`}>
                    <div className={`flex w-[600px] h-fit gap-2`}>
                        <FieldForm
                            label="task"
                            name="Atividade:"
                            error={errors.task && "Inválido!"}
                        >
                            <Input
                                id="task"
                                name="task"
                                type="text"
                                placeholder="Atividade a ser desenvolvida"
                                onForm={true}
                                value={watch("task")}
                                register={register}
                            />
                        </FieldForm>
                    </div>
                </div>

                <div className={`flex justify-center items-center mb-2`}>
                    <div className={`flex w-[600px] h-fit gap-2`}>
                        <FieldForm
                            label="observation"
                            name="Observação:"
                            error={errors.observation && "Inválido!"}
                        >
                            <textarea
                                id="observation"
                                className={`w-full h-28 border-2 border-slate-400 rounded-md outline-none focus:border-blue-500 p-2 dark:bg-zinc-800 dark:border-[--border-dark]`}
                                placeholder="Observações sobre a atividade desenvolvida"
                                maxLength={600}
                                required
                                value={watch("observation")}
                                {...register("observation")}
                            />
                        </FieldForm>
                    </div>
                </div>

                <div className={`flex justify-center items-center mb-4`}>
                    <div className={`flex gap-4 justify-center items-center`}>
                        <label className={`flex gap-1 justify-center items-center select-none`}>
                            <InputCheckbox
                                id="sunday"
                                name="sunday"
                                type="checkbox"
                                checked={false}
                                register={register}
                            />
                            Domingo
                        </label>

                        <label className={`flex gap-1 justify-center items-center select-none`}>
                            <InputCheckbox
                                id="monday"
                                name="monday"
                                type="checkbox"
                                checked={false}
                                register={register}
                            />
                            Segunda
                        </label>

                        <label className={`flex gap-1 justify-center items-center select-none`}>
                            <InputCheckbox
                                id="tuesday"
                                name="tuesday"
                                type="checkbox"
                                checked={false}
                                register={register}
                            />
                            Terça
                        </label>

                        <label className={`flex gap-1 justify-center items-center select-none`}>
                            <InputCheckbox
                                id="wednesday"
                                name="wednesday"
                                type="checkbox"
                                checked={false}
                                register={register}
                            />
                            Quarta
                        </label>

                        <label className={`flex gap-1 justify-center items-center select-none`}>
                            <InputCheckbox
                                id="thursday"
                                name="thursday"
                                type="checkbox"
                                register={register}
                            />
                            Quinta
                        </label>

                        <label className={`flex gap-1 justify-center items-center select-none`}>
                            <InputCheckbox
                                id="friday"
                                name="friday"
                                type="checkbox"
                                checked={false}
                                register={register}
                            />
                            Sexta
                        </label>

                        <label className={`flex gap-1 justify-center items-center select-none`}>
                            <InputCheckbox
                                id="saturday"
                                name="saturday"
                                type="checkbox"
                                checked={false}
                                register={register}
                            />
                            Sábado
                        </label>
                    </div>
                </div>

                <footer className={`flex items-baseline justify-between gap-2 mr-2`}>
                    <Ancora
                        title="Voltar"
                        toGo="/register/"
                        styles={`ml-1 mb-1 w-16`}
                    />

                    <Button
                        type="submit"
                        text="Salvar alterações"
                        disabled={disableButton}
                        styles={`ml-2 mr-1 mb-2 border border-green-500 focus:bg-transparent focus:text-blue-500 rounded-md bg-transparent
                        duration-200 px-2 py-2 text-green-500 hover:bg-green-500 dark:bg-transparent
                        dark:hover:bg-green-500 dark:focus:bg-transparent
                        w-fit text-md`}
                    />

                    <Toaster
                        reverseOrder={false}
                        position={"bottom-right"}
                    />
                </footer>
            </form>
        </>
    )
}