import { verifyUserData } from "@/api/user/register/verifyUserData";
import { Ancora } from "@/components/Ancora";
import { ButtonNextOrBack } from "@/components/ButtonNextOrBack";
import { FieldForm } from "@/components/FieldForm";
import { Input } from "@/components/Input";
import { InputMask } from "@/components/InputMask";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { ICreditors } from "@/interfaces/generics/Creditors";
import { IFormUser } from "@/interfaces/user/register/ContainerRegisterProps";
import { CreateUserFormData, CreateUserFormSchema } from "@/interfaces/user/register/FormUser";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { ChangeEvent } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function FormUser({ creditors, usersTurns, userRoles, userEducation, userMaritalStatus, updatePage, setUserFormValue, userForm, BACKEND_DOMAIN, avatar, setAvatar, setPicture }: IFormUser) {
    const { register, handleSubmit, watch, setValue, setError, clearErrors, formState: { errors } } = useForm<CreateUserFormData>({
        resolver: zodResolver(CreateUserFormSchema)
    })

    async function handleFormUserSubmit(data: FieldValues) {

        const { status, errors } = await verifyUserData(data.userName, data.cpf, "true")

        if (!status) {
            if (errors.filter((error) => error.message == "cpfCnpjExists").length > 0) {
                setError("cpf", { message: "invalid cpf" })

                toast.error("Este CPF pertence a outro usuário do Recovery Plus!")
            }

            if (errors.filter((error) => error.message == "userNameExists").length > 0) {
                setError("userName", { message: "invalid username" })

                toast.error("Este nome de usuário pertence a outro usuário do Recovery Plus!")
            }
            
            return
        }

        updatePage(1)
        setUserFormValue(data)
    }

    function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
        const image = (event.target as HTMLInputElement).files
        let reader = new FileReader()

        if (image) {
            if (image.length > 0) {
                setPicture(image[0])
                reader.readAsDataURL(image[0])
                reader.onload = ((event) => {
                    setAvatar(event?.target?.result as string || "")
                })
            }
        }
    }

    function removePhoto() {
        setAvatar("")
        setPicture("")
    }

    function resetFormErrors() {
        setTimeout(() => {
            clearErrors()
        }, 5000);
    }

    function formatCpfOrCnpj(event: ChangeEvent<HTMLInputElement>) {
        const cpf = event.target.value
        const isCpf = String(cpf).length <= 11

        const formatValue = (maskCpfCnpj: string) => {
            if (isCpf) {
                const cpf = maskCpfCnpj
                    .replace(/\D/g, "")
                    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")

                setValue("cpf", cpf)

                return
            } else {
                const cep = maskCpfCnpj
                    .replace(/\D/g, "")
                    .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")

                setValue("cpf", cep)

                return
            }
        }

        return formatValue(cpf)
    }

    return (
        <form onSubmit={handleSubmit(handleFormUserSubmit)}>
            <div className={`grid tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-6 p-4`}>
                <FieldForm label="name" name="Nome" error={errors.name && ""}>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="Nome"
                        styles={`
                            ${errors.name
                                ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                : ""
                            } `
                        }
                        onForm={true}
                        register={register}
                        value={watch("name", userForm != null ? userForm.name : "")}
                    />
                </FieldForm>
                <FieldForm
                    label="lastName"
                    name="Sobrenome"
                    error={errors.lastName && " "}
                >
                    <Input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Sobrenome"
                        required
                        styles={`
                            ${errors.lastName
                                ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                : ""
                            }
                            `}
                        onForm={true}
                        register={register}
                        value={watch("lastName", userForm != null ? userForm.lastName : "")}
                    />
                </FieldForm>

                <FieldForm
                    label="userName"
                    name="Usuário"
                    error={errors.userName && " "}
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
                        onForm={true}
                        register={register}
                        value={watch("userName", userForm != null ? userForm.userName : "")}
                    />
                </FieldForm>

                <FieldForm
                    label="password"
                    name="Senha"
                    error={errors.password && " "}
                >
                    <Input
                        type="text"
                        id="password"
                        name="password"
                        placeholder="Senha"
                        maxlength={100}
                        required
                        styles={`
                        ${errors.password
                                ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                : ""
                            }
                        `}
                        onForm={true}
                        register={register}
                        value={watch("password", userForm ? userForm.password : "")}
                    />
                </FieldForm>

                <FieldForm
                    label="cpf"
                    name="CPF / CNPJ"
                    error={errors.cpf && " "}
                >
                    <InputMask
                        onInput={(event: ChangeEvent<HTMLInputElement>) => formatCpfOrCnpj(event)}
                        id="cpf"
                        name="cpf"
                        placeholder="CPF/CNPJ"
                        maxlength={18}
                        styles={`
                        ${errors.cpf
                                ? `border-[--label-color-error] dark:border-[--label-color-error]
                            focus:border-[--label-color-error]`
                                : ""
                            }
                    `}
                        required
                        onForm={true}
                        register={register}
                        value={watch("cpf", userForm != null ? userForm.cpf : "")}
                    />
                </FieldForm>

                <FieldForm
                    label="mother"
                    name="Nome da mãe"
                    obrigatory={false}
                >
                    <Input
                        required={false}
                        type="text"
                        id="mother"
                        name="mother"
                        placeholder="Mãe"
                        maxlength={80}
                        onForm={true}
                        register={register}
                        value={watch("mother", userForm != null ? userForm.mother : "")}
                    />
                </FieldForm>

                <FieldForm
                    label="father"
                    name="Nome do pai"
                    obrigatory={false}
                >
                    <Input
                        type="text"
                        id="father"
                        name="father"
                        placeholder="Pai"
                        required={false}
                        maxlength={80}
                        styles={`
                        ${errors.father
                                ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                : ""
                            }
                        `}
                        onForm={true}
                        register={register}
                        value={watch("father", userForm != null ? userForm.father : "")}
                    />
                </FieldForm>

                <FieldForm
                    label="birthDate"
                    name="Nascimento"
                    error={errors.birthDate && " "}
                >
                    <Input
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        required

                        styles={`
                            ${errors.birthDate
                                ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                : ""
                            }
                        `}
                        onForm={true}
                        register={register}
                        value={watch("birthDate", userForm != null ? userForm.birthDate : "")}
                    />
                </FieldForm>

                <FieldForm
                    label="admission"
                    name="Admissão"
                    error={errors.admission && " "}
                >
                    <Input
                        type="date"
                        id="admission"
                        name="admission"
                        required
                        styles={`
                        ${errors.admission
                                ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                : ""
                            }
                        `}
                        onForm={true}
                        register={register}
                        value={watch("admission", userForm != null ? userForm.admission : "")}
                    />
                </FieldForm>

                <FieldForm
                    label="dismissal"
                    name="Demissão"
                    obrigatory={false}
                    error={errors.dismissal && " "}
                >
                    <Input
                        type="date"
                        id="dismissal"
                        name="dismissal"
                        styles={`
                            ${errors.dismissal
                                ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                : ""
                            }
                        `}
                        required={false}
                        onForm={true}
                        register={register}
                        value={watch("dismissal", userForm != null ? userForm.dismissal : "")}
                    />
                </FieldForm>

                <FieldForm
                    label="position"
                    name="Cargo"
                    error={errors.position && " "}
                >
                    <Input
                        type="text"
                        id="position"
                        name="position"
                        placeholder="Cargo"
                        maxlength={60}
                        styles={`
                        ${errors.position
                                ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                : ""
                            }
                        `}
                        required
                        onForm={true}
                        register={register}
                        value={watch("position", userForm != null ? userForm.position : "")}
                    />
                </FieldForm>

                <FieldForm
                    label="id_turn"
                    name="Turno do usuário"
                    error={errors.id_turn && " "}
                >
                    <SelectField
                        name="id_turn"
                        id="id_turn"
                        required

                        styles={`${errors.id_turn
                            ? "border-[--label-color-error] dark:border-[--label-color-error]"
                            : ""
                            }`}
                        onForm={true}
                        register={register}
                        value={watch("id_turn", userForm != null ? userForm.id_turn : "")}
                    >
                        <Option
                            value="0"
                            selectedValue={userForm != null ? String(userForm.id_turn) : ""}
                            firstValue="Escolha um turno"
                        />

                        {usersTurns.map((turn, index) => {
                            return (
                                <Option
                                    key={index}
                                    value={turn.Id_Turn}
                                    selectedValue={userForm != null ? String(userForm.id_turn) : ""}
                                    firstValue={turn.Turn}
                                />
                            )
                        })}
                    </SelectField>
                </FieldForm>

                <FieldForm
                    label="permission"
                    name="Nível de permissão"
                    error={errors.permission && " "}
                >
                    <SelectField
                        name="permission"
                        id="permission"
                        required

                        styles={`${errors.permission
                            ? "border-[--label-color-error] dark:border-[--label-color-error]"
                            : ""
                            }`}
                        onForm={true}
                        register={register}
                        value={watch("permission", userForm != null ? userForm.permission : "")}
                    >
                        <Option
                            value=""
                            selectedValue={userForm != null ? String(userForm.permission) : ""}
                            firstValue="Permissão"
                        />

                        {userRoles.map((role, index) => {
                            return (
                                <Option
                                    key={role.Id_Permissions}
                                    value={role.Id_Permissions}
                                    selectedValue={userForm != null ? String(userForm.permission) : ""}
                                    firstValue={role.Permission}
                                />
                            )
                        })}
                    </SelectField>
                </FieldForm>

                <FieldForm
                    label="maritalStatus"
                    name="Status Civil"
                    error={errors.maritalStatus && " "}
                >
                    <SelectField
                        name="maritalStatus"
                        id="maritalStatus"
                        required
                        styles={`
                        ${errors.maritalStatus
                                ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                : ""
                            }`}
                        onForm={true}
                        register={register}
                        value={watch("maritalStatus", userForm != null ? userForm.maritalStatus : "")}
                    >
                        <Option
                            value=""
                            selectedValue={userForm != null ? String(userForm.maritalStatus) : ""}
                            firstValue="Status Civil"
                        />

                        {userMaritalStatus.map((item) => {
                            return (
                                <Option
                                    key={item.Id_Marital}
                                    value={item.Id_Marital}
                                    selectedValue={userForm != null ? String(userForm.maritalStatus) : ""}
                                    firstValue={item.Marital_Status}
                                />
                            )
                        })}
                    </SelectField>
                </FieldForm>

                <FieldForm
                    label="educationStatus"
                    name="Educação"
                    error={errors.educationStatus && " "}
                >
                    <SelectField
                        name="educationStatus"
                        id="educationStatus"
                        styles={`
                        ${errors.educationStatus
                                ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                : ""
                            }`}
                        required
                        onForm={true}
                        register={register}
                        value={watch("educationStatus", userForm != null ? userForm.educationStatus : "")}
                    >
                        <Option
                            value=""
                            selectedValue={userForm != null ? String(userForm.educationStatus) : ""}
                            firstValue="Educação"
                        />

                        {userEducation.map((item) => {
                            return (
                                <Option
                                    key={item.Id_Education}
                                    value={item.Id_Education}
                                    selectedValue={userForm != null ? String(userForm.educationStatus) : ""}
                                    firstValue={item.Education_Status}
                                />
                            )
                        })}
                    </SelectField>
                </FieldForm>

                <FieldForm
                    label="id_credor"
                    name="Compania"
                    error={errors.id_credor && " "}
                >
                    <SelectField
                        name="id_credor"
                        id="id_credor"
                        required
                        styles={`
                        ${errors.id_credor
                                ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                : ""
                            }`}
                        onForm={true}
                        register={register}
                        value={watch("id_credor", userForm != null ? userForm.id_credor : "")}
                    >
                        <Option
                            value={"Selecione"}
                        />

                        {creditors.length > 0 && creditors.map((company: ICreditors) => {
                            return (
                                <Option
                                    key={company.Id_Creditor}
                                    value={company.Id_Creditor}
                                    firstValue={company.Creditor}
                                    selectedValue={userForm != null ? userForm.id_credor : ""}
                                />
                            )
                        })}
                    </SelectField>
                </FieldForm>

                <FieldForm label="profilePicture" name="Foto" obrigatory={false}>
                    <div className={`flex items-center mt-2 mb-2 relative w-72`}>
                        <div>
                            <button
                                onClick={() => removePhoto()}
                                type="button"
                                name="valueOfAvatar"
                            >
                                <FontAwesomeIcon icon={faXmark} className="fa-solid fa-xmark fa-lg text-red-500 mr-2 ml-2 hover:bg-red-300 py-4 px-2 rounded-md duration-200" />
                            </button>
                        </div>

                        <input
                            type="file"
                            name="picture"
                            id="profilePicture"
                            accept="image/png, image/jpg"
                            onChange={(event: ChangeEvent<HTMLInputElement>) => onFileSelected(event)}
                            className={`text-transparent
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-slate-200 file:text-blue-600
                                hover:file:bg-slate-300 file:cursor-pointer`}
                        />

                        {avatar != "" ? (
                            <Image
                                className={`rounded-full w-[5rem] h-[5rem] object-cover cursor-pointer absolute top-[-2rem] right-0 z-20`}
                                src={avatar.toString()}
                                alt="Foto escolhida"
                                width={100}
                                height={100}
                            />
                        ) : (
                            <Image
                                className={`rounded-full w-[5rem] h-[5rem] object-cover cursor-pointer absolute top-[-2rem] right-0 z-20`}
                                src={`${BACKEND_DOMAIN}/get-image-users/userNotFound.png`}
                                alt="Foto Default"
                                width={100}
                                height={100}
                                priority
                            />
                        )}
                    </div>
                </FieldForm>
            </div>
            <aside className={`flex justify-between`}>
                <Ancora toGo="/user" title="Voltar" />
                <ButtonNextOrBack
                    OnClick={() => resetFormErrors()}
                    title="Avançar"
                    styles={`rounded-bl-none rounded-br-lg`}
                />
            </aside>
        </form>
    )
}
