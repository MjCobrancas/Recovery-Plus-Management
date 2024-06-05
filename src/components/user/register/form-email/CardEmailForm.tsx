import { ButtonError } from "@/components/ButtonError";
import { ButtonSave } from "@/components/ButtonSave";
import { FieldForm } from "@/components/FieldForm";
import { Input } from "@/components/Input";
import { IFormEmailCardProps, createFormEmailData, createFormEmailSchema } from "@/interfaces/user/register/FormEmail";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";

export function CardEmailForm({ index, item, removeUserEmail, resetEmail, saveEmail, changeEmailStatus, id }: IFormEmailCardProps) {
    const { register, handleSubmit, clearErrors, watch, formState: { errors } } = useForm<createFormEmailData>({
        resolver: zodResolver(createFormEmailSchema)
    })

    function handleChangeEmailStatus(index: number) {
        if (changeEmailStatus) {
            changeEmailStatus(index)
        }
    }

    function saveEmailForm(data: FieldValues) {
        const objectValues = {
            id: id ? id : "",
            userEmail: String(data.userEmail),
            saved: true,
            status: data.status == "" ? "" : (data.status == "true" ? true : false)
        }

        saveEmail(index, objectValues)
    }

    function resetFormErrors() {
        setTimeout(() => {
            clearErrors()
        }, 5000);
    }

    return (
        <form key={index} onSubmit={handleSubmit(saveEmailForm)}>
            <input {...register("status")} value={item.status == true || item.status == false ? String(item.status) : ""} className="sr-only"/>
            <div className="grid tablet:grid-cols-2 laptop:grid-cols-2 desktop:grid-cols-3 gap-4 py-4 pl-2 ">
                <FieldForm
                    label={"userEmail" + index}
                    name="Email"
                    error={errors.userEmail && " "}
                >
                    <Input
                        onInput={() => resetEmail(index)}
                        value={watch("userEmail", item.userEmail != "" ? item.userEmail : "")}
                        type="text"
                        id={"userEmail" + index}
                        name="userEmail"
                        placeholder="abc@gmail.com"
                        required
                        styles={`${errors.userEmail
                                ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                : ""
                            }
                        `}
                        onForm={true}
                        register={register}
                    />
                </FieldForm>
            </div>

            <div className={`flex items-center gap-2 mb-4 pl-2`}>
                {typeof item.status == "boolean" ? (
                    <button
                        type="button"
                        onClick={() => handleChangeEmailStatus(index)}
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
                    <ButtonError type="button" name="Remover" onClick={() => removeUserEmail(index)} />
                )}
                {item.saved ? (
                    <ButtonSave
                        OnClick={() => resetFormErrors()}
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