import { verifyUserToken } from "@/api/generics/verifyToken";
import { createCreditor } from "@/api/register/creditor/createCreditor";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Input } from "@/components/Input";
import { InputWithMask } from "@/components/InputWithMask";
import { createCreditorModalData, createCreditorModalSchema, ICreateCreditorModal } from "@/interfaces/register/creditor/CreateCreditorModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import { ButtonTeamAppendStatus } from "./ButtonTeamAppendStatus";

export function CreateCreditorModal({ CreditorsUnique }: ICreateCreditorModal) {
    const router = useRouter()

    const [result, setResult] = useState<"Created" | false>(false)
    const [saveForm, setSaveForm] = useState(false)
    const [disableButton, setDisableButton] = useState(false)

    const { control, register, handleSubmit, watch, formState: { errors }, reset } = useForm<createCreditorModalData>({
        defaultValues: {
            creditorsUniqueArray: useMemo(() => {
                return CreditorsUnique.map((item) => {
                    return { idCreditorUnique: item.Id_Unique_Creditor, creditorName: item.Creditor, appendToTeam: false }
                })
            }, [CreditorsUnique])
        },
        resolver: zodResolver(createCreditorModalSchema)
    })

    const { fields, update } = useFieldArray({ control, name: "creditorsUniqueArray" })

    const dialog = useRef<HTMLDialogElement>(null)

    function changeStatusAppendToTeam(status: boolean, index: number) {
        const object = fields[index]

        object.appendToTeam = !status

        update(index, object)
    }

    async function handleCreateCreditor(data: FieldValues) {

        const isValidToken = await verifyUserToken()

        if (!isValidToken) {
            return router.push("/login")
        }

        const creditorsUniqueList: { idCreditorUnique: number, appendToTeam: boolean }[] = []

        for (let i = 0; i < data.creditorsUniqueArray.length; i++) {
            const item = data.creditorsUniqueArray[i]

            if (!item.appendToTeam) {
                continue
            }

            creditorsUniqueList.push({
                idCreditorUnique: item.idCreditorUnique,
                appendToTeam: item.appendToTeam
            })
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
                idCreditor: Number(data.idCreditor)
            },
            creditorsUniqueList
        }

        const cCreateCreditor: { message: "Created" } = await createCreditor<typeof object>(object)

        setResult(cCreateCreditor.message)
        setSaveForm(true)

        setTimeout(() => {
            setSaveForm(false)
            setResult(false)
            setDisableButton(false)
        }, 3000);
    }

    return (
        <>
            <dialog
                id="createCreditorModal"
                className={`w-3/4 max-lg:w-3/4 p-2 rounded-lg dark:bg-zinc-800 max-sm:w-full`}
                ref={dialog}
            >
                <h2
                    className={`text-2xl font-bold text-center text-slate-500 my-2 mb-8 dark:text-slate-100`}
                >
                    Crie a Equipe
                </h2>

                <form
                    onSubmit={handleSubmit(handleCreateCreditor)}
                >
                    <div className={`grid grid-cols-3 gap-2 mb-6`}>
                        <FieldForm
                            label="idCreditor"
                            name="Id da equipe:"
                            error={errors.idCreditor && " "}
                        >
                            <Input
                                type="text"
                                id="idCreditor"
                                name="idCreditor"
                                placeholder="Digite o Id"
                                maxlength={150}
                                required
                                onForm={true}
                                value={watch("idCreditor")}
                                register={register}
                                styles={`
                                    ${errors.idCreditor ? "border-[--label-color-error] dark:border-[--label-color-error]" : ""}
                                `}
                            />
                        </FieldForm>

                        <FieldForm
                            label="creditor"
                            name="Nome da equipe:"
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
                            error={errors.identifier && " "}
                        >
                            <Input
                                type="number"
                                id="identifier"
                                name="identifier"
                                placeholder="Identificador tem que ser 1"
                                min={0}
                                required
                                onForm={true}
                                value={watch("identifier")}
                                register={register}
                                styles={`
                                    ${errors.identifier ? "border-[--label-color-error] dark:border-[label-color-error]" : ""}
                                `}
                            />
                        </FieldForm>

                        <FieldForm
                            label="returns"
                            name="Número 0800:"
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
                            error={errors.meta && ""}
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
                            error={errors.operatorsNumber && ""}
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
                                    ${errors.operatorsNumber ? "border-[label-color-error] dark:-[label-color-error]" : ""}
                                `}
                            />
                        </FieldForm>

                        <FieldForm
                            label="workingDays"
                            name="Dias trabalhados:"
                            error={errors.workingDays && ""}
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
                                    ${errors.workingDays ? "border-[label-color-error] dark:[label-color-error]" : ""}
                                `}
                            />
                        </FieldForm>
                    </div>

                    <h2 className="font-bold text-[--text-label-login] dark:text-slate-100"><span className="text-red-500 font-bold mr-1">*</span>Selecione um ou mais credores para sua equipe:</h2>
                    <div className="w-[400px] h-[250px] overflow-y-scroll">
                        <div className="flex flex-col gap-4 py-10 px-2">
                            {fields.map((creditorUnique, index) => {
                                return (
                                    <div
                                        key={creditorUnique.id}
                                        className="flex justify-between items-center"
                                    >
                                        <p className={`dark:text-slate-100`}>
                                            {creditorUnique.creditorName}
                                        </p>          
                                        
                                        <ButtonTeamAppendStatus 
                                            status={creditorUnique.appendToTeam} 
                                            OnClick={() => changeStatusAppendToTeam(creditorUnique.appendToTeam, index)}
                                        />
                                        
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className={`flex justify-end gap-2`}>
                        <div className={`flex justify-between items-center mr-2 gap-2`}>
                            {saveForm &&
                                <p className={result == "Created" ? `font-bold text-green-500` : `font-bold text-red-500`}>{result == "Created" ? "Dados cadastrados!" : "Erro ao cadastrar os dados"}</p>
                            }

                            <Button
                                type="button"
                                text="Fechar"
                                styles={`w-fit h-10 border-red-400 bg-red-400 text-white hover:bg-red-500 focus:bg-red-400 text-md px-2 py-2 hover:border-red-500`}
                                OnClick={() => { reset(); dialog.current?.close() }}
                            />

                            <Button
                                name="answers"
                                type="submit"
                                text="Cadastrar"
                                styles={`w-fit h-10 text-md dark:bg-blue-500 dark:text-white dark:hover:bg-blue-600 dark:hover:border-blue-600`}
                                disabled={disableButton}
                            />
                        </div>
                    </div>
                </form>
            </dialog>

            <Button
                text="Criar equipe"
                type="button"
                styles={`w-fit text-md p-2 ml-2 border border-green-500 rounded-md bg-transparent duration-200 text-green-500 hover:bg-green-500 dark:bg-transparent dark:hover:bg-green-500 focus:bg-transparent focus:text-white-500`}
                OnClick={() => dialog.current?.showModal()}
            />
        </>

    )
}