'use client'

import { FieldValues, useForm } from "react-hook-form"
import { Button } from "../Button"
import { FieldForm } from "../FieldForm"
import { InputSearchUser } from "../InputSearchUser"
import { createSearchUserFormData, createSearchUserFormSchema } from "@/interfaces/user/SearchUser"
import { zodResolver } from "@hookform/resolvers/zod"
import { getUsersByName } from "@/api/user/getUsersByName"
import { IncompleteUserValuesData } from "@/interfaces/user/UserCard"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons"
import { getUsersPagination } from "@/api/user/getUsersPagination"

export function SearchUser({ filterData, totalPage, backend_domain, token }: { filterData: Function, totalPage: number, backend_domain: string, token: string }) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<createSearchUserFormData>({
        resolver: zodResolver(createSearchUserFormSchema)
    })

    const [actualPage, setActualPage] = useState(1)

    async function handleFormSubmit(data: FieldValues) {
        const result: IncompleteUserValuesData = await getUsersByName(data.searchUser) as IncompleteUserValuesData

        filterData(result)
    }

    async function handleNextPage(nextPage: number) {
        setActualPage(nextPage)
        const result: IncompleteUserValuesData = await getUsersPagination(backend_domain, ((nextPage - 1) * 24), (nextPage * 24), token)
        filterData(result)
    }

    async function handleBackPage(backPage: number) {
        setActualPage(backPage)
        const result: IncompleteUserValuesData = await getUsersPagination(backend_domain, ((backPage - 1) * 24), ((backPage) * 24), token)
        filterData(result)
    }

    async function handleInitialPage() {
        setActualPage(1)
        const result: IncompleteUserValuesData = await getUsersPagination(backend_domain, (0 * 24), (1 * 24), token)
        filterData(result)
    }

    async function handleEndPage() {
        setActualPage(totalPage)
        const result: IncompleteUserValuesData = await getUsersPagination(backend_domain, ((totalPage - 1) * 24), (totalPage * 24), token)
        filterData(result)
    }

    return (
        <div className={`flex justify-between items-end px-2`}>
            <form
                className="flex items-end"
                onSubmit={handleSubmit(handleFormSubmit)}
            >
                <FieldForm
                    label="searchUser"
                    name="Busque um usuário"
                    obrigatory={false}
                    styles={"max-sm:flex-col max-sm:mr-4 font-medium"}
                    error={errors.searchUser ? errors.searchUser.message : ""}
                    message={errors.searchUser?.message}
                >
                    <div className="flex max-sm:flex-col max-sm:gap-1 items-end">
                        <InputSearchUser
                            id="searchUser"
                            name="searchUser"
                            title="Pressione enter ou clique no botão"
                            placeholder="Nome do usuário ou Identificador"
                            value={watch("searchUser")}
                            styles={`
                                w-full block
                                ${errors.searchUser
                                    ? "border-[--label-color-error] dark:border-[--label-color-error] focus:border-[--label-color-error] dark:focus:border-[--label-color-error]"
                                    : ""
                                }`}
                            onForm={true}
                            register={register}
                        />

                        <Button
                            type="submit"
                            text="Buscar"
                            styles={`w-24 h-[43px] p-0 ml-1 text-[17px] max-sm:ml-0 max-sm:w-full`}
                        />
                    </div>
                </FieldForm>
            </form>
            <form>
                <div className="flex items-center">
                    <button
                        type="button"
                        name="page"
                        title="Primeira página"
                        disabled={actualPage == 1}
                        onClick={() => handleInitialPage()}
                    >
                        <FontAwesomeIcon icon={faAnglesLeft} className={ actualPage != 1 ? "text-blue-600 hover:bg-slate-200 rounded-full duration-75 p-2 dark:hover:bg-slate-70" : "text-slate-700 rounded-full duration-75 p-2 dark:hover:bg-slate-70" } />
                    </button>

                    <button
                        type="button"
                        name="page"
                        title="Página anterior"
                        disabled={actualPage == 1}
                        onClick={() => handleBackPage(actualPage - 1)}
                    >

                        <FontAwesomeIcon icon={faAngleLeft} className={ actualPage != 1 ? "text-blue-600 hover:bg-slate-200 rounded-full duration-75 p-2 dark:hover:bg-slate-70" : "text-slate-700 rounded-full duration-75 p-2 dark:hover:bg-slate-70" } />
                    </button>

                    <div className={`rounded-full flex items-start justify-center px-1`}>
                        <span
                            className={`font-semibold text-lg text-slate-800 dark:text-slate-100`}
                        >
                            {actualPage}
                        </span>
                    </div>

                    <button
                        type="button"
                        name="page"
                        title="Próxima página"
                        onClick={() => handleNextPage(actualPage + 1)}
                        disabled={actualPage == totalPage}
                    >
                        <FontAwesomeIcon icon={faAngleRight} className={ actualPage != totalPage ? "text-blue-600 hover:bg-slate-200 rounded-full duration-75 p-2 dark:hover:bg-slate-70" : "text-slate-700 rounded-full duration-75 p-2 dark:hover:bg-slate-70" } />
                    </button>

                    <button
                        type="button"
                        name="page"
                        title="Última página"
                        disabled={actualPage == totalPage}
                        onClick={() => handleEndPage()}
                    >
                        <FontAwesomeIcon icon={faAnglesRight} className={ actualPage != totalPage ? "text-blue-600 hover:bg-slate-200 rounded-full duration-75 p-2 dark:hover:bg-slate-70" : "text-slate-700 rounded-full duration-75 p-2 dark:hover:bg-slate-70" } />
                    </button>
                </div>
            </form>
        </div>
    )

}