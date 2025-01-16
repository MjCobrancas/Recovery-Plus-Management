import { Ancora } from "@/components/Ancora";
import { ButtonNextOrBack } from "@/components/ButtonNextOrBack";
import { FieldForm } from "@/components/FieldForm";
import { Input } from "@/components/Input";
import { InputMask } from "@/components/InputMask";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { ICreditors } from "@/interfaces/generics/Creditors";
import { CreateUserFormDataEdit, CreateUserFormSchemaEdit } from "@/interfaces/user/edit/FormUser";
import { IFormUser } from "@/interfaces/user/register/ContainerRegisterProps";
import { cutSliceDate } from "@/utils/CutSliceDate";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { ChangeEvent } from "react";
import { FieldValues, useForm } from "react-hook-form";

export function FormUser({ creditors, usersResponsablesTechnicals, updatePage, setUserFormValue, userForm, user, userStatus, changeUserStatus, userRoles, userEducation, userMaritalStatus, BACKEND_DOMAIN, avatar, setAvatar, setPicture, usersTurns, usersResponsables }: IFormUser) {
    const { register, handleSubmit, watch, clearErrors, formState: { errors }, setValue, getValues } = useForm<CreateUserFormDataEdit>({
        defaultValues: {
            is_responsable: userForm != null ? userForm.is_responsable : user?.Is_Responsable == true ? "1" : "0",
            id_responsable: userForm != null ? userForm.id_responsable : user?.Is_Responsable == true ? "disabled" : String(user?.Id_Responsable),
            is_responsable_technical: userForm != null ? userForm.is_responsable_technical : user?.Is_Responsable_Technical == true ? "1" : "0",
            id_responsable_technical: userForm != null ? userForm.id_responsable_technical : user?.Is_Responsable_Technical == true ? "disabled" : String(user?.Id_Responsable_Technical),
            userName: userForm != null ? userForm.userName : user?.UserName == null ? "" : user?.UserName
        },
        resolver: zodResolver(CreateUserFormSchemaEdit)
    })

    async function handleFormUserSubmit(data: FieldValues) {
        updatePage(1)
        setUserFormValue(data)
    }

    function handleIsResponsable(value: string) {
        if (value == "1") {
            setValue("id_responsable", "disabled")

            return
        }

        setValue("id_responsable", userForm != null ? String(userForm.id_responsable) != "disabled" ? String(userForm.id_responsable) : String(user?.Id_Responsable) : String(user?.Id_Responsable))
    }

    function handleIsResponsableTechnical(value: string) {
        if (value == "1") {
            setValue("id_responsable_technical", "disabled")

            return
        }

        setValue("id_responsable_technical", userForm != null ? String(userForm.id_responsable_technical) != "disabled" ? String(userForm.id_responsable_technical) : String(user?.Id_Responsable_Technical) : String(user?.Id_Responsable_Technical))
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
                        value={watch("name", userForm != null ? userForm.name : user!.Name)}
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
                        value={watch("lastName", userForm != null ? userForm.lastName : user!.Last_Name)}
                    />
                </FieldForm>

                <FieldForm
                    label="userName"
                    name="Usuário"
                    obrigatory={false}
                >
                    <Input
                        type="text"
                        id="userName"
                        name="userName"
                        placeholder="Usuário"
                        maxlength={50}
                        onForm={true}
                        register={register}
                        value={watch("userName", userForm != null ? userForm.userName : user!.UserName)}
                    />
                </FieldForm>

                <FieldForm
                    label="password"
                    name="Senha"
                >
                    <Input
                        type="text"
                        id="password"
                        name="password"
                        placeholder="Senha"
                        maxlength={100}
                        required
                        onForm={false}
                        value={""}
                        disabled
                    />
                </FieldForm>

                <FieldForm
                    label="cpf"
                    name="CPF / CNPJ"
                >
                    <InputMask
                        id="cpf"
                        name="cpf"
                        placeholder="CPF/CNPJ"
                        maxlength={18}
                        required={false}
                        disabled={true}
                        styles=""
                        onForm={false}
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
                        value={watch("mother", userForm != null ? userForm.mother : user!.Mother)}
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
                        value={watch("father", userForm != null ? userForm.father : user!.Father)}
                    />
                </FieldForm>

                <FieldForm
                    label="salary"
                    name="Salário"
                    error={errors.salary && " "}
                >
                    <Input
                        type="number"
                        id="salary"
                        name="salary"
                        placeholder="Salário"
                        required={true}
                        maxlength={80}
                        styles={`
                        ${errors.salary
                                ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                : ""
                            }
                        `}
                        onForm={true}
                        register={register}
                        value={watch("salary", userForm != null ? userForm.salary : user?.Salary)}
                    />
                </FieldForm>

                <FieldForm
                    label="bonus"
                    name="Bonificação"
                    error={errors.bonus && " "}
                >
                    <Input
                        type="number"
                        id="bonus"
                        name="bonus"
                        placeholder="Bonificação"
                        required={true}
                        maxlength={80}
                        styles={`
                            ${errors.bonus
                                ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                : ""
                            }
                        `}
                        onForm={true}
                        register={register}
                        value={watch("bonus", userForm != null ? userForm.bonus : user?.Bonus)}
                    />
                </FieldForm>

                <FieldForm
                    label="payment_method"
                    name="Chave Pix"
                    obrigatory={false}
                >
                    <Input
                        type="string"
                        id="payment_method"
                        name="payment_method"
                        placeholder="Salário"
                        required={false}
                        maxlength={80}
                        styles={`
                        ${errors.payment_method
                                ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                : ""
                            }
                        `}
                        onForm={true}
                        register={register}
                        value={watch("payment_method", userForm != null ? userForm.payment_method : user?.Payment_Method == null ? "" : user?.Payment_Method)}
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
                        value={watch("birthDate", userForm != null ? userForm.birthDate : cutSliceDate(String(user!.Birth_Date)))}
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
                        value={watch("admission", userForm != null ? userForm.admission : cutSliceDate(String(user!.Admission)))}
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
                        value={watch("dismissal", userForm != null ? userForm.dismissal : (user!.Dismissal != null ? cutSliceDate(String(user!.Dismissal)) : ""))}
                    />
                </FieldForm>

                <FieldForm
                    label="contract"
                    name="Fim do contrato"
                    error={errors.contract && " "}
                >
                    <Input
                        type="date"
                        id="contract"
                        name="contract"
                        required
                        styles={`
                        ${errors.contract
                                ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                : ""
                            }
                        `}
                        onForm={true}
                        register={register}
                        value={watch("contract", userForm != null ? userForm.contract : cutSliceDate(String(user?.Contract)))}
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
                        value={watch("position", userForm != null ? userForm.position : user!.Position)}
                    />
                </FieldForm>

                <FieldForm
                    label="id_turn"
                    name="Nível de permissão"
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
                        value={watch("id_turn", userForm != null ? userForm.id_turn : String(user!.Id_User_Turn))}
                    >
                        {usersTurns.map((turn) => {
                            return (
                                <Option
                                    key={turn.Id_Turn}
                                    value={turn.Id_Turn}
                                    selectedValue={userForm != null ? String(userForm.id_turn) : String(user!.Id_User_Turn)}
                                    firstValue={turn.Turn}
                                />
                            )
                        })}
                    </SelectField>
                </FieldForm>

                <FieldForm
                    label="registration"
                    name="Mátricula"
                    error={errors.registration && " "}
                >
                    <Input
                        type="text"
                        id="registration"
                        name="registration"
                        placeholder="Mátricula"
                        required={true}
                        maxlength={80}
                        styles={`
                        ${errors.registration
                                ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                : ""
                            }
                        `}
                        onForm={true}
                        register={register}
                        value={watch("registration", userForm != null ? userForm.registration : user?.Registration)}
                    />
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
                        value={watch("permission", userForm != null ? userForm.permission : String(user!.Permission_Level_Id))}
                    >
                        <Option
                            value=""
                            selectedValue={userForm != null ? String(userForm.permission) : String(user!.Permission_Level_Id)}
                            firstValue="Permissão"
                        />

                        {userRoles.map((role) => {
                            return (
                                <Option
                                    key={role.Id_Permissions}
                                    value={role.Id_Permissions}
                                    selectedValue={userForm != null ? String(userForm.permission) : String(user!.Permission_Level_Id)}
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
                        value={watch("maritalStatus", userForm != null ? userForm.maritalStatus : String(user!.Marital_Status_Id))}
                    >
                        <Option
                            value=""
                            selectedValue={userForm != null ? String(userForm.maritalStatus) : String(user!.Marital_Status_Id)}
                            firstValue="Status Civil"
                        />

                        {userMaritalStatus.map((item) => {
                            return (
                                <Option
                                    key={item.Id_Marital}
                                    value={item.Id_Marital}
                                    selectedValue={userForm != null ? String(userForm.maritalStatus) : String(user!.Marital_Status_Id)}
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
                        value={watch("educationStatus", userForm != null ? userForm.educationStatus : String(user?.Education_Level_Id))}
                    >
                        <Option
                            value=""
                            selectedValue={userForm != null ? String(userForm.educationStatus) : String(user?.Education_Level_Id)}
                            firstValue="Educação"
                        />

                        {userEducation.map((item) => {
                            return (
                                <Option
                                    key={item.Id_Education}
                                    value={item.Id_Education}
                                    selectedValue={userForm != null ? String(userForm.educationStatus) : String(user?.Education_Level_Id)}
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
                        {creditors.length > 0 && creditors.map((company: ICreditors) => {
                            return (
                                <Option
                                    key={company.Id_Creditor}
                                    value={company.Id_Creditor}
                                    firstValue={company.Creditor}
                                    selectedValue={userForm != null ? userForm.id_credor : String(user!.id_credor)}
                                />
                            )
                        })}
                    </SelectField>
                </FieldForm>

                <FieldForm
                    label="is_responsable_technical"
                    name="É da equipe de responsáveis técnicos?"
                    error={errors.is_responsable_technical && " "}
                    obrigatory={true}
                    styles="text-sm pt-[6.8px]"
                >
                    <SelectField
                        id="is_responsable_technical"
                        name="is_responsable_technical"
                        required
                        styles={`${errors.is_responsable_technical
                            ? "border-[--label-color-error] dark:border-[--label-color-error]"
                            : ""
                            }`}
                        onForm={true}
                        register={register}
                        value={watch("is_responsable_technical", userForm != null ? userForm.is_responsable : user?.Is_Responsable_Technical == true ? "1" : "0")}
                        OnChange={((event: ChangeEvent<HTMLSelectElement>) => handleIsResponsableTechnical(event.target.value))}
                    >
                        <Option
                            value={"0"}
                            firstValue="Não"
                            selectedValue={userForm != null ? userForm.is_responsable_technical : user?.Is_Responsable_Technical == true ? "1" : "0"}
                        />
                        <Option
                            value={"1"}
                            firstValue="Sim"
                            selectedValue={userForm != null ? userForm.is_responsable_technical : user?.Is_Responsable_Technical == true ? "1" : "0"}
                        />
                    </SelectField>

                </FieldForm>

                {getValues("id_responsable_technical") != "disabled" && (
                    <FieldForm
                        label="id_responsable_technical"
                        name="Responsável técnico"
                        error={errors.id_responsable_technical && " "}
                        obrigatory={true}
                    >
                        <SelectField
                            id="id_responsable_technical"
                            name="id_responsable_technical"
                            required
                            styles={`${errors.id_responsable_technical
                                ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                : ""
                                }`}
                            onForm={true}
                            register={register}
                            value={watch("id_responsable_technical", userForm != null ? String(userForm.id_responsable_technical) : String(user?.Id_Responsable_Technical))}
                        >
                            <Option
                                value={"0"}
                                firstValue="Não possui responsável técnico"
                                selectedValue={userForm != null ? String(userForm.id_responsable_technical) : String(user!.Id_Responsable_Technical)}
                            />

                            {usersResponsablesTechnicals.map((userResponsable, index) => {

                                return (
                                    <Option 
                                        key={index}
                                        value={String(userResponsable.Id_User)}
                                        firstValue={userResponsable.Name}
                                        selectedValue={userForm != null ? String(userForm.id_responsable_technical) : String(user!.Id_Responsable_Technical)}
                                    />
                                )

                            })}
                        </SelectField>

                    </FieldForm>
                )}

                <FieldForm
                    label="is_responsable"
                    name="É da equipe de responsáveis do curso?"
                    error={errors.is_responsable && " "}
                    obrigatory={true}
                    styles="text-sm pt-[6.8px]"
                >
                    <SelectField
                        id="is_responsable"
                        name="is_responsable"
                        required
                        styles={`${errors.is_responsable
                            ? "border-[--label-color-error] dark:border-[--label-color-error]"
                            : ""
                            }`}
                        onForm={true}
                        register={register}
                        value={watch("is_responsable", userForm != null ? userForm.is_responsable : user?.Is_Responsable == true ? "1" : "0")}
                        OnChange={((event: ChangeEvent<HTMLSelectElement>) => handleIsResponsable(event.target.value))}
                    >
                        <Option
                            value={"0"}
                            firstValue="Não"
                            selectedValue={userForm != null ? userForm.is_responsable : user?.Is_Responsable == true ? "1" : "0"}
                        />
                        <Option
                            value={"1"}
                            firstValue="Sim"
                            selectedValue={userForm != null ? userForm.is_responsable : user?.Is_Responsable == true ? "1" : "0"}
                        />
                    </SelectField>

                </FieldForm>

                {getValues("id_responsable") != "disabled" && (
                    <FieldForm
                        label="id_responsable"
                        name="Responsável do curso"
                        error={errors.id_responsable && " "}
                        obrigatory={true}
                    >
                        <SelectField
                            id="id_responsable"
                            name="id_responsable"
                            required
                            styles={`${errors.id_responsable
                                ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                : ""
                                }`}
                            onForm={true}
                            register={register}
                            value={watch("id_responsable", userForm != null ? userForm.id_responsable : String(user?.Id_Responsable))}
                        >
                            <Option
                                value={"0"}
                                firstValue="Responsável do operador"
                                selectedValue={userForm != null ? userForm.id_responsable : String(user!.Id_Responsable)}
                            />

                            {usersResponsables.map((userResponsable, index) => {
                                
                                return (
                                    <Option 
                                        key={index}
                                        value={userResponsable.Id_User}
                                        firstValue={userResponsable.Name}
                                        selectedValue={userForm != null ? userForm.id_responsable : String(user!.Id_Responsable)}
                                    />
                                )

                            })}
                        </SelectField>

                    </FieldForm>
                )}

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
                                src={`${BACKEND_DOMAIN}/get-image-users/${user?.UserName}.jpg`}
                                alt="Foto Default"
                                width={100}
                                height={100}
                                priority
                            />
                        )}
                    </div>
                </FieldForm>
            </div>

            <div className="ml-4 mb-6">
                <button
                    type="button"
                    onClick={() => changeUserStatus && changeUserStatus(!userStatus)}
                    className={`
                    border-2 p-2 px-4 rounded-md duration-150
                    font-semibold hover:text-white
                
                    ${userStatus
                            ? `hover:bg-blue-400 border-blue-400`
                            : ` hover:bg-red-400 border-red-400`
                        }
                `}
                >
                    {userStatus ? "Habilitado" : "Desabilitado"}
                </button>
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
