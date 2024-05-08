import { ButtonError } from "@/components/ButtonError";
import { ButtonSave } from "@/components/ButtonSave";
import { FieldForm } from "@/components/FieldForm";
import { Input } from "@/components/Input";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { IFormContactCardFormProps, createFormContactsData, createFormContactsSchema } from "@/interfaces/user/register/FormContacts";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";

export function CardContactForm({ item, index, removeContact, resetContact, saveContact }: IFormContactCardFormProps) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<createFormContactsData>({
        resolver: zodResolver(createFormContactsSchema)
    })

    function saveContactsForm(data: FieldValues) {
        const objectValues = {
            ddd: String(data.ddd),
            phone: String(data.phone),
            type: String(data.type),
            saved: true
        }

        saveContact(index, objectValues)
    }

    return (
        <form onSubmit={handleSubmit(saveContactsForm)}>
            <div
                className={`grid tablet:grid-cols-2 laptop:grid-cols-2 desktop:grid-cols-3 gap-4 py-4 pl-2 `}
            >
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
                            ${
                                errors.phone
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
                            ${
                                errors.type
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
                <ButtonError type="button" name="Remover" onClick={() => removeContact(index)} />
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