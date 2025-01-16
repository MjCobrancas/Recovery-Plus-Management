import { ButtonError } from "@/components/ButtonError";
import { ButtonSave } from "@/components/ButtonSave";
import { FieldForm } from "@/components/FieldForm";
import { Input } from "@/components/Input";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { IFormContactCardFormProps, createFormContactsData, createFormContactsSchema } from "@/interfaces/user/register/FormContacts";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";

export function CardContactForm({ id, item, index, removeContact, resetContact, saveContact, changeContactsStatus }: IFormContactCardFormProps) {
    const { register, handleSubmit, watch, formState: { errors }, setError } = useForm<createFormContactsData>({
        resolver: zodResolver(createFormContactsSchema)
    })

    function handleChangeContactsStatus(index: number) {
        if (changeContactsStatus) {
            changeContactsStatus(index)
        }
    }

    function saveContactsForm(data: FieldValues) {
        let foundError = false
        for (let i = 0; i < data.length; i++) {
            if (data.contact_owner.trim().length <= 0) {

                setError(`contact_owner`, {
                    type: "Invalid contact_owner"
                })

                foundError = true
            }
        }

        if (foundError) {
            return
        }

        const objectValues = {
            id: id ? id : "",
            contact_owner: String(data.contact_owner),
            ddd: String(data.ddd),
            phone: String(data.phone),
            type: String(data.type),
            saved: true,
            status: data.status == "" ? "" : (data.status == "true" ? true : false)
        }

        saveContact(index, objectValues)
    }

    return (
        <form onSubmit={handleSubmit(saveContactsForm)}>
            <input {...register("status")} value={item.status == true || item.status == false ? String(item.status) : ""} className="sr-only"/>
            <div
                className={`grid tablet:grid-cols-2 laptop:grid-cols-2 desktop:grid-cols-4 gap-4 py-4 pl-2 `}
            >
                <FieldForm
                    label={"contact_owner" + index}
                    name="Dono do contato"
                    error={errors.contact_owner && " "}
                >
                    <Input
                        onInput={() => resetContact(index)}
                        value={watch("contact_owner", item.contact_owner != "" ? item.contact_owner : "")}
                        type="text"
                        id={"contact_owner" + index}
                        name="contact_owner"
                        required
                        placeholder="Dono do contato"
                        onForm={true}
                        register={register}
                        styles={`
                            ${errors.contact_owner}
                            ? "border-[--label-color-error] dark:border-[--label-color-error]"
                            : ""
                        }`}
                    />
                </FieldForm>
                <FieldForm
                    label={"ddd" + index}
                    name="DDD"
                    error={errors.ddd && " "}
                >
                    <Input
                        onInput={() => resetContact(index)}
                        value={watch("ddd", item.ddd != "" ? item.ddd : "")}
                        type="number"
                        id={"ddd" + index}
                        name="ddd"
                        required
                        placeholder="DDD"
                        onForm={true}
                        register={register}
                        styles={`
                            ${errors.ddd}
                            ? "border-[--label-color-error] dark:border-[--label-color-error]"
                            : ""
                        }`}
                    />
                </FieldForm>

                <FieldForm
                    label={"phone" + index}
                    name="Telefone"
                    error={errors.phone && " "}
                >
                    <Input
                        onInput={() => resetContact(index)}
                        value={watch("phone", item.phone != "" ? item.phone : "")}
                        type="number"
                        id={"phone" + index}
                        name="phone"
                        required
                        placeholder="N° telefone"
                        onForm={true}
                        register={register}
                        styles={`
                            ${errors.phone
                                ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                : ""
                            }`}
                    />
                </FieldForm>

                <FieldForm
                    label={"type" + index}
                    name="Tipo de telefone"
                    error={errors.type && " "}
                >
                    <SelectField
                        name="type"
                        id={"type" + index}
                        required
                        value={watch("type", item.type != "" ? item.type : "")}
                        styles={`
                            ${errors.type
                                ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                : ""
                            }
                        `}
                        onForm={true}
                        register={register}
                        OnChange={() => resetContact(index)}
                    >
                        <Option
                            value=""
                            firstValue="Tipo de telefone"
                        />

                        <Option
                            value="Residencial"
                            selectedValue={item.type}
                            firstValue="Residencial"
                        />

                        <Option
                            value="Pessoal"
                            selectedValue={item.type}
                            firstValue="Pessoal"
                        />
                    </SelectField>
                </FieldForm>
            </div>

            <div className={`flex items-center gap-2 mb-4 pl-2`}>
                {typeof item.status == "boolean" ? (
                    <button
                        type="button"
                        onClick={() => handleChangeContactsStatus(index)}
                        className={`
                        border-2 p-2 px-4 rounded-md duration-150
                        font-semibold hover:text-white
                    
                        ${item.status
                                ? `hover:bg-blue-400 border-blue-400`
                                : ` hover:bg-red-400 border-red-400`
                            }
                    `}
                    >
                        {item.status ? "Habilitado" : "Desabilitado"}
                    </button>
                ) : (
                    <ButtonError type="button" name="Remover" onClick={() => removeContact(index)} />
                )}

                {item.saved ? (
                    <ButtonSave
                        styles="bg-green-500 text-white border-green-500"
                        name={"Salvo!"}
                        type="button"
                    />
                ) : (
                    <ButtonSave
                        name={"Salvar"}
                    />
                )}
            </div>
        </form>
    )

}