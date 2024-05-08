'use client'

import { ICreditorTable } from "@/interfaces/generics/GetAllCreditors";
import { CreateCreditorModal } from "./CreateCreditorModal";
import { EditCreditorModal } from "./EditCreditorModal";

export function CreditorTable({ Creditors }: ICreditorTable) {

    return (
        <>
            <CreateCreditorModal />

            <div>
                <section className={`p-2 overflow-y-auto max-h-[30rem] h-fit`}>
                    <table className={`w-full mb-4`}>
                        <thead className={`bg-gray-200 dark:bg-slate-600`}>
                            <tr>

                                <th className={`rounded-tl-md font-semibold p-2 dark:text-white/80`}>
                                    ID
                                </th>

                                <th className={`font-semibold p-2 dark:text-white/80`}>
                                    Credor
                                </th>

                                <th className={`font-semibold p-2 dark:text-white/80`}>
                                    Operadores
                                </th>

                                <th className={`font-semibold p-2 dark:text-white/80`}>
                                    Meta
                                </th>

                                <th className={`font-semibold p-2 dark:text-white/80`}>
                                    Dias Trabalhados
                                </th>

                                <th className={`font-semibold p-2 dark:text-white/80`}>
                                    Ações
                                </th>

                            </tr>
                        </thead>
                        <tbody className={`items-center p-1 bg-slate-100`}>
                            {Creditors.map((item, index) => {
                                return (

                                    <tr key={index} className={`odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-slate-500 dark:even:bg-slate-600`}>

                                        <td className={`p-2 text-center capitalize`}>
                                            {item.Id_Creditor}
                                        </td>

                                        <td className={`p-2 text-center capitalize`}>
                                            {item.Creditor}
                                        </td>

                                        <td className={`p-2 text-center capitalize`}>
                                            {item.Number_Operators}
                                        </td>

                                        <td className={`p-2 text-center capitalize`}>
                                            {item.Target}
                                        </td>

                                        <td className={`p-2 text-center capitalize`}>
                                            {item.Working_Days}
                                        </td>

                                        <td className={`p-2 flex justify-center items-center text-center`}>
                                            <EditCreditorModal Id_Creditor={item.Id_Creditor} />
                                        </td>

                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </section>
            </div>
        </>
    )
}