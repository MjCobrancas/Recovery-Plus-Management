import { IInputForm } from "@/interfaces/components/Input";
import { twMerge } from "tailwind-merge";

export function InputCheckbox({ type = "checkbox", name, id, value = "", required = false, placeholder = "", maxlength, autocomplete = "off", accept = "", min, max, keydown, onInput, disabled = false, styles = "", onForm = false, register, checked = false}: IInputForm) {

    return (
        <>
            <input 
                type={type}
                id={id}
                className={twMerge(
                    `p-2 border-2 rounded outline-none transition
                    font-semibold text-[--text-label-login] dark:[color-scheme:dark]
                    duration-200 w-full placeholder:text-[--text-placeholder-login] placeholder:font-medium 
                    dark:bg-[--bg-dark-options] dark:placeholder:text-slate-400 dark:text-[--text-input-dark] disabled:opacity-75 disabled:cursor-not-allowed
                    dark:border-[--border-dark] dark:focus:border-[--focus-input-login]
                    focus:border-[--focus-input-login] print:disabled:bg-white`,
                        styles
                )}
                disabled={disabled}
                {...register!(name)}
            />
        </>
    )
}