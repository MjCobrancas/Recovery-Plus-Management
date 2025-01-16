import { getAllCompany } from "@/api/generics/getAllCompany"
import { getAllUserRoles } from "@/api/generics/getAllUserRoles"
import { getUserById } from "@/api/user/edit/getUserById"
import { getAllUsersResponsables } from "@/api/user/getAllUsersResponsables"
import { getAllUsersResponsablesTechnicals } from "@/api/user/getAllUsersResponsablesTechnicals"
import { getUserEducation } from "@/api/user/getUserEducation"
import { getUserMaritalStatus } from "@/api/user/getUserMaritalStatus"
import { getUserTurns } from "@/api/user/getUserTurns"
import { PaperBlock } from "@/components/PaperBlock"
import { ContainerEdit } from "@/components/user/edit/ContainerEdit"
import { IResultDefaultResponse } from "@/interfaces/Generics"
import { ICreditors } from "@/interfaces/generics/Creditors"
import { IUserProps } from "@/interfaces/user/User"
import { IEditUserProps } from "@/interfaces/user/edit/EditUser"
import { IUserEducation, IUserMaritalStatus, IUserRoles, IUsersTurns } from "@/interfaces/user/register/ContainerRegisterProps"
import { IFormAdresses } from "@/interfaces/user/register/FormAdresses"
import { IFormContacts } from "@/interfaces/user/register/FormContacts"
import { IFormEmail } from "@/interfaces/user/register/FormEmail"

export default async function EditUser({ params }: IEditUserProps) {
    const creditors: ICreditors[] = await getAllCompany()
    const user: IUserProps = await getUserById(Number(params.idUser))
    const userRoles: IResultDefaultResponse<IUserRoles[] | []> = await getAllUserRoles()
    const userEducation: IResultDefaultResponse<IUserEducation[] | []> = await getUserEducation()
    const userMaritalStatus: IResultDefaultResponse<IUserMaritalStatus[] | []> = await getUserMaritalStatus()
    const BACKEND_DOMAIN = process.env.BACKEND_DOMAIN
    const usersTurns: IUsersTurns[] = await getUserTurns()
    const usersResponsables = await getAllUsersResponsables()
    const usersResponsablesTechnicals = await getAllUsersResponsablesTechnicals()

    const userAdresses: IFormAdresses[] = []
    const userContacts: IFormContacts[] = []
    const userEmails: IFormEmail[] = []
    
    if (user?.UsersAddresses.length > 0) {
        user?.UsersAddresses.map((item) => {
            userAdresses.push({
                address: item.Address,
                address2: String(item.Address_2) == "null" ? "" : String(item.Address_2),
                city: item.City,
                country: item.Country,
                id: String(item.Id_Address),
                neighborhood: item.Neighborhood,
                postalCode: item.Postal_Code,
                saved: true,
                states: item.States,
                status: item.Status,
            })
        })
    }

    if (user?.UsersContacts.length > 0) {
        user?.UsersContacts.map((item) => {
            userContacts.push({
                id: String(item.Id_Contacts),
                contact_owner: item.Contact_Owner == null ? "" : String(item.Contact_Owner),
                ddd: String(item.DDD),
                phone: String(item.Phone),
                saved: item.Contact_Owner == null ? false : true,
                type: String(item.Type),
                status: item.Status
            })
        })
    }

    if (user?.UsersEmail.length > 0) {
        user?.UsersEmail.map((item) => {
            userEmails.push({
                id: String(item.Id_Email),
                email_owner: item.Email_Owner == null ? "" : String(item.Email_Owner),
                userEmail: item.Email,
                saved: item.Email_Owner == null ? false : true,
                status: item.Status
            })
        })
    }

    return (
        <PaperBlock>
            <ContainerEdit 
                usersResponsables={usersResponsables.data}
                BACKEND_DOMAIN={BACKEND_DOMAIN!}
                userMaritalStatus={userMaritalStatus.data!}
                userEducation={userEducation.data!}
                userRoles={userRoles.data!}
                userAdressesFormat={userAdresses} 
                userContactsFormat={userContacts} 
                userEmailsFormat={userEmails} 
                creditors={creditors} 
                user={user} 
                idUser={params.idUser}
                usersTurns={usersTurns}
                usersResponsablesTechnicals={usersResponsablesTechnicals.data}
            />
        </PaperBlock>
    )
}
