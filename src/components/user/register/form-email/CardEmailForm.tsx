import { ButtonError } from "@/components/ButtonError";
import { ButtonSave } from "@/components/ButtonSave";
import { FieldForm } from "@/components/FieldForm";
import { Input } from "@/components/Input";
import { IFormEmailCardProps, createFormEmailData, createFormEmailSchema } from "@/interfaces/user/register/FormEmail";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";

export function CardEmailForm({ index, item, removeUserEmail, resetEmail, saveEmail,  }: IFormEmailCardProps) {
    const { register, handleSubmit, clearErrors, watch, formState: { errors } } = useForm<createFormEmailData>({
        resolver: zodResolver(createFormEmailSchema)
    })

    function saveEmailForm(data: FieldValues) {
        const objectValues = {
            userEmail: String(data.userEmail),
            saved: true
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
                        styles={`${
                                errors.userEmail
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
                <ButtonError type="button" name="Remover" onClick={() => removeUserEmail(index)} />
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