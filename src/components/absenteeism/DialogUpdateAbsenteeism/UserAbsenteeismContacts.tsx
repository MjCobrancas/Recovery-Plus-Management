import { IUserAbsenteeismContactsProps } from "@/interfaces/absenteeism/IUserAbsenteeismContacts";

export function UserAbsenteeismContacts({ user }: IUserAbsenteeismContactsProps) {

    function handleFormatContact(phone: string) {

        if (phone.length == 8) {
            return `${phone.slice(0, 4)}-${phone.slice(4)}`
        }

        return `${phone.slice(0, 5)}-${phone.slice(5)}`
    }

    return (
        <div className="mt-10 p-2 border-[1px] border-slate-200 dark:border-zinc-900 rounded-md">
            <h3 className="font-semibold dark:text-white mb-5">Contatos do operador:</h3>
            <details
                className={`mb-5 relative before:duration-200 open:before:rotate-[225deg]
                        before:absolute before:w-2 before:h-2 before:top-0 before:right-0 before:mt-3 before:mr-4 before:border-solid before:border-[--bg-login]
                        before:dark:border-white before:border-t-0 before:border-r-2
                        before:border-b-2 before:border-l-0 before:p-1 before:rotate-45 mx-2
                `}
            >
                <summary
                    className={`relative p-2 flex w-full font-bold text-[--bg-login]
                            dark:text-white border-[1px] border-[--hover-light-route] dark:border-zinc-900 pr-2 rounded-md cursor-pointer`
                    }
                >
                    Endereços cadastrados do operador
                </summary>

                <div
                    className="px-2"
                >
                    <table className="w-full mx-auto">
                        <thead className="bg-gray-200 dark:bg-zinc-800">
                            <tr>
                                <td className="text-center font-semibold text-sm p-2">Endereço</td>
                                <td className="text-center font-semibold text-sm p-2">Endereço 2</td>
                                <td className="text-center font-semibold text-sm p-2">Bairro</td>
                                <td className="text-center font-semibold text-sm p-2">CEP</td>
                                <td className="text-center font-semibold text-sm p-2">Cidade</td>
                                <td className="text-center font-semibold text-sm p-2">Estado</td>
                                <td className="text-center font-semibold text-sm p-2">País</td>
                            </tr>
                        </thead>
                        <tbody>
                            {user?.adresses.map((item, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className="odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-zinc-700 dark:even:bg-zinc-800"
                                    >
                                        <td className="text-center text-sm p-2">{item.Address}</td>
                                        <td className="text-center text-sm p-2">{item.Address_2 == null ? "N/A" : item.Address_2}</td>
                                        <td className="text-center text-sm p-2">{item.Neighborhood == null ? "N/A" : item.Neighborhood}</td>
                                        <td className="text-center text-sm p-2">{item.Postal_Code}</td>
                                        <td className="text-center text-sm p-2">{item.City}</td>
                                        <td className="text-center text-sm p-2">{item.States}</td>
                                        <td className="text-center text-sm p-2">{item.Country}</td>
                                    </tr>
                                )
                            })}

                            {user != null && user.adresses.length == 0 && (
                                <p className="text-red-500 dark:text-red-400">Dados não encontrados.</p>
                            )}
                        </tbody>
                    </table>
                </div>
            </details>

            <details
                className={`mb-5 relative before:duration-200 open:before:rotate-[225deg]
                            before:absolute before:w-2 before:h-2 before:top-0 before:right-0 before:mt-3 before:mr-4 before:border-solid before:border-[--bg-login]
                            before:dark:border-white before:border-t-0 before:border-r-2
                            before:border-b-2 before:border-l-0 before:p-1 before:rotate-45 mx-2
                `}
            >
                <summary
                    className={`relative p-2 flex w-full font-bold text-[--bg-login]
                            dark:text-white border-[1px] border-[--hover-light-route] dark:border-zinc-900 pr-2 rounded-md cursor-pointer`
                    }
                >
                    Contatos de telefone cadastrados do operador
                </summary>

                <div
                    className="px-2"
                >
                    <table className="w-full mx-auto">
                        <thead className="bg-gray-200 dark:bg-zinc-800">
                            <tr>
                                <td className="text-center font-semibold text-sm p-2">Dono do contato</td>
                                <td className="text-center font-semibold text-sm p-2">Contato</td>
                                <td className="text-center font-semibold text-sm p-2">Tipo do contato</td>
                            </tr>
                        </thead>
                        <tbody>
                            {user?.contacts.map((item, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className="odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-zinc-700 dark:even:bg-zinc-800"
                                    >
                                        <td className="text-center text-sm p-2">{item.Contact_Owner}</td>
                                        <td className="text-center text-sm p-2">({item.DDD}) {handleFormatContact(String(item.Phone))}</td>
                                        <td className="text-center text-sm p-2">{item.Type}</td>
                                    </tr>
                                )
                            })}

                            {user != null && user.contacts.length == 0 && (
                                <p className="text-red-500 dark:text-red-400">Dados não encontrados.</p>
                            )}
                        </tbody>
                    </table>
                </div>
            </details>

            <details
                className={`relative before:duration-200 open:before:rotate-[225deg]
                        before:absolute before:w-2 before:h-2 before:top-0 before:right-0 before:mt-3 before:mr-4 before:border-solid before:border-[--bg-login]
                        before:dark:border-white before:border-t-0 before:border-r-2
                        before:border-b-2 before:border-l-0 before:p-1 before:rotate-45 mx-2
                `}
            >
                <summary
                    className={`relative p-2 flex w-full font-bold text-[--bg-login]
                            dark:text-white border-[1px] border-[--hover-light-route] dark:border-zinc-900 pr-2 rounded-md cursor-pointer`
                    }
                >
                    Emails cadastrados do operador
                </summary>

                <div
                    className="px-2"
                >
                    <table className="w-full mx-auto">
                        <thead className="bg-gray-200 dark:bg-zinc-800">
                            <tr>
                                <td className="text-center font-semibold text-sm p-2">Dono do email</td>
                                <td className="text-center font-semibold text-sm p-2">Email</td>
                            </tr>
                        </thead>
                        <tbody>
                            {user?.emails.map((item, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className="odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-zinc-700 dark:even:bg-zinc-800"
                                    >
                                        <td className="text-center text-sm p-2">{item.Email_Owner}</td>
                                        <td className="text-center text-sm p-2">{item.Email}</td>
                                    </tr>
                                )
                            })}

                            {user != null && user.emails.length == 0 && (
                                <p className="text-red-500 dark:text-red-400">Dados não encontrados.</p>
                            )}
                        </tbody>
                    </table>
                </div>
            </details>
        </div>
    )

}
