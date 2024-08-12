'use client'

import { verifyUserToken } from "@/api/generics/verifyToken"
import { createQuickUser } from "@/api/user/quick-register/createQuickUser"
import { Button } from "@/components/Button"
import { FieldForm } from "@/components/FieldForm"
import { Input } from "@/components/Input"
import { Option } from "@/components/Option"
import { SelectField } from "@/components/SelectField"
import { IContainerQuickRegisterForm, IContainerQuickRegisterFormSchema, IContainerQuickRegisterProps } from "@/interfaces/user/quick-register/IContainerQuickRegister"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { ChangeEvent, useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import toast from "react-hot-toast"

export function ContainerQuickRegister({ creditors, userRoles }: IContainerQuickRegisterProps) {
    const router = useRouter()

    const { register, handleSubmit, watch, formState: { errors }, setValue, reset } = useForm<IContainerQuickRegisterForm>({
        defaultValues: {
            name: "",
            lastName: "",
            userName: "",
            cpf: "",
            creditor: "0",
            profession: "0"
        },
        resolver: zodResolver(IContainerQuickRegisterFormSchema)
    })

    const [disableAllButtons, setDisableAllButtons] = useState(false)

    function formatCpf(event: ChangeEvent<HTMLInputElement>) {
        const cpf = event.target.value

        const formatValue = (maskCpfCnpj: string) => {
            const cpf = maskCpfCnpj
                .replace(/\D/g, "")
                .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")

            setValue("cpf", cpf)

            return
        }

        return formatValue(cpf)
    }

    async function handleQuickRegister(data: FieldValues) {  
        
        const isValidToken = await verifyUserToken()

        if (!isValidToken) {
            return router.push("/login")
        }

        const requestObject = {
            name: String(data.name),
            last_name: String(data.lastName),
            user_name: String(data.userName),
            cpf: String(data.cpf).replace('.', '').replace('.', '').replace('-', '')
            .replace('/', '').toString(),
            id_creditor: Number(data.creditor),
            user_role: Number(data.profession)
        }

        setDisableAllButtons(true)

        const responseStatus = await createQuickUser<typeof requestObject>(requestObject)

        setDisableAllButtons(false)

        if (!responseStatus) {
            toast.error("Houve um erro na criação do usuário, revise os valores e tente novamente!", {
                duration: 5000
            })

            return
        }

        reset()

        toast.success("Usuário criado com sucesso!")
    }

    return (
        <form 
            onSubmit={handleSubmit(handleQuickRegister)}
            className="border-[2px] border-gray-300 rounded-md relative grid mx-2 mb-10 gap-6 p-4 pb-48 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4"
        >
            <FieldForm
                label="name"
                name="Nome"
                error={errors.name && "Inválido"}
            >
                <Input
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
                    value={watch("name")}
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
                    value={watch("lastName")}
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
                    maxlength={50}
                    required
                    value={watch("userName")}
                    onForm={true}
                    register={register}
                />
            </FieldForm>

            <FieldForm
                label="cpf"
                name="CPF"
                error={errors.cpf && "Inválido"}
            >
                <Input
                    type="text"
                    id="cpf"
                    name="cpf"
                    placeholder="CPF"
                    maxlength={14}
                    required
                    styles={`
                        ${errors.cpf
                            ? "border-[--label-color-error] dark:border-[--label-color-error]"
                            : ""
                        }
                    `}
                    value={watch("cpf")}
                    onForm={true}
                    register={register}
                    onInput={(event: ChangeEvent<HTMLInputElement>) => formatCpf(event)}
                />
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
                        }`
                    }
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
                error={errors.profession && "Inválido"}
            >
                <SelectField 
                    id="profession" 
                    name="profession"
                    onForm={true}
                    register={register}
                    value={watch("profession")}
                    styles={errors.profession ? "border-[--label-color-error] dark:border-[--label-color-error]" : ""}
                >
                    <Option value={"0"} firstValue="Selecione" />

                    {userRoles.map((role) => {
                        return (
                            <Option
                                key={role.Id_Permissions}
                                value={role.Id_Permissions}
                                firstValue={role.Permission}
                            />
                        )
                    })}
                </SelectField>
            </FieldForm>

            <Button
                styles="absolute bottom-16 right-4 w-60 h-12"
                type="submit"
                text="Salvar alterações"
                disabled={disableAllButtons}
            />
        </form>
    )

}