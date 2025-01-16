import { IDialogUpdateAbsenteeismData, IDialogUpdateAbsenteeismProps, IDialogUpdateAbsenteeismSchema } from "@/interfaces/absenteeism/IDialogUpdateAbsenteeism";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "../../Button";
import { CheckBoxButton } from "../../CheckBoxButton";
import { FieldForm } from "../../FieldForm";
import { UserAbsenteeismContacts } from "./UserAbsenteeismContacts";
import { updateUserAbsenteeism } from "@/api/absenteeism/updateUserAbsenteeism";
import toast, { Toaster } from "react-hot-toast";

export function DialogUpdateAbsenteeism({ user, isLoadingDialog, closeDialog, updateUserAbsenteeismField }: IDialogUpdateAbsenteeismProps) {

    const [disableAllButtons, setDisableAllButtons] = useState(false)

    const { register, watch, formState: { errors }, setValue, handleSubmit, reset, getValues } = useForm<IDialogUpdateAbsenteeismData>({
        defaultValues: {
            Is_On_Company: user != null ? user.userInfo.Is_On_Company : false,
            Is_Justified_Absence: user != null ? user.userInfo.Is_Justified_Absence : false,
            Observation: user != null ? user.userInfo.Observation : ""
        },
        resolver: zodResolver(IDialogUpdateAbsenteeismSchema)
    })

    useEffect(() => {
        if (user != null) {
            setValue("Is_On_Company", user.userInfo.Is_On_Company)
            setValue("Is_Justified_Absence", user.userInfo.Is_Justified_Absence)
            setValue("Observation", user.userInfo.Observation)
        }
    }, [setValue, user])

    function handleCloseDialog() {
        closeDialog()
        reset()
    }

    function handleUpdateButtonIsJustifiedAbsence(status: boolean) {
        setValue("Is_Justified_Absence", !status)

        if (!status) {
            setValue("Is_On_Company", false)
        }
    }

    function handleUpdateButtonAbsenteeism(status: boolean) {
        setValue("Is_On_Company", !status)

        if (!status) {
            setValue("Is_Justified_Absence", false)
        }
    }

    async function handleUpdateUserAbsenteeism(data: FieldValues) {
        setDisableAllButtons(true)

        const responseStatus = await updateUserAbsenteeism(user!.userInfo.Id_Absenteeism_Schedule, data.Is_On_Company, data.Is_Justified_Absence, data.Observation)

        setDisableAllButtons(false)

        if (!responseStatus) {
            toast.error("Houve um erro ao atualizar os dados do Absenteísmo do Operador, revise os valores e tente novamente mais tarde.", {
                duration: 7000
            })

            return
        }

        updateUserAbsenteeismField(data.Is_On_Company)

        toast.success("Dados do operador atualizados com sucesso!", {
            duration: 5000
        })
    }

    return (
        <>
            {isLoadingDialog ? (
                <p className="font-semibold">Carregando...</p>
            ) : (
                <div className="mt-4 px-2 pb-5">
                    <table className="w-full mx-auto my-4">
                        <thead className="bg-gray-200 dark:bg-zinc-900">
                            <tr>
                                <th className="font-semibold text-sm p-2 dark:text-white/80 rounded-tl-md">Data</th>
                                <th className="font-semibold text-sm p-2 dark:text-white/80">Nome</th>
                                <th className="font-semibold text-sm p-2 dark:text-white/80">Login</th>
                                <th className="font-semibold text-sm p-2 dark:text-white/80">Equipe</th>
                                <th className="font-semibold text-sm p-2 dark:text-white/80">Turno</th>
                                <th className="font-semibold text-sm p-2 dark:text-white/80 rounded-tr-md">Data de admissão</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-zinc-700 dark:even:bg-zinc-800 dark:text-white">
                                <td className="text-center text-sm p-2">{user?.userInfo.Date}</td>
                                <td className="text-center text-sm p-2">{user?.userInfo.Name}</td>
                                <td className="text-center text-sm p-2">{user?.userInfo.UserName}</td>
                                <td className="text-center text-sm p-2">{user?.userInfo.Creditor}</td>
                                <td className="text-center text-sm p-2">{user?.userInfo.Id_User_Turn == 1 ? "Manhã" : user?.userInfo.Id_User_Turn == 2 ? "Tarde" : "Sem turno definido no sistema"}</td>
                                <td className="text-center text-sm p-2">{user?.userInfo.Admission}</td>
                            </tr>
                        </tbody>
                    </table>

                    <form
                        onSubmit={handleSubmit(handleUpdateUserAbsenteeism)}
                    >
                        <div className="flex gap-8 mt-10">
                            <FieldForm
                                name="Operador compareceu na empresa:"
                                styles="flex gap-2 w-fit"
                                obrigatory={false}
                            >
                                <CheckBoxButton
                                    OnClick={() => handleUpdateButtonAbsenteeism(watch("Is_On_Company"))}
                                    isActive={watch("Is_On_Company")}
                                />
                            </FieldForm>

                            <FieldForm
                                name="Falta justificada:"
                                styles="flex gap-2 w-fit"
                                obrigatory={false}
                            >
                                <CheckBoxButton
                                    OnClick={() => handleUpdateButtonIsJustifiedAbsence(watch("Is_Justified_Absence"))}
                                    isActive={watch("Is_Justified_Absence")}
                                />
                            </FieldForm>
                        </div>
                        <FieldForm
                            styles="flex gap-2 flew-wrap mt-5"
                            name="Observação:"
                            obrigatory={false}
                        >
                            <textarea
                                className={classNames("block w-full h-[250px] max-h-[250px] px-2 border-[1px] border-slate-200 rounded-md outline-none focus:border-[2px] focus:border-blue-500 dark:bg-zinc-900 dark:border-slate-400", {
                                    "border-[--border-error]": errors.Observation
                                })}
                                value={watch("Observation")}
                                {...register("Observation")}
                            />
                        </FieldForm>

                        <UserAbsenteeismContacts 
                            user={user}
                        />

                        <Button
                            text="Salvar"
                            styles="mt-10 mb-5 w-fit py-2 float-right ml-1"
                            disabled={disableAllButtons}
                        />
                        <Button
                            type="button"
                            text="Fechar"
                            styles="mt-10 mb-5 w-fit py-2 float-right text-red-400 border-red-400 hover:bg-red-400 hover:text-white focus:bg-red-400"
                            OnClick={() => handleCloseDialog()}
                            disabled={disableAllButtons}
                        />

                        <hr className="w-full h-[1px] border-[1px] border-slate-200" />
                    </form>
                </div>
            )}

            <Toaster 
                position="bottom-right"
                reverseOrder={false}
            />
        </>

    )

}
