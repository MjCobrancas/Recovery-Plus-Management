'use client'

import { Button } from "@/components/Button"
import { FieldForm } from "@/components/FieldForm"
import { Option } from "@/components/Option"
import { SelectField } from "@/components/SelectField"
import { IContainerScheduleProps } from "@/interfaces/register/agendas/IContainerSchedule"
import { ICreditorRelationFilterAgings, IGetRelationCreditorsWithOcorrenceData } from "@/interfaces/register/agendas/IGetRelation"
import { useState } from "react"
import { CreateScheduleForm } from "./CreateScheduleForm"
import { IResultDefaultResponse } from "@/interfaces/Generics"
import { Toaster } from "react-hot-toast"
import { EditScheduleForm } from "./EditScheduleForm"
import { getCreditorRelationToCreateSchedule } from "@/api/register/agendas/getCreditorRelationCreateSchedule"
import { getCreditorRelationWithOcorrence } from "@/api/register/agendas/getCreditorRelationWithOcorrence"

export function ContainerSchedule({ creditors, ocorrences, agings }: IContainerScheduleProps) {

    const [idCreditor, setIdCreditor] = useState(creditors.length > 0 ? creditors[0].Id_Creditor : 0)
    const [errorCreditor, setErrorCreditor] = useState(false)
    const [errorOcorrences, setErrorOcorrences] = useState(false)
    const [formType, setFormType] = useState("")
    const [creditorRelationAgings, setCreditorRelationAgings] = useState<ICreditorRelationFilterAgings[]>([])
    const [editCreditorRelation, setEditCreditorRelation] = useState<IGetRelationCreditorsWithOcorrenceData[]>([])
    const [disableButtons, setDisableButtons] = useState(false)

    function handleSelectOptions() {
        const selectElement = document.getElementById('ocorrence') as HTMLSelectElement
        const selectedValues = Array.from(selectElement!.selectedOptions).map(option => Number(option.value))

        return selectedValues
    }

    function resetFormType() {
        setFormType("")
    }

    function disableAllButtons(value: boolean) {
        setDisableButtons(value)
    }

    async function handleCreateForm(formTypeValue: "create-form" | "edit-form") {
        const ocorrencesOptions = handleSelectOptions()
        let error = false
        setDisableButtons(true)
        
        if (idCreditor <= 0 || String(Number(idCreditor)) == "NaN") {
            setErrorCreditor(true)
            error = true

            setTimeout(() => {
                setErrorCreditor(false)
            }, 3000);
        }

        if (ocorrencesOptions.length == 0) {
            setErrorOcorrences(true)
            error = true

            setTimeout(() => {
                setDisableButtons(false)
                setErrorOcorrences(false)
            }, 3000);
        }

        for (let i = 0; i < ocorrencesOptions.length; i++) {
            const item = ocorrencesOptions[i]

            if (String(Number(item)) == "NaN") {
                setErrorOcorrences(true)
                error = true
                setTimeout(() => {
                    setDisableButtons(false)
                    setErrorOcorrences(false)
                }, 3000);
            }
            
        }

        if (error) {
            return
        }

        if (formTypeValue == "create-form") {
            const getRelation: IResultDefaultResponse<ICreditorRelationFilterAgings[] | null> = await getCreditorRelationToCreateSchedule(idCreditor, ocorrencesOptions)

            if (getRelation.data != null) {
                setCreditorRelationAgings(getRelation.data)
            }
            setDisableButtons(false)
        } else if (formTypeValue == "edit-form") {
            const getRelation: IResultDefaultResponse<IGetRelationCreditorsWithOcorrenceData[] | null> = await getCreditorRelationWithOcorrence(idCreditor, ocorrencesOptions)

            if (getRelation.data != null) {
                setEditCreditorRelation(getRelation.data)
            }
            setDisableButtons(false)
        }
 
        setFormType(formTypeValue)
    }

    return (
        <>
            <div className="pl-28 pr-24">
                <div className={`flex items-end gap-2`}>
                    <FieldForm 
                        label="creditor" 
                        name="Selecione um credor:"
                        error={errorCreditor ? "Inválido!" : ""}
                    >
                        <SelectField 
                            name="IdCreditor" 
                            id="creditor" 
                            required
                            OnChange={(event) => setIdCreditor(Number(event.target.value))}
                            styles={
                                errorCreditor
                                ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                : ""
                            }
                        >
                            {creditors.length > 0 ? creditors.map((creditor, index) => {
                                return (
                                    <Option
                                        key={index}
                                        value={creditor.Id_Creditor}
                                        firstValue={creditor.Creditor}
                                    />
                                )
                            }) : (
                                <Option
                                    value={"Nenhum credor encontrado"}
                                />
                            )}
                        </SelectField>
                    </FieldForm>

                    <FieldForm 
                        label="ocorrence" 
                        name="Selecione uma ou mais ocorrências:"
                        error={errorOcorrences ? " " : ""}
                    >
                        <SelectField
                            name="IdOcorrence"
                            id="ocorrence"
                            multiple
                            styles={`h-fit min-h-[10rem]
                                ${errorOcorrences
                                ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                : ""}`
                            }
                            required
                        >
                            {ocorrences.ocorrence.length > 0 ? ocorrences.ocorrence.map((ocorrence, index) => {
                                return (
                                    <Option
                                        key={index}
                                        value={ocorrence.Id_Ocorrence}
                                        firstValue={ocorrence.Ocorrence}
                                    />
                                )
                            }) : (
                                <Option
                                    value={"Nenhuma ocorrência encontrada"}
                                />
                            )}
                        </SelectField>
                    </FieldForm>

                    <div className={`flex max-w-xl h-12 gap-2`}>
                        <Button
                            type="button"
                            text="Editar"
                            disabled={disableButtons || creditors.length == 0 || ocorrences.ocorrence.length == 0}
                            styles={`w-18 text-md`}
                            OnClick={() => handleCreateForm("edit-form")}
                        />

                        <button
                            type="button"
                            disabled={disableButtons || creditors.length == 0 || ocorrences.ocorrence.length == 0}
                            onClick={() => handleCreateForm("create-form")}
                            className={`w-44 text-md font-bold duration-200 border rounded-md border-green-500 text-green-500 hover:bg-green-500 hover:text-white disabled:bg-slate-300 disabled:border-slate-400 disabled:cursor-not-allowed disabled:text-gray-100 dark:disabled:bg-slate-500 dark:disabled:text-gray-200`}
                        >
                            Configurar agendas
                        </button>
                    </div>

                </div>
                
                {formType == "create-form" && (
                    <CreateScheduleForm 
                        ocorrences={ocorrences}
                        schedules={creditorRelationAgings} 
                        disableAllButtons={disableAllButtons}
                        disableButtons={disableButtons}
                        resetFormType={resetFormType}
                    />
                )}

                {formType == "edit-form" && (
                    <EditScheduleForm 
                        ocorrences={ocorrences} 
                        schedules={editCreditorRelation} 
                        agings={agings} 
                        disableAllButtons={disableAllButtons}
                        disableButtons={disableButtons}
                        resetFormType={resetFormType}
                    />
                )}
            </div>

            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
        </>
    )
}