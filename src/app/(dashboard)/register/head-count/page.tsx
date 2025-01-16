import { getCreditorsOperators } from "@/api/register/creditor/getCreditorsOperators";
import { getOperatorsInCompany } from "@/api/register/creditor/getOperatorsInCompany";
import { getUserPermission } from "@/api/user/getUserPermission";
import { Ancora } from "@/components/Ancora";
import { PaperBlock } from "@/components/PaperBlock";
import { DialogEditCreditorHeadCount } from "@/components/register/head-count/DialogEditCreditorHeadCount";
import { DialogEditMaxOperators } from "@/components/register/head-count/DialogEditMaxOperators";
import { TextPrincipal } from "@/components/TextPrincipal";
import { IGetCreditorsOperators } from "@/interfaces/register/head-count/IGetCreditorOperators";
import { IGetOperatorsInCompany } from "@/interfaces/register/head-count/IGetOperatorsInCompany";
import { faMoon, faSun, faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { Toaster } from "react-hot-toast";

export default async function Page() {

    const creditors: IGetCreditorsOperators[] | null = await getCreditorsOperators()
    const operatorsCount: IGetOperatorsInCompany = await getOperatorsInCompany()
    const { Permission_Level_Id } = await getUserPermission()

    function calculatePercentage(value: number, max_value: number) {
        const percentage = (value * 100) / max_value

        if (String(percentage) == "Infinity") {
            return `0%`
        }

        return `${String(Math.floor(percentage))}%`
    }

    return (
        <PaperBlock>
            <TextPrincipal text="Head Count" styles="mb-5" />

            <div className="px-2">
                <div className="grid grid-cols-3 grid-rows-2 justify-center items-center gap-2 p-2 border-[1px] border-slate-200 rounded-md">
                    <div className="relative flex gap-2 border-[2px] border-slate-300 p-2 rounded-md dark:border-slate-700">
                        <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-slate-500 pt-[2px]" />
                        <span className="font-semibold">Ideal: {operatorsCount.Operators_Count}/{operatorsCount.Max_Operators} ({calculatePercentage(operatorsCount.Operators_Count, operatorsCount.Max_Operators)})</span>
                    </div>
                    <div className="relative flex gap-2 border-[2px] border-slate-300 p-2 rounded-md dark:border-slate-700">
                        <FontAwesomeIcon icon={faSun} className="w-4 h-4 text-amber-500 pt-[2px]" />
                        <span className="font-semibold">{operatorsCount.Operators_Morning_Count}/{operatorsCount.Max_Operators_Morning} ({calculatePercentage(operatorsCount.Operators_Morning_Count, operatorsCount.Max_Operators_Morning)})</span>
                        {Permission_Level_Id == 1 && (
                            <DialogEditMaxOperators operatorsCount={operatorsCount} />
                        )}
                    </div>
                    <div className="relative flex gap-2 border-[2px] border-slate-300 p-2 rounded-md dark:border-slate-700">
                        <FontAwesomeIcon icon={faMoon} className="w-4 h-4 text-gray-600 pt-[2px]" />
                        <span className="font-semibold">{operatorsCount.Operators_Afternoon_Count}/{operatorsCount.Max_Operators_Afternoon} ({calculatePercentage(operatorsCount.Operators_Afternoon_Count, operatorsCount.Max_Operators_Afternoon)})</span>
                        {Permission_Level_Id == 1 && (
                            <DialogEditMaxOperators operatorsCount={operatorsCount} />
                        )}
                    </div>

                    <div className="relative flex gap-2 border-[2px] border-slate-300 p-2 rounded-md dark:border-slate-700">
                        <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-slate-500 pt-[2px]" />
                        <span className="font-semibold">Logados: {operatorsCount.Operators_Presence}/{operatorsCount.Max_Operators} ({calculatePercentage(operatorsCount.Operators_Presence, operatorsCount.Max_Operators)})</span>
                    </div>
                    <div className="relative flex gap-2 border-[2px] border-slate-300 p-2 rounded-md dark:border-slate-700">
                        <FontAwesomeIcon icon={faSun} className="w-4 h-4 text-amber-500 pt-[2px]" />
                        <span className="font-semibold">{operatorsCount.Operators_Morning_Count_Presence}/{operatorsCount.Max_Operators_Morning} ({calculatePercentage(operatorsCount.Operators_Morning_Count_Presence, operatorsCount.Max_Operators_Morning)})</span>
                    </div>
                    <div className="relative flex gap-2 border-[2px] border-slate-300 p-2 rounded-md dark:border-slate-700">
                        <FontAwesomeIcon icon={faMoon} className="w-4 h-4 text-gray-600 pt-[2px]" />
                        <span className="font-semibold">{operatorsCount.Operators_Afternoon_Count_Presence}/{operatorsCount.Max_Operators_Afternoon} ({calculatePercentage(operatorsCount.Operators_Afternoon_Count_Presence, operatorsCount.Max_Operators_Afternoon)})</span>
                    </div>
                </div>

                <table className="w-full my-4">
                    <thead className="bg-gray-200 dark:bg-zinc-800">
                        <tr>
                            <th className="font-semibold p-2 dark:text-white/80 rounded-tl-md w-1/4">Equipe</th>
                            <th className="font-semibold p-2 dark:text-white/80">Capacity</th>
                            <th className="font-semibold p-2 dark:text-white/80">Manhã</th>
                            <th className="font-semibold p-2 dark:text-white/80">Tarde</th>
                            <th className="font-semibold p-2 dark:text-white/80">Total de operadores logados</th>
                            <th className="font-semibold p-2 dark:text-white/80">Total de operadores na carteira</th>
                            <th className="font-semibold p-2 dark:text-white/80">Superávite/Déficit</th>
                            <th className="font-semibold p-2 dark:text-white/80 rounded-tr-md">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {creditors != null ? creditors.map((creditor, index) => {
                            return (
                                <tr
                                    key={index}
                                    className="odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-zinc-700 dark:even:bg-zinc-800"
                                >
                                    <td className={classNames("text-center", {
                                        "font-bold": creditor.Id_Creditor == 0
                                    })}>{creditor.Creditor}</td>
                                    <td className={classNames("text-center", {
                                        "font-bold": creditor.Id_Creditor == 0
                                    })}>{creditor.Capacity}</td>
                                    <td className={classNames("text-center", {
                                        "font-bold": creditor.Id_Creditor == 0
                                    })}>{creditor.Number_Operators_Morning}</td>
                                    <td className={classNames("text-center", {
                                        "font-bold": creditor.Id_Creditor == 0
                                    })}>{creditor.Number_Operators_Afternoon}</td>
                                    <td className={classNames("text-center", {
                                        "font-bold": creditor.Id_Creditor == 0
                                    })}>{creditor.Number_Operators_Logged}</td>
                                    <td className={classNames("text-center", {
                                        "font-bold": creditor.Id_Creditor == 0
                                    })}>{creditor.Number_Operators}</td>
                                    <td className={classNames("text-center", {
                                        "text-red-600 dark:text-red-500": (creditor.Number_Operators - creditor.Capacity) < 0,
                                        "text-emerald-600 dark:text-emerald-500": (creditor.Number_Operators - creditor.Capacity) >= 0,
                                        "font-bold": creditor.Id_Creditor == 0
                                    })}>
                                        {creditor.Number_Operators - creditor.Capacity}
                                    </td>
                                    <td className="flex justify-center items-center">
                                        {creditor.Id_Creditor != 0 && Permission_Level_Id == 1 ? (
                                            <DialogEditCreditorHeadCount
                                                creditor={creditor}
                                            />
                                        ) : (
                                            <p></p>
                                        )}
                                    </td>
                                </tr>
                            )
                        }) : (
                            <tr>
                                <td>Não foi possível encontrar os credores</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />

            <Ancora
                title="Voltar"
                toGo="/register"
                styles="w-fit ml-2 mb-1"
            />
        </PaperBlock>
    )

}
