'use client'

import { IUserCard } from "@/interfaces/user/UserCard";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export function UserCard({ Id_User, Name, Last_Name, UserName, Position, Backend_Domain }: IUserCard) {

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
                    <span className="font-medium text-slate-500 truncate">{Position}</span>
                </div>
            </div>
            <div
                className={`absolute right-0 bottom-0 overflow-hidden transition-all delay-300`}
            >
                <Link
                    href={`/user/edit/${Id_User}`}
                    type="button"
                    className={`w-full h-full flex items-center justify-center rounded-tr-md p-1 transition-all delay-100`}
                >
                    <FontAwesomeIcon icon={faPencil} className="fa-solid fa-pencil fa-sm text-white bg-blue-500 px-2 py-2 rounded-md rounded-br-md hover:bg-blue-400 duration-100" />
                </Link>
            </div>
        </article>
    )
}