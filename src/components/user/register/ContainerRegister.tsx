'use client'

import { verifyUserToken } from "@/api/generics/verifyToken"
import { createUser } from "@/api/user/register/createUser"
import { IContainerRegisterProps } from "@/interfaces/user/register/ContainerRegisterProps"
import { IFormAdresses } from "@/interfaces/user/register/FormAdresses"
import { IFormContacts } from "@/interfaces/user/register/FormContacts"
import { IFormEmail } from "@/interfaces/user/register/FormEmail"
import { CreateUserFormData } from "@/interfaces/user/register/FormUser"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { FormAdresses } from "./form-adresses/FormAdresses"
import { FormContacts } from "./form-contacts/FormContacts"
import { FormEmail } from "./form-email/FormEmail"
import { FormUser } from "./form-user/FormUser"
import { HeaderRegister } from "./HeaderRegister"

export function ContainerRegister({ creditors, usersResponsables, usersTurns, userRoles, userEducation, userMaritalStatus, BACKEND_DOMAIN , usersResponsablesTechnicals}: IContainerRegisterProps) {
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

        const { name, lastName, password, cpf, birthDate, mother, father, admission, dismissal, position, educationStatus, maritalStatus, permission, id_turn, contract, id_responsable, is_responsable, payment_method, salary, bonus, registration, id_responsable_technical, is_responsable_technical } = userForm

        const objectValues = {
            user: {
                name,
                lastName,
                password,
                cpfCnpj: cpf,
                statusUser: true,
                birthDate,
                mother,
                father,
                admission,
                dismissal,
                position,
                id_credor: 58,
                educationStatus,
                maritalStatus,
                permission,
                id_turn: Number(id_turn),
                contract,
                id_responsable: Number(id_responsable),
                is_responsable: is_responsable == "1" ? true : false,
                salary,
                payment_method,
                bonus,
                registration, 
                id_responsable_technical: id_responsable_technical == "disabled" ? 0 : Number(id_responsable_technical),
                is_responsable_technical: is_responsable_technical == "1" ? true : false
            },
            address: adressesForm,
            contact: contactsForm,
            email: value
        }

        const formData = new FormData()
        formData.append("picture", picture)

        const result = await createUser<typeof objectValues>(objectValues)

        if (!result.status) {
            toast.error("Houve um erro na criação do usuário")

            return
        }

        // if (picture != "") {
        //     await uploadImageOfUser(userName, formData, true)
        // }

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
                {page == 0 && <FormUser BACKEND_DOMAIN={BACKEND_DOMAIN} usersResponsablesTechnicals={usersResponsablesTechnicals} usersResponsables={usersResponsables} usersTurns={usersTurns} userMaritalStatus={userMaritalStatus} userEducation={userEducation} userRoles={userRoles} userForm={userForm} creditors={creditors} updatePage={updatePage} setUserFormValue={setUserFormValue} avatar={avatar} setAvatar={setValueAvatar} setPicture={setValuePicture} />}
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