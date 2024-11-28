import { getCreditorsOperators } from "@/api/register/creditor/getCreditorsOperators";
import { getOperatorsInCompany } from "@/api/register/creditor/getOperatorsInCompany";
import { Ancora } from "@/components/Ancora";
import { PaperBlock } from "@/components/PaperBlock";
import { DialogEditCreditorHeadCount } from "@/components/register/head-count/DialogEditCreditorHeadCount";
import { DialogEditMaxOperators } from "@/components/register/head-count/DialogEditMaxOperators";
import { TextPrincipal } from "@/components/TextPrincipal";
import { IGetCreditorsOperators } from "@/interfaces/register/head-count/IGetCreditorOperators";
import { IGetOperatorsInCompany } from "@/interfaces/register/head-count/IGetOperatorsInCompany";
import { faMoon, faSun, faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Toaster } from "react-hot-toast";

export default async function Page() {

    const creditors: IGetCreditorsOperators[] | null = await getCreditorsOperators()
    const operatorsCount: IGetOperatorsInCompany = await getOperatorsInCompany()

    return (
        <PaperBlock>
            <TextPrincipal text="Head Count" />

            <div className="px-2">

                <div className="grid grid-cols-3 justify-center items-center gap-2">
                    <div className="relative flex flex-col gap-2 border-[2px] border-slate-300 p-2 rounded-md h-[100px] dark:border-slate-700">
                        <FontAwesomeIcon icon={faUser} className="w-10 h-10 text-slate-500" />
                        <span className="font-semibold">Operadores: {operatorsCount.Operators_Count}/{operatorsCount.Max_Operators}</span>
                    </div>
                    <div className="relative flex flex-col gap-2 border-[2px] border-slate-300 p-2 rounded-md h-[100px] dark:border-slate-700">
                        <FontAwesomeIcon icon={faSun} className="w-10 h-10 text-amber-500" />
                        <span className="font-semibold">Operadores no turno da manhã: {operatorsCount.Operators_Morning_Count}/{operatorsCount.Max_Operators_Morning}</span>
                        <DialogEditMaxOperators operatorsCount={operatorsCount} />
                    </div>
                    <div className="relative flex flex-col gap-2 border-[2px] border-slate-300 p-2 rounded-md h-[100px] dark:border-slate-700">
                        <FontAwesomeIcon icon={faMoon} className="w-10 h-10 text-gray-600" />
                        <span className="font-semibold">Operadores no turno da tarde: {operatorsCount.Operators_Afternoon_Count}/{operatorsCount.Max_Operators_Afternoon}</span>
                        <DialogEditMaxOperators operatorsCount={operatorsCount} />
                    </div>
                </div>

                <table className="w-full my-4">
                    <thead className="bg-gray-200 dark:bg-zinc-800">
                        <tr>
                            <th className="font-semibold p-2 dark:text-white/80 rounded-tl-md w-1/4">Equipe</th>
                            <th className="font-semibold p-2 dark:text-white/80">Capacidade</th>
                            <th className="font-semibold p-2 dark:text-white/80">Operadores</th>
                            <th className="font-semibold p-2 dark:text-white/80">Manhã</th>
                            <th className="font-semibold p-2 dark:text-white/80">Tarde</th>
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
                                    <td className="text-center">{creditor.Creditor}</td>
                                    <td className="text-center">{creditor.Capacity}</td>
                                    <td className="text-center">{creditor.Number_Operators}</td>
                                    <td className="text-center">{creditor.Number_Operators_Morning}</td>
                                    <td className="text-center">{creditor.Number_Operators_Afternoon}</td>
                                    <td className="flex justify-center items-center">
                                        <DialogEditCreditorHeadCount 
                                            creditor={creditor} 
                                        />
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
