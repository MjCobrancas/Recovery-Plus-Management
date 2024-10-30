'use client'

import { verifyUserPermission } from "@/api/user/verifyUserPermission";
import { IUserCard } from "@/interfaces/user/UserCard";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function UserCard({ Id_User, Name, Last_Name, UserName, Position, Backend_Domain }: IUserCard) {
    const router = useRouter()

    async function redirectUserToEditPage(id_operator: number, isQuickEdit: boolean) {
        const { status, canChange } = await verifyUserPermission(id_operator)

        if (!status || !canChange) {
            toast.error("Você não tem permissão suficiente para fazer alterações nesse usuário!", {
                duration: 5000
            })

            return
        }

        if (isQuickEdit) {
            router.push(`/user/quick-edit/${id_operator}`)

            return
        }

        router.push(`/user/edit/${id_operator}`)
    }

    return (
        <article
            className={`flex justify-between border-2 border-[--border-select] dark:border-[--border-dark] rounded-md cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 relative transition-all`}
        >
            <div className={`flex items-center gap-3 p-2 transition-all`}>
                <Image
                    loading="lazy"
                    src={`${Backend_Domain}/get-image-users/${UserName}.jpg`}
                    alt={"Foto de " + UserName}
                    width={100}
                    height={100}
                    className={`rounded-full w-[4rem] h-[4rem] object-cover bg-slate-200`}
                />
                <div className={`flex flex-col w-52 transition-all`}>
                    <h3
                        className={`font-semibold text-[--text-title-profile] dark:text-slate-300 text-lg mr-1
        line-clamp-1`}
                        title={`${Name} ${Last_Name}`}
                    >
                        {Name} {Last_Name}
                    </h3>
                    <span className="w-[150px] font-medium text-slate-500 truncate">{Position}</span>
                </div>
            </div>
            <div
                className={`absolute right-[34px] bottom-0 overflow-hidden transition-all delay-300`}
            >
                <button
                    type="button"
                    className={`w-full h-full flex items-center justify-center rounded-tr-md p-1 transition-all delay-100`}
                    onClick={() => redirectUserToEditPage(Number(Id_User), true)}
                >
                    <FontAwesomeIcon icon={faPencil} className="fa-solid fa-pencil fa-sm text-white bg-emerald-500 px-2 py-2 rounded-md rounded-br-md hover:bg-emerald-400 duration-100" />
                </button>
            </div>
            <div
                className={`absolute right-0 bottom-0 overflow-hidden transition-all delay-300`}
            >
                <button
                    type="button"
                    className={`w-full h-full flex items-center justify-center rounded-tr-md p-1 transition-all delay-100`}
                    onClick={() => redirectUserToEditPage(Number(Id_User), false)}
                >
                    <FontAwesomeIcon icon={faPencil} className="fa-solid fa-pencil fa-sm text-white bg-blue-500 px-2 py-2 rounded-md rounded-br-md hover:bg-blue-400 duration-100" />
                </button>
            </div>
        </article>
    )
}