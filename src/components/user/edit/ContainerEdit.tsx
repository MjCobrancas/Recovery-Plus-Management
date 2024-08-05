'use client'

import { useState } from "react"
import { IContainerRegisterProps } from "@/interfaces/user/register/ContainerRegisterProps"
import { CreateUserFormData } from "@/interfaces/user/register/FormUser"
import { IFormAdresses } from "@/interfaces/user/register/FormAdresses"
import { IFormContacts } from "@/interfaces/user/register/FormContacts"
import { IFormEmail } from "@/interfaces/user/register/FormEmail"
import toast, { Toaster } from "react-hot-toast"
import { HeaderRegister } from "../register/HeaderRegister"
import { FormUser } from "./form-user/FormUser"
import { FormAdresses } from "./form-adresses/FormAdresses"
import { FormContacts } from "./form-contacts/FormContacts"
import { FormEmail } from "./form-email/FormEmail"
import { IAdressesFormat, IContactsFormat, IEmailFormat } from "@/interfaces/user/edit/EditFormat"
import { updateUser } from "@/api/user/edit/updateUser"
import { uploadImageOfUser } from "@/api/user/uploadUserPicture"

export function ContainerEdit({ creditors, user, userAdressesFormat, userContactsFormat, userEmailsFormat, idUser, userRoles, userEducation, userMaritalStatus, BACKEND_DOMAIN }: IContainerRegisterProps) {
    const [page, setPage] = useState(0)
    const [userForm, setUserForm] = useState<CreateUserFormData | null>(null)
    const [adressesForm, setAdressesForm] = useState<IFormAdresses[]>([])
    const [contactsForm, setContactsForm] = useState<IFormContacts[]>([])
    const [emailsForm, setEmailsForm] = useState<IFormEmail[]>([])
    const [userStatus, setUserStatus] = useState(user ? user.Status : true)
    const [avatar, setAvatar] = useState<string>("")
    const [picture, setPicture] = useState<string | File>("")

    function setValuePicture(value: string | File) {
        setPicture(value)
    }

    function setValueAvatar(value: string) {
        setAvatar(value)
    }

    function changeUserStatus(status: boolean) {
        setUserStatus(status)
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
        setEmailsForm(value)

        if (userForm == null || !isFetchRequest) {
            return
        }

        const { name, lastName, birthDate, mother, father, admission, dismissal, position, id_credor, educationStatus, maritalStatus, permission } = userForm
    
        const adressesFormat: IAdressesFormat[] = []
        const contactsFormat: IContactsFormat[] = []
        const emailsFormat: IEmailFormat[] = []

        adressesForm.map((item) => {
            adressesFormat.push({
                idAddress: String(item.id).length == 0 ? null : Number(item.id),
                address: item.address,
                address2: item.address2,
                postalCode: item.postalCode,
                country: item.country,
                neighborhood: item.neighborhood,
                city: item.city,
                states: item.states,
                status: item.status == "" ? true : item.status == true ? true : false
            })
        })

        contactsForm.map((item) => {
            contactsFormat.push({
                idContact: item.id!.length == 0 ? null : Number(item.id),
                ddd: Number(item.ddd),
                phone: item.phone,
                status: item.status == "" ? true : item.status == true ? true : false,
                type: item.type
            })
        })

        value.map((item) => {
            emailsFormat.push({
                idEmail: item.id!.length == 0 ? null : Number(item.id),
                email: item.userEmail,
                status: item.status == "" ? true : item.status == true ? true : false
            })
        })

        const objectValues = {
            user: {
                idUser: Number(idUser),
                name,
                lastName,
                statusUser: userStatus,
                birthDate,
                mother: mother.length == 0 ? null : mother,
                father: father.length == 0 ? null : father,
                admission,
                dismissal: dismissal.length == 0 ? null : dismissal,
                position,
                id_credor: Number(id_credor),
                educationStatus: Number(educationStatus),
                maritalStatus: Number(maritalStatus),
                permission: Number(permission),
                profilePicture: null
            },
            address: adressesFormat,
            contact: contactsFormat,
            userEmail: emailsFormat
        }

        const result = await updateUser<typeof objectValues>(objectValues, user!.UserName, String(user!.Id_User))

        if (!result.status) {
            toast.error("Houve um erro na atualização do usuário")

            return
        }

        const formData = new FormData()
        formData.append("picture", picture)

        if (picture != "") {
            await uploadImageOfUser(user!.UserName, formData, true)
        }

        toast.success("Usuário atualizado com sucesso!", {
            duration: 7000
        })

        setPage(0)
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
                {page == 0 && <FormUser BACKEND_DOMAIN={BACKEND_DOMAIN} userMaritalStatus={userMaritalStatus} userEducation={userEducation} userRoles={userRoles} changeUserStatus={changeUserStatus} userStatus={userStatus} user={user} userForm={userForm} creditors={creditors} updatePage={updatePage} setUserFormValue={setUserFormValue} avatar={avatar} setAvatar={setValueAvatar} setPicture={setValuePicture} />}
                {page == 1 && <FormAdresses userAdresses={userAdressesFormat!} adressesForm={adressesForm} setAdressesFormValue={setAdressesFormValue} updatePage={updatePage} />}
                {page == 2 && <FormContacts userContacts={userContactsFormat!} contactsForm={contactsForm} setContactsFormValue={setContactsFormValue} updatePage={updatePage} />}
                {page == 3 && <FormEmail userEmails={userEmailsFormat!} emailsForm={emailsForm} setEmailsFormValue={setEmailsFormValue} updatePage={updatePage} />}
            </section>

            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
        </div>
    )
}