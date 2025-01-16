'use client'

import { IUserContainerCard, IncompleteUserValues, IncompleteUserValuesData } from "@/interfaces/user/UserCard";
import { useState } from "react";
import { UserCard } from "./UserCard";
import { SearchUser } from "./FormSearchUser";
import { Toaster } from "react-hot-toast";

export function ContainerUserCard({ all, backend_domain, token, countQuantityUsersNotUpdate }: IUserContainerCard) {
    const [data, setData] = useState(all)
    const [totalPage, setTotalPage] = useState(getTotalPages)

    function getTotalPages() {
        const totalPages = Math.trunc(all.users.count / 24)

        if ((all.users.count % 24) >= 1) {
            return totalPages + 1
        }

        return totalPages
    }

    function filterUsers(data: IncompleteUserValuesData) {
        setData(data)
    }

    return (
        <>
            <SearchUser 
                allUsers={all} 
                backend_domain={backend_domain} 
                filterData={filterUsers} 
                totalPage={totalPage} 
                token={token} 
                countQuantityUsersNotUpdate={countQuantityUsersNotUpdate}
            />

            <div className={`flex justify-between items-end px-2`}>
                <section
                    className={`p-2 flex-1 grid gap-y-2 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-x-2 overflow-y-auto`}
                >
                    {data.users.data.length > 0 ? data.users.data.map((user: IncompleteUserValues) => {
                        if (user.Status) {
                            return (
                                <UserCard
                                    key={user.Id_User}
                                    Id_User={user.Id_User}
                                    Name={user.Name}
                                    Last_Name={user.Last_Name}
                                    Position={user.Position}
                                    UserName={user.UserName}
                                    Is_User_Data_Updated={user.Is_User_Data_Updated}
                                    Backend_Domain={backend_domain}
                                />
                            )
                        }
                    }) : (
                        <p className="text-red-500 font-bold">Dados não encontrados.</p>
                    )}
                </section>
            </div>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
        </>
    )
}
