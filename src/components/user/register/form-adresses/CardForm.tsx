import { validCEP } from "@/api/external/validCep";
import { ButtonError } from "@/components/ButtonError";
import { ButtonSave } from "@/components/ButtonSave";
import { FieldForm } from "@/components/FieldForm";
import { Input } from "@/components/Input";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { CepValues } from "@/interfaces/Generics";
import { IFormAdressesCard, createFormAdressesData, createFormAdressesSchema } from "@/interfaces/user/register/FormAdresses";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent } from "react";
import { FieldValues, useForm } from "react-hook-form";

export function CardForm({ item, removeAddress, index, saveAddress, resetSaveAddress }: IFormAdressesCard) {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<createFormAdressesData>({
        resolver: zodResolver(createFormAdressesSchema)
    })

    async function getCepFromApi(cep: string) {
        const cepNumber = cep?.replace("-", "")

        if (cepNumber.length == 8) {
            const cepIsValid = await validCEP(Number(cepNumber))

            const { bairro, localidade, uf, logradouro, cep } = cepIsValid.value as CepValues

            setValue("cep", cep?.replace("-", "") || "")
            setValue("neighborhood", bairro)
            setValue("city", localidade)
            setValue("states", uf)
            setValue("address", logradouro)

            return
        }

        setValue("neighborhood", "")
        setValue("city", "")
        setValue("states", "")
        setValue("address", "")
    }

    async function handleResetSaveAddress(index: number, cep: string) {
        resetSaveAddress(index)

        await getCepFromApi(cep)
    }

    function saveAddressForm(data: FieldValues) {
        const objectValues = {
            address: data.address,
            address2: data.address2,
            city: data.city,
            country: data.country,
            id: Math.random(),
            neighborhood: data.neighborhood,
            postalCode: data.cep,
            saved: true,
            states: data.states
        }

        saveAddress(index, objectValues)
    }

    return (
        <form onSubmit={handleSubmit(saveAddressForm)}>
            <div className={`grid tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-4 py-4 pl-2`}>
                <FieldForm
                    label={"postalCode" + item.id}
                    name="CEP"
                    error={errors.cep && " "}
                >
                    <Input
                        onInput={(event: ChangeEvent<HTMLInputElement>) => handleResetSaveAddress(index, event.target.value)}
                        type="number"
                        id={"postalCode" + item.id}
                        name="cep"
                        placeholder="CEP"
                        required
                        styles={`${
                                errors.cep
                                ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                : ""
                            } 
                        `}

                        value={watch("cep", item.postalCode != "" ? item.postalCode : "")}
                        onForm={true}
                        register={register}

                    />
                </FieldForm>

                <FieldForm
                    label={"address" + item.id}
                    name="Endereço"
                    error={errors.address && " "}
                >
                    <Input
                        onInput={() => resetSaveAddress(index)}
                        value={watch("address", item.address != "" ? item.address : "")}
                        type="text"
                        id={"address" + item.id}
                        name="address"
                        placeholder="Endereço"
                        maxlength={50}
                        required
                        styles={`${
                                errors.address
                                ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                : ""
                            }
                        `}
                        onForm={true}
                        register={register}
                    />
                </FieldForm>

                <FieldForm
                    label={"neighborhood" + item.id}
                    name="Bairro"
                    error={errors.neighborhood && " "}
                >
                    <Input
                        onInput={() => resetSaveAddress(index)}
                        value={watch("neighborhood", item.neighborhood != "" ? item.neighborhood : "")}
                        type="text"
                        id={"neighborhood" + item.id}
                        name="neighborhood"
                        placeholder="Bairo"
                        maxlength={50}
                        required
                        styles={`${
                                errors.neighborhood
                                ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                : ""
                            }
                        `}
                        onForm={true}
                        register={register}
                    />
                </FieldForm>

                <FieldForm
                    label={"address2" + item.id}
                    name="Complemento"
                    error={errors.address2 && " "}
                    obrigatory={false}
                >
                    <Input
                        onInput={() => resetSaveAddress(index)}
                        value={watch("address2", item.address2 != "" ? item.address2 : "")}
                        type="string"
                        id={"address2" + item.id}
                        name="address2"
                        placeholder="Complemento"
                        maxlength={50}
                        styles={`${
                                errors.address2
                                ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                : ""
                            }
                        `}
                        onForm={true}
                        register={register}
                        required={false}
                    />
                </FieldForm>

                <FieldForm
                    label={"city" + item.id}
                    name="Cidade"
                    error={errors.city && " "}
                >
                    <Input
                        onInput={() => resetSaveAddress(index)}
                        value={watch("city", item.city != "" ? item.city : "")}
                        type="text"
                        id={"city" + item.id}
                        name="city"
                        placeholder="Cidade"
                        maxlength={60}
                        required
                        styles={`${
                                errors.city
                                ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                : ""
                            }
                        `}
                        onForm={true}
                        register={register}

                    />
                </FieldForm>

                <FieldForm
                    label={"states" + item.id}
                    name="Estado"
                    error={errors.states && " "}
                >
                    <SelectField
                        OnChange={() => resetSaveAddress(index)}
                        name="states"
                        id={"states" + item.id}
                        required
                        styles={`${
                                errors.states
                                ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                : ""
                            }
                        `}
                        onForm={true}
                        register={register}
                    >
                        <Option
                            value=""
                            selectedValue={item.states}
                            firstValue="UF"
                        />
                        <Option
                            value="AC"
                            selectedValue={item.states}
                        />
                        <Option
                            value="AL"
                            selectedValue={item.states}
                        />
                        <Option
                            value="AP"
                            selectedValue={item.states}
                        />
                        <Option
                            value="AM"
                            selectedValue={item.states}
                        />
                        <Option
                            value="BA"
                            selectedValue={item.states}
                        />
                        <Option
                            value="CE"
                            selectedValue={item.states}
                        />
                        <Option
                            value="DF"
                            selectedValue={item.states}
                        />
                        <Option
                            value="ES"
                            selectedValue={item.states}
                        />
                        <Option
                            value="GO"
                            selectedValue={item.states}
                        />
                        <Option
                            value="MA"
                            selectedValue={item.states}
                        />
                        <Option
                            value="MT"
                            selectedValue={item.states}
                        />
                        <Option
                            value="MS"
                            selectedValue={item.states}
                        />
                        <Option
                            value="MG"
                            selectedValue={item.states}
                        />
                        <Option
                            value="PA"
                            selectedValue={item.states}
                        />
                        <Option
                            value="PB"
                            selectedValue={item.states}
                        />
                        <Option
                            value="PR"
                            selectedValue={item.states}
                        />
                        <Option
                            value="PE"
                            selectedValue={item.states}
                        />
                        <Option
                            value="PI"
                            selectedValue={item.states}
                        />
                        <Option
                            value="RJ"
                            selectedValue={item.states}
                        />
                        <Option
                            value="RN"
                            selectedValue={item.states}
                        />
                        <Option
                            value="RS"
                            selectedValue={item.states}
                        />
                        <Option
                            value="RO"
                            selectedValue={item.states}
                        />
                        <Option
                            value="RR"
                            selectedValue={item.states}
                        />
                        <Option
                            value="SC"
                            selectedValue={item.states}
                        />
                        <Option
                            value="SP"
                            selectedValue={item.states}
                        />
                        <Option
                            value="SE"
                            selectedValue={item.states}
                        />
                        <Option
                            value="TO"
                            selectedValue={item.states}
                        />
                    </SelectField>
                </FieldForm>

                <FieldForm
                    label={"country" + item.id}
                    name="País"
                    error={errors.country && " "}
                >
                    <Input
                        onInput={() => resetSaveAddress(index)}
                        value={watch("country", item.country != "" ? item.country : "")}
                        type="text"
                        id={"country" + item.id}
                        name="country"
                        placeholder="País"
                        maxlength={60}
                        required
                        styles={`${
                                errors.country
                                ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                : ""
                            }
                        `}
                        onForm={true}
                        register={register}
                    />
                </FieldForm>

            </div>

            <div className={`flex items-center gap-2 mb-4 pl-2 py-2`}>
                <ButtonError type="button" name="Remover" onClick={() => removeAddress(index)} />

                {item.saved ? (
                    <ButtonSave
                        type="button"
                        styles="bg-green-500 text-white border-green-500"
                        name="Salvo!"
                    />
                ) : (
                    <ButtonSave
                        name="Salvar"
                    />
                )}
            </div>
        </form>
    )

}