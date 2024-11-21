'use client'

import { IUniqueCreditorTable } from "@/interfaces/register/unique-creditor/IUniqueCreditor"
import { useState } from "react"
import { DialogEditUniqueCreditor } from "./DialogEditUniqueCreditor"
import { DialogCreateUniqueCreditor } from "./DialogCreateUniqueCreditor"

export function SectionTable({ UniqueCreditors, DisabledUniqueCreditors }: IUniqueCreditorTable) {
    const [isFilterActive, setIsFilterActive] = useState(false)

    return (
        <>
            <div className={`flex justify-start items-center gap-2`}>

                <DialogCreateUniqueCreditor />

                <div className="flex flex-row-reverse justify-center items-center gap-2">
                    <label htmlFor="filterCreditor">Visualizar credores desativados</label>
                    <input
                        id="filterCreditor"
                        type="checkbox"
                        checked={isFilterActive}
                        onChange={() => setIsFilterActive((state) => !state)}
                    />
                </div>
            </div>

            <div>
                <section className={`p-2 overflow-y-auto max-h-[30rem] h-fit`}>
                    <table className={`w-full mb-4`}>
                        <thead className={`bg-gray-200 dark:bg-zinc-800`}>
                            <tr>

                                <th className={`rounded-tl-md font-semibold p-2 dark:text-white/80`}>
                                    ID
                                </th>

                                <th className={`font-semibold p-2 dark:text-white/80`}>
                                    Credor
                                </th>

                                <th className={`rounded-tr-md font-semibold p-2 dark:text-white/80`}>
                                    Ações
                                </th>

                            </tr>
                        </thead>
                        <tbody className={`items-center p-1 bg-slate-100`}>
                            {isFilterActive ? (
                                <>
                                    {DisabledUniqueCreditors.map((disabled, index) => {
                                        return (
                                            <tr key={index} className={`odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-zinc-700 dark:even:bg-zinc-800`}>
                                                
                                                <td className={`p-2 text-center capitalize`}>
                                                    {disabled.Id_Unique_Creditor}
                                                </td>

                                                <td className={`p-2 text-center capitalize`}>
                                                    {disabled.Creditor}
                                                </td>

                                                <td className={`p-2 flex justify-center items-center text-center`}>
                                                    <DialogEditUniqueCreditor Id_Unique_Creditor={disabled.Id_Unique_Creditor} />
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </>
                            ) : (
                                <>
                                    {UniqueCreditors.map((creditor, i) => {
                                        return (
                                            <tr key={i} className={`odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-zinc-700 dark:even:bg-zinc-800`}>
                                                
                                                <td className={`p-2 text-center capitalize`}>
                                                    {creditor.Id_Unique_Creditor}
                                                </td>

                                                <td className={`p-2 text-center capitalize`}>
                                                    {creditor.Creditor}
                                                </td>

                                                <td className={`p-2 flex justify-center items-center text-center`}>
                                                    <DialogEditUniqueCreditor Id_Unique_Creditor={creditor.Id_Unique_Creditor} />
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </>
                            )}
                        </tbody>
                    </table>
                </section>
            </div>
        </>
    )
}