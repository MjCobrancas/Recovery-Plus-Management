import { getAllOperatorsInAbsenteeism } from "@/api/absenteeism/getAllOperatorsInAbsenteeism";
import { IFilterAbsenteeismData, IFilterAbsenteeismProps, IFilterAbsenteeismSchema } from "@/interfaces/absenteeism/IFilterAbsenteeism";
import { getDateToday } from "@/utils/GetDateToday";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "../Button";
import { FieldForm } from "../FieldForm";
import { Input } from "../Input";
import { Option } from "../Option";
import { SelectField } from "../SelectField";

export function FilterAbsenteeism({ creditors, operators, setValueOperatorsArray }: IFilterAbsenteeismProps) {

    const [didFilter, setDidFilter] = useState(false)
    const [disableAllButtons, setDisableAllButtons] = useState(false)

    const { register, watch, formState: { errors }, handleSubmit, reset } = useForm<IFilterAbsenteeismData>({
        defaultValues: {
            date_init: getDateToday(),
            date_end: getDateToday()
        },
        resolver: zodResolver(IFilterAbsenteeismSchema)
    })

    async function resetFilter() {
        reset()
        setDidFilter(false)

        const responseData = await getAllOperatorsInAbsenteeism()

        if (!responseData.status) {
            return
        }

        setValueOperatorsArray(responseData.data)
    }

    async function handleFilterAbsenteeism(data: FieldValues) {
        setDisableAllButtons(true)
        const responseData = await getAllOperatorsInAbsenteeism(data.date_init, data.date_end, Number(data.id_creditor), Number(data.id_operator))

        setDisableAllButtons(false)

        if (!responseData.status) {
            toast.error("Não foi possível encontrar os dados de absenteísmo baseados nesses filtros.", {
                duration: 7000
            })

            return
        }

        setValueOperatorsArray(responseData.data)
        setDidFilter(true)

        toast.success("Filtro realizado com sucesso!", {
            duration: 5000
        })
    }

    return (
        <form 
            className="flex justify-center items-center gap-2"
            onSubmit={handleSubmit(handleFilterAbsenteeism)}
        >
            <FieldForm
                name="Data inicial:"
                styles="w-fit"
                error={errors.date_init && "Inválido"}
            >
                <Input 
                    id="date_init"
                    name="date_init"
                    type="date"
                    styles="w-fit block"
                    register={register}
                    value={watch("date_init")}
                    onForm={true}
                    disabled={disableAllButtons}
                />
            </FieldForm>

            <FieldForm
                name="Data final:"
                styles="w-fit"
                error={errors.date_end && "Inválido"}
            >
                <Input 
                    id="date_end"
                    name="date_end"
                    type="date"
                    styles="w-fit block"
                    register={register}
                    value={watch("date_end")}
                    onForm={true}
                    disabled={disableAllButtons}
                />
            </FieldForm>
            <FieldForm
                name="Credor"
                styles="w-fit"
                error={errors.id_creditor && "Inválido"}
            >
                <SelectField
                    id="id_creditor"
                    name="id_creditor"
                    styles="w-[250px]"
                    onForm={true}
                    register={register}
                    value={watch("id_creditor")}
                    disabled={disableAllButtons}
                >
                    <Option value="0" firstValue="Selecione um credor" />

                    {creditors.map((item, index) => {
                        return (
                            <Option 
                                key={index}
                                value={String(item.Id_Creditor)} 
                                firstValue={item.Creditor} 
                            />
                        )
                    })}
                </SelectField>
            </FieldForm>
            <FieldForm
                name="Operador:"
                styles="w-fit"
                error={errors.id_operator && "Inválido"}
            >
                <SelectField
                    id="id_operator"
                    name="id_operator"
                    styles="w-[250px]"
                    onForm={true}
                    register={register}
                    value={watch("id_operator")}
                    disabled={disableAllButtons}
                >
                    <Option 
                        value="0" 
                        firstValue="Selecione um operador" 
                    />

                    {operators.map((item, index) => {
                        return (
                            <Option 
                                key={index}
                                value={String(item.Id_User)}
                                firstValue={`${item.Name} ${item.Last_Name}`}
                            />
                        )
                    })}
                </SelectField>
            </FieldForm>

            <Button
                styles="self-end py-2 w-fit"
                disabled={disableAllButtons}
            >
                Buscar
            </Button>
            <Button
                type="button"
                styles="self-end py-2 w-fit text-red-400 border-red-400 hover:text-white hover:bg-red-400 focus:bg-red-400"
                disabled={!didFilter || disableAllButtons}
                OnClick={resetFilter}
            >
                Remover filtros
            </Button>
        </form>
    )

}
