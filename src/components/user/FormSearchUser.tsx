'use client'

import { FieldValues, useForm } from "react-hook-form"
import { Button } from "../Button"
import { FieldForm } from "../FieldForm"
import { InputSearchUser } from "../InputSearchUser"
import { createSearchUserFormData, createSearchUserFormSchema } from "@/interfaces/user/SearchUser"
import { zodResolver } from "@hookform/resolvers/zod"
import { getUsersByName } from "@/api/user/getUsersByName"
import { IncompleteUserValuesData } from "@/interfaces/user/UserCard"
import { ChangeEvent, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons"
import { getUsersPagination } from "@/api/user/getUsersPagination"
import { verifyUserToken } from "@/api/generics/verifyToken"
import { useRouter } from "next/navigation"

export function SearchUser({ allUsers, filterData, totalPage, backend_domain, token }: { allUsers: IncompleteUserValuesData, filterData: Function, totalPage: number, backend_domain: string, token: string }) {
    const router = useRouter()

    const [disableButton, setDisableButton] = useState(false)

    const { register, handleSubmit, watch, formState: { errors }, setError, clearErrors } = useForm<createSearchUserFormData>({
        resolver: zodResolver(createSearchUserFormSchema)
    })

    const [actualPage, setActualPage] = useState(1)

    function resetValues(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.value.length == 0) {
            filterData(allUsers)
            setActualPage(1)
        }
    }

    async function handleFormSubmit(data: FieldValues) {

        const isValidToken = await verifyUserToken()

        if (!isValidToken) {
            return router.push('/login')
        }

        if (String(data.searchUser).length <= 0) {
            setError("searchUser", {
                message: "Digite no campo de usuário!"
            })

            setTimeout(() => {
                clearErrors()
            }, 5000);

            return
        }
        setDisableButton(true)
        const result: IncompleteUserValuesData = await getUsersByName(data.searchUser) as IncompleteUserValuesData

        setDisableButton(false)

        const object = result

        object.users.data = object.users.data.filter((item) => item.Status == true)

        filterData(object)
    }

    async function handleNextPage(nextPage: number) {
        setActualPage(nextPage)
        const result: IncompleteUserValuesData = await getUsersPagination(backend_domain, ((nextPage - 1) * 24), 24, token, "true")
        filterData(result)
    }

    async function handleBackPage(backPage: number) {
        setActualPage(backPage)
        const result: IncompleteUserValuesData = await getUsersPagination(backend_domain, ((backPage - 1) * 24), 24, token, "true")
        filterData(result)
    }

    async function handleInitialPage() {
        setActualPage(1)
        const result: IncompleteUserValuesData = await getUsersPagination(backend_domain, (0 * 24), 24, token, "true")
        filterData(result)
    }

    async function handleEndPage() {
        setActualPage(totalPage)
        const result: IncompleteUserValuesData = await getUsersPagination(backend_domain, ((totalPage - 1) * 24), 24, token, "true")
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
                            autoComplete="off"
                            styles={`
                                w-full block
                                ${errors.searchUser
                                    ? "border-[--label-color-error] dark:border-[--label-color-error] focus:border-[--label-color-error] dark:focus:border-[--label-color-error]"
                                    : ""
                                }`}
                            onForm={true}
                            register={register}
                            onChangeFunction={(event: ChangeEvent<HTMLInputElement>) => resetValues(event)}
                        />

                        <Button
                            type="submit"
                            text="Buscar"
                            styles={`w-24 h-[43px] p-0 ml-1 text-[17px] max-sm:ml-0 max-sm:w-full`}
                            disabled={disableButton}
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
                        disabled={actualPage == 1 || disableButton}
                        onClick={() => handleInitialPage()}
                    >
                        <FontAwesomeIcon icon={faAnglesLeft} className={ actualPage != 1 && !disableButton ? "text-blue-600 hover:bg-slate-200 rounded-full duration-75 p-2 dark:hover:bg-slate-70" : "text-slate-700 rounded-full duration-75 p-2 dark:hover:bg-slate-70" } />
                    </button>

                    <button
                        type="button"
                        name="page"
                        title="Página anterior"
                        disabled={actualPage == 1 || disableButton}
                        onClick={() => handleBackPage(actualPage - 1)}
                    >

                        <FontAwesomeIcon icon={faAngleLeft} className={ actualPage != 1 && !disableButton ? "text-blue-600 hover:bg-slate-200 rounded-full duration-75 p-2 dark:hover:bg-slate-70" : "text-slate-700 rounded-full duration-75 p-2 dark:hover:bg-slate-70" } />
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
                        disabled={actualPage == totalPage || disableButton}
                    >
                        <FontAwesomeIcon icon={faAngleRight} className={ actualPage != totalPage && !disableButton ? "text-blue-600 hover:bg-slate-200 rounded-full duration-75 p-2 dark:hover:bg-slate-70" : "text-slate-700 rounded-full duration-75 p-2 dark:hover:bg-slate-70" } />
                    </button>

                    <button
                        type="button"
                        name="page"
                        title="Última página"
                        disabled={actualPage == totalPage || disableButton}
                        onClick={() => handleEndPage()}
                    >
                        <FontAwesomeIcon icon={faAnglesRight} className={ actualPage != totalPage && !disableButton ? "text-blue-600 hover:bg-slate-200 rounded-full duration-75 p-2 dark:hover:bg-slate-70" : "text-slate-700 rounded-full duration-75 p-2 dark:hover:bg-slate-70" } />
                    </button>
                </div>
            </form>
        </div>
    )
}