import { verifyUserToken } from "@/api/generics/verifyToken";
import { getCreditorById } from "@/api/register/creditor/getCreditorById";
import { updateCreditor } from "@/api/register/creditor/updateCreditor";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Input } from "@/components/Input";
import { InputWithMask } from "@/components/InputWithMask";
import { Option } from "@/components/Option";
import { IEditCreditorModal, IEditRequestCreditorModal, editCreditorModalData, editCreditorModalSchema } from "@/interfaces/register/creditor/EditCreditorModal";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

export function EditCreditorModal({ Id_Creditor }: IEditCreditorModal) {
    const router = useRouter()

    const { register, handleSubmit, watch, setValue, formState: { errors }, getValues } = useForm<editCreditorModalData>({
        resolver: zodResolver(editCreditorModalSchema)
    })

    const [isLoadingData, setIsLoadingData] = useState(false)

    const dialog = useRef<HTMLDialogElement>(null)

    const [result, setResult] = useState(false)
    const [saveForm, setSaveForm] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const [isCreditorActive, setIsCreditorActive] = useState(false)

    async function handleRequestEditCreditor() {
        dialog.current?.showModal()

        setIsLoadingData(true)

        const cGetCreditorById: IEditRequestCreditorModal | false = await getCreditorById(Number(Id_Creditor))

        setIsLoadingData(false)

        if (!cGetCreditorById) {
            return
        }

        setValue("creditor", cGetCreditorById.Creditor)
        setValue("identifier", String(cGetCreditorById.Identifier))
        setValue("returns", String(cGetCreditorById.Returns))
        setValue("meta", String(cGetCreditorById.Target))
        setValue("operatorsNumber", String(cGetCreditorById.Number_Operators))
        setValue("workingDays", String(cGetCreditorById.Working_Days))
        setValue("active", cGetCreditorById.Active)

        setIsCreditorActive(cGetCreditorById.Active)
    }

    async function handleUpdateCreditor(data: FieldValues) {

        const isValidToken = await verifyUserToken()

        if (!isValidToken) {
            return router.push('/login')
        }

        setDisableButton(true)

        const object = {
            creditors: {
                creditor: data.creditor,
                identifier: Number(data.identifier),
                returns: data.returns,
                target: Number(data.meta),
                numberOperators: Number(data.operatorsNumber),
                workingDays: Number(data.workingDays),
                idCreditor: Id_Creditor,
                active: data.active
            }
        }

        const cEditCreditor: { status: boolean, data: string | null } = await updateCreditor<typeof object>(object)

        setResult(cEditCreditor.status)
        setSaveForm(true)

        setTimeout(() => {
            setSaveForm(false)
            setResult(false)
            setDisableButton(false)
        }, 3000);
    }

    function handleIsCreditorActive(isCreditorActive: boolean) {
        setIsCreditorActive(!isCreditorActive)
        setValue("active", !isCreditorActive)
    }

    return (
        <>
            <Button
                type="button"
                name="editCreditor"
                value={String()}
                OnClick={() => handleRequestEditCreditor()}
                styles={`bg-blue-400 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-[6px] py-[0.8px] rounded-md hover:bg-blue-500 duration-200 w-[26px] h-[26px]`}
            >
                <FontAwesomeIcon icon={faMagnifyingGlass} fontSize={14} />
            </Button>

            <dialog
                id="editCreditor"
                className={`w-5/6 max-lg:w-3/4 h-fit p-2 rounded-lg dark:bg-zinc-800 max-sm:w-full`}
                ref={dialog}
            >
                {isLoadingData ? (
                    <p className="text-left font-bold dark:text-white">Carregando...</p>
                ) : (
                    <>
                        <h2
                            className={`text-2xl font-bold text-center text-slate-500 my-2 mb-8 dark:text-slate-100`}
                        >
                            Editar Equipe
                        </h2>

                        <form
                            onSubmit={handleSubmit(handleUpdateCreditor)}
                        >
                            <div className={`grid grid-cols-3 gap-2 mb-6`}>
                                <FieldForm
                                    label="creditor"
                                    name="Edite a equipe:"
                                    obrigatory={false}
                                    error={errors.creditor && " "}
                                >
                                    <Input
                                        type="text"
                                        id="creditor"
                                        name="creditor"
                                        placeholder="Digite o nome da equipe"
                                        maxlength={150}
                                        required
                                        onForm={true}
                                        value={watch("creditor")}
                                        register={register}
                                        styles={`
                                    ${errors.creditor ? "border-[label-color-error] dark:border-[label-color-error]" : ""}
                                `}
                                    />
                                </FieldForm>

                                <FieldForm
                                    label="identifier"
                                    name="Identificador:"
                                    obrigatory={false}
                                    error={errors.identifier && " "}
                                >
                                    <Input
                                        type="number"
                                        id="identifier"
                                        name="identifier"
                                        placeholder="Digite o identificador"
                                        min={0}
                                        onForm={true}
                                        value={watch("identifier")}
                                        register={register}
                                        required
                                        styles={` 
                                    ${errors.identifier ? "border-[label-color-error] dark:border-[label-color-error]" : ""}
                                `}
                                    />
                                </FieldForm>

                                <FieldForm
                                    label="returns"
                                    name="Número 0800"
                                    obrigatory={false}
                                    error={errors.returns && " "}
                                >
                                    <InputWithMask
                                        id="returns"
                                        name="returns"
                                        placeholder="Digite o número"
                                        required
                                        onForm={true}
                                        value={watch("returns")}
                                        register={register}
                                        styles={`
                                    ${errors.returns ? "border-[label-color-error] dark:border-[label-color-error]" : ""}
                                `}
                                    />
                                </FieldForm>

                                <FieldForm
                                    label="meta"
                                    name="Meta:"
                                    obrigatory={false}
                                    error={errors.meta && " "}
                                >
                                    <Input
                                        type="number"
                                        id="meta"
                                        name="meta"
                                        placeholder="Defina a meta"
                                        required
                                        onForm={true}
                                        value={watch("meta")}
                                        register={register}
                                        min={0}
                                        styles={` 
                                    ${errors.meta ? "border-[label-color-error] dark:border-[label-color-error]" : ""} 
                                `}
                                    />
                                </FieldForm>

                                <FieldForm
                                    label="operatorsNumber"
                                    name="Operadores:"
                                    obrigatory={false}
                                    error={errors.operatorsNumber && " "}
                                >
                                    <Input
                                        type="number"
                                        id="operatorsNumber"
                                        name="operatorsNumber"
                                        placeholder="Digite a quantidade de operadores"
                                        required
                                        onForm={true}
                                        value={watch("operatorsNumber")}
                                        register={register}
                                        min={0}
                                        styles={`
                                    ${errors.operatorsNumber ? "border-[label-color-error] dark:border-[label-color-error]" : ""}
                                `}
                                    />
                                </FieldForm>

                                <FieldForm
                                    label="workingDays"
                                    name="Dias Trabalhados"
                                    obrigatory={false}
                                    error={errors.workingDays && " "}
                                >
                                    <Input
                                        type="number"
                                        id="workingDays"
                                        name="workingDays"
                                        placeholder="Digite a quantidade de dias trabalhados"
                                        required
                                        onForm={true}
                                        value={watch("workingDays")}
                                        register={register}
                                        min={0}
                                        styles={`
                                    ${errors.workingDays ? "border-[label-color-error] dark:border-[label-color-error]" : ""}
                                `}
                                    />
                                </FieldForm>
                            </div>

                            {getValues("active") ? (
                                    <button
                                        type="button"
                                        className="w-1/2 bg-red-400 text-white font-bold px-2 py-2 mt-10 rounded-md hover:bg-red-500 duration-300"
                                        onClick={() => handleIsCreditorActive(isCreditorActive)}
                                    >
                                        Desativar equipe
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="w-1/2 bg-green-400 text-white font-bold px-2 py-2 mt-10 rounded-md hover:bg-green-500 duration-300"
                                        onClick={() => handleIsCreditorActive(isCreditorActive)}
                                    >
                                        Ativar equipe
                                    </button>
                                )}


                            <div className={`flex items-end justify-end gap-2 mt-[3rem]`}>
                                <div className={`flex justify-between items-center mr-2 gap-2`}>
                                    {saveForm &&
                                        <p className={result == true ? `font-bold text-green-500` : `font-bold text-red-500`}>{result == true ? "Dados atualizados com sucesso!" : "Erro ao atualizar os dados"}</p>
                                    }

                                    <Button
                                        type="reset"
                                        text="Fechar"
                                        styles={`w-fit text-md h-12 border-red-400 bg-red-400 text-white focus:bg-red-400 hover:bg-red-500 rounded-md `}
                                        OnClick={() => dialog.current?.close()}
                                    />

                                    <Button
                                        type="submit"
                                        text="Salvar Alterações"
                                        styles={`w-fit text-md h-12`}
                                        disabled={disableButton}
                                    />
                                </div>
                            </div>
                        </form>
                    </>
                )}
            </dialog>
        </>
    )
}