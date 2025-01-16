'use client'

import { ICheckBoxButtonProps } from "@/interfaces/components/ICheckBoxButton";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

export function CheckBoxButton({ isActive, OnClick }: ICheckBoxButtonProps) {

    return (
        <button
            type="button"
            className={classNames("w-6 h-6 flex justify-center items-center py-1 duration-300 text-white rounded-md border-[2px]", {
                "bg-emerald-400 border-emerald-400 hover:bg-emerald-500 hover:border-emerald-500 dark:bg-emerald-500 dark:border-emerald-500 dark:hover:bg-emerald-600 dark:hover:border-emerald-600": isActive,
                "border-slate-300 hover:bg-slate-200 dark:border-slate-400 dark:hover:bg-slate-400": !isActive
            })}
            onClick={OnClick}
        >
            {isActive && (
                <FontAwesomeIcon icon={faCheck} className="w-4 h-4" />
            )}
        </button>
    )

}
