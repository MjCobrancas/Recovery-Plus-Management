'use client'

import { useState } from "react"
import { HeaderRegister } from "./HeaderRegister"
import { IContainerRegisterProps } from "@/interfaces/user/register/ContainerRegisterProps"
import { CreateUserFormData } from "@/interfaces/user/register/FormUser"
import { FormUser } from "./form-user/FormUser"
import { FormAdresses } from "./form-adresses/FormAdresses"
import { IFormAdresses } from "@/interfaces/user/register/FormAdresses"
import { FormContacts } from "./form-contacts/FormContacts"
import { FormEmail } from "./form-email/FormEmail"
import { IFormContacts } from "@/interfaces/user/register/FormContacts"
import { IFormEmail } from "@/interfaces/user/register/FormEmail"
import { createUser } from "@/api/user/register/createUser"
import toast, { Toaster } from "react-hot-toast"
import { uploadImageOfUser } from "@/api/user/uploadUserPicture"
import { verifyUserToken } from "@/api/generics/verifyToken"
import { useRouter } from "next/navigation"

export function ContainerRegister({ creditors, usersTurns, userRoles, userEducation, userMaritalStatus, BACKEND_DOMAIN }: IContainerRegisterProps) {
    const router = useRouter()

    const [page, setPage] = useState(0)
    const [userForm, setUserForm] = useState<CreateUserFormData | null>(null)
    const [adressesForm, setAdressesForm] = useState<IFormAdresses[]>([])
    const [contactsForm, setContactsForm] = useState<IFormContacts[]>([])
    const [emailsForm, setEmailsForm] = useState<IFormEmail[]>([])
    const [avatar, setAvatar] = useState<string>("")
    const [picture, setPicture] = useState<string | File>("")

    function setValuePicture(value: string | File) {
        setPicture(value)
    }

    function setValueAvatar(value: string) {
        setAvatar(value)
    }

    function updatePage(pageNumber: number) {
        setPage(pageNumber)
    }

    function setUserFormValue(value: CreateUserFormData) {
        setUserForm(value)
    }

    function setAdressesFormValue(value: IFormAdresses[]) {
        setAdressesForm(value)
    }

    function setContactsFormValue(value: IFormContacts[]) {
        setContactsForm(value)
    }

    async function setEmailsFormValue(value: IFormEmail[], isFetchRequest: boolean) {
        const isValidToken = await verifyUserToken()

        if (!isValidToken) {
            return router.push("/login")
        }

        setEmailsForm(value)

        if (userForm == null || !isFetchRequest) {
            return
        }

        const { name, lastName, userName, password, cpf, birthDate, mother, father, admission, dismissal, position, id_credor, educationStatus, maritalStatus, permission, id_turn } = userForm

        const objectValues = {
            user: {
                name,
                lastName,
                userName,
                password,
                cpfCnpj: cpf,
                statusUser: true,
                birthDate,
                mother,
                father,
                admission,
                dismissal,
                position,
                id_credor,
                educationStatus,
                maritalStatus,
                permission,
                id_turn: Number(id_turn)
            },
            address: adressesForm,
            contact: contactsForm,
            email: value
        }

        console.log(objectValues)

        const formData = new FormData()
        formData.append("picture", picture)

        const result = await createUser<typeof objectValues>(objectValues)

        if (!result.status) {
            toast.error("Houve um erro na criação do usuário")

            return
        }

        if (picture != "") {
            await uploadImageOfUser(userName, formData, true)
        }

        toast.success("Usuário criado com sucesso!", {
            duration: 10000
        })
        setPage(0)
        setUserForm(null)
        setAdressesForm([])
        setContactsForm([])
        setEmailsForm([])
    }

    return (
        <div className="p-2">
            <header className={`w-full flex items-center gap-1 justify-around`}>
                <HeaderRegister page={page} />
            </header>
            <section>
                {page == 0 && <FormUser BACKEND_DOMAIN={BACKEND_DOMAIN} usersTurns={usersTurns} userMaritalStatus={userMaritalStatus} userEducation={userEducation} userRoles={userRoles} userForm={userForm} creditors={creditors} updatePage={updatePage} setUserFormValue={setUserFormValue} avatar={avatar} setAvatar={setValueAvatar} setPicture={setValuePicture} />}
                {page == 1 && <FormAdresses adressesForm={adressesForm} setAdressesFormValue={setAdressesFormValue} updatePage={updatePage} />}
                {page == 2 && <FormContacts contactsForm={contactsForm} setContactsFormValue={setContactsFormValue} updatePage={updatePage} />}
                {page == 3 && <FormEmail emailsForm={emailsForm} setEmailsFormValue={setEmailsFormValue} updatePage={updatePage} />}
            </section>

            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
        </div>
    )
}