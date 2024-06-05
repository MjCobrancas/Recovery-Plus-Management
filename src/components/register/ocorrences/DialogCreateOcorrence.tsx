import { createOcorrence } from "@/api/register/ocorrences/createOcorrence";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Input } from "@/components/Input";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { IDialogCreateOcorrenceProps, IDialogForm, ocorrenceSchedule } from "@/interfaces/register/ocorrences/IDialogCreateOcorrence";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function DialogCreateOcorrence({ CloseDialogOcorrences, statusOcorrences }: IDialogCreateOcorrenceProps) {
    const [disableButton, setDisableButton] = useState(false)

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<IDialogForm>({
        resolver: zodResolver(ocorrenceSchedule)
    })

    async function createOcorrenceForm(data: FieldValues) {
        setDisableButton(true)

        const valuesObject = {
            ocorrences: [{
                ocorrence: data.ocorrenceName,
                cpc: Boolean(Number(data.cpc)),
                idOcorrence: null
            }],
            statusOcorrences: [
                {
                    idStatusOcorrence: Number(data.status)
                }
            ]
        }

        const ocorrenceResponse = await createOcorrence<typeof valuesObject>(valuesObject)

        setDisableButton(false)

        if (ocorrenceResponse.message != "Created") {
            toast.error("Houve um erro na criação de uma nova ocorrência, revise os valores e tente novamente", {
                duration: 5000
            })

            return
        }

        toast.success("Ocorrência cadastrada com sucesso!", {
            duration: 5000
        })
    }

    function handleCloseButton() {
        reset()
        CloseDialogOcorrences()
    }

    return (
        <>
            <h2
                className={`text-2xl font-bold text-center text-slate-500 my-2 mb-8 dark:text-slate-100`}
            >
                Crie uma ocorrência
            </h2>

            <form onSubmit={handleSubmit(createOcorrenceForm)}>
                <div className={`grid grid-cols-3 gap-2 mb-6`}>
                    <FieldForm label="newOcorrence" name="Nova ocorrência:" error={errors.ocorrenceName && "ocorrenceName"}>
                        <Input
                            value={watch("ocorrenceName")}
                            type="text"
                            id="newOcorrence"
                            name="ocorrenceName"
                            placeholder="Digite a nova ocorrência"
                            maxlength={200}
                            required
                            styles={`
                                ${errors.ocorrenceName
                                    ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                    : ""
                                }
                            `}
                            onForm={true}
                            register={register}
                        />
                    </FieldForm>

                    <FieldForm
                        label="cpc"
                        name="CPC:"
                        error={errors.cpc && "cpc"}
                    >
                        <SelectField
                            name="cpc"
                            id="cpc"
                            onForm={true}
                            register={register}
                            value={watch("cpc")}
                            required
                            styles={`
                                ${errors.cpc
                                    ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                    : ""
                                }
                            `}
                        >
                            <Option value={1} firstValue={"Sim"} />
                            <Option value={0} firstValue={"Não"} />
                        </SelectField>
                    </FieldForm>

                    <FieldForm
                        label="status"
                        name="Status:"
                        error={errors.status && "status"}
                    >
                        <SelectField
                            name="status"
                            id="status"
                            onForm={true}
                            register={register}
                            value={watch("status")}
                            styles={`
                                ${errors.status
                                    ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                    : ""
                                }
                            `}
                            required
                        >
                            {statusOcorrences.length > 0 && statusOcorrences.map((status, index) => {
                                return (
                                    <Option
                                        key={index}
                                        value={status.Id_Status_Ocorrence}
                                        firstValue={status.Status_Name}
                                    />
                                )
                            })}
                        </SelectField>
                    </FieldForm>
                </div>

                <div className={`flex justify-end gap-2`}>
                    <Button
                        type="button"
                        text="Fechar"
                        styles={`w-fit h-10 border-red-400 bg-red-400 text-white hover:bg-red-500
                        focus:bg-red-400 text-md px-2 py-2 hover:border-red-500
                        `}
                        OnClick={() => handleCloseButton()}
                        disabled={disableButton}
                    />

                    <Button
                        type="submit"
                        text="Cadastrar"
                        disabled={disableButton}
                        styles={`w-fit h-10 text-md dark:bg-blue-500 dark:text-white dark:hover:bg-blue-600 dark:hover:border-blue-600 disabled:bg-gray-400`}
                    />
                </div>
            </form>
        </>
    )
}