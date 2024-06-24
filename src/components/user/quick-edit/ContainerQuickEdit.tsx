'use client'

import { updateQuickUser } from "@/api/user/quick-edit/updateQuickUser"
import { Button } from "@/components/Button"
import { FieldForm } from "@/components/FieldForm"
import { Input } from "@/components/Input"
import { Option } from "@/components/Option"
import { SelectField } from "@/components/SelectField"
import { IContainerQuickEdit, IContainerQuickEditForm, IContainerQuickEditFormSchema } from "@/interfaces/user/quick-edit/IContainerQuickEdit"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import toast from "react-hot-toast"

export function ContainerQuickEdit({ creditors, userInfo }: IContainerQuickEdit) {

    const [disableAllButtons, setDisableAllButtons] = useState(false)

    const { register, handleSubmit, watch, formState: { errors } } = useForm<IContainerQuickEditForm>({
        defaultValues: {
            name: userInfo.Name,
            lastName: userInfo.Last_Name,
            userName: userInfo.UserName,
            operatorStatus: userInfo.Status ? "1" : "0",
            creditor: String(userInfo.id_credor)
        },
        resolver: zodResolver(IContainerQuickEditFormSchema)
    })

    async function handleUpdateUser(data: FieldValues) {
        const requestObject = {
            id_user: userInfo.Id_User,
            name: String(data.name),
            last_name: String(data.lastName),
            user_name: String(data.userName),
            status: String(data.operatorStatus) == "1" ? true : false,
            id_creditor: Number(data.creditor)
        }

        setDisableAllButtons(true)

        const responseEditUser = await updateQuickUser<typeof requestObject>(requestObject)

        setDisableAllButtons(false)

        if (!responseEditUser) {
            toast.error("Houve um erro na atualização do usuário, revise os valores e tente novamente!", {
                duration: 5000
            })

            return
        }

        toast.success("Usuário atualizado com sucesso!")
    }

    return (
        <form
            onSubmit={handleSubmit(handleUpdateUser)}
            className={`border-[2px] border-gray-300 rounded-md relative grid mx-2 mb-10 gap-6 p-4 pb-48 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4`}
        >
            <FieldForm
                label="name"
                name="Nome"
                error={errors.name && "Inválido"}
            >
                <Input
                    value={watch("name")}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nome"
                    maxlength={50}
                    styles={`
                    ${errors.name
                            ? "border-[--label-color-error] dark:border-[--label-color-error]"
                            : ""
                        } `}
                    onForm={true}
                    register={register}
                    required
                />
            </FieldForm>

            <FieldForm
                label="lastName"
                name="Sobrenome"
                error={errors.lastName && "Inválido"}
            >
                <Input
                    value={watch("lastName")}
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Sobrenome"
                    maxlength={50}
                    required
                    styles={`
                    ${errors.lastName
                            ? "border-[--label-color-error] dark:border-[--label-color-error]"
                            : ""
                        }
                    `}
                    onForm={true}
                    register={register}
                />
            </FieldForm>

            <FieldForm
                label="userName"
                name="Usuário"
                error={errors.userName && "Inválido"}
            >
                <Input
                    value={userInfo.UserName}
                    type="text"
                    id="userName"
                    name="userName"
                    placeholder="Usuário"
                    styles={`
                    ${errors.userName
                            ? "border-[--label-color-error] dark:border-[--label-color-error]"
                            : ""
                        } 
                    `}
                    disabled={true}
                    maxlength={50}
                    required
                    onForm={true}
                    register={register}
                />
            </FieldForm>

            <FieldForm
                label="operatorStatus"
                name="Selecione o status do operador"
                error={errors.operatorStatus && "Inválido"}
            >
                <SelectField
                    name="operatorStatus"
                    id="operatorStatus"
                    required
                    styles={`
                    ${errors.operatorStatus
                            ? "border-[--label-color-error] dark:border-[--label-color-error]"
                            : ""
                        }`}
                    onForm={true}
                    register={register}
                    value={watch("operatorStatus")}
                >
                    <Option
                        value="1"
                        firstValue="Ativo na operação"
                        selectedValue={userInfo.Status ? "1" : "0"}
                    />

                    <Option
                        value="0"
                        firstValue="Desligado da operação"
                        selectedValue={userInfo.Status ? "1" : "0"}
                    />
                </SelectField>
            </FieldForm>

            <FieldForm
                label="creditor"
                name="Selecione o credor"
                error={errors.creditor && "Inválido"}
            >
                <SelectField
                    name="creditor"
                    id="creditor"
                    required
                    styles={`
                    ${errors.creditor
                            ? "border-[--label-color-error] dark:border-[--label-color-error]"
                            : ""
                        }`}
                    onForm={true}
                    register={register}
                    value={watch("creditor")}
                >
                    <Option
                        value="0"
                        firstValue="Selecione a opção"
                    />

                    {creditors.map((item, index) => {
                        return (
                            <Option
                                key={index}
                                value={item.Id_Creditor}
                                firstValue={item.Creditor}
                            />
                        )
                    })}
                </SelectField>
            </FieldForm>

            <FieldForm
                label="profession"
                name="Cargo"
                error={""}
            >
                <Input
                    value={"Operador"}
                    type="text"
                    id="profession"
                    name="profession"
                    placeholder="Cargo"
                    styles={`
                    ${String("error") == "profession"
                            ? "border-[--label-color-error] dark:border-[--label-color-error]"
                            : ""
                        } 
                `}
                    maxlength={50}
                    required
                    disabled={true}
                />
            </FieldForm>

            <Button
                styles="absolute bottom-16 right-4 w-60 h-12"
                type="submit"
                text="Salvar alterações"
                name="buttonSubmit"
                disabled={disableAllButtons}
            />

        </form>
    )
}