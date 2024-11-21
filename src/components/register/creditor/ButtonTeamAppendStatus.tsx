'use client'

import { IButtonTeamAppendStatusProps } from "@/interfaces/register/creditor/IButtonTeamAppendStatus";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function ButtonTeamAppendStatus({ status, OnClick }: IButtonTeamAppendStatusProps) {

    return (
        <>
            {status ? (
                <button 
                    className="w-[25px] h-[25px] bg-emerald-400 border-[2px] border-emerald-400 rounded-md hover:bg-emerald-500 hover:border-emerald-500 duration-300"
                    type="button"
                    onClick={OnClick}
                >
                    <FontAwesomeIcon icon={faCheck} className="text-white" />
                </button>
            ) : (
                <button 
                    className="w-[25px] h-[25px] bg-white border-[2px] border-slate-300 rounded-md hover:bg-slate-200 duration-300"
                    type="button"
                    onClick={OnClick}
                />
            )}
        </>
    )

}