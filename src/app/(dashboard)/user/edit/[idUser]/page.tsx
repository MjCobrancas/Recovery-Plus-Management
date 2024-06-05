import { getAllCompany } from "@/api/generics/getAllCompany"
import { getUserById } from "@/api/user/edit/getUserById"
import { PaperBlock } from "@/components/PaperBlock"
import { ContainerEdit } from "@/components/user/edit/ContainerEdit"
import { ICreditors } from "@/interfaces/generics/Creditors"
import { IUserProps } from "@/interfaces/user/User"
import { IEditUserProps } from "@/interfaces/user/edit/EditUser"
import { IFormAdresses } from "@/interfaces/user/register/FormAdresses"
import { IFormContacts } from "@/interfaces/user/register/FormContacts"
import { IFormEmail } from "@/interfaces/user/register/FormEmail"

export default async function EditUser({ params }: IEditUserProps) {
    const creditors: ICreditors[] = await getAllCompany()
    const user: IUserProps = await getUserById(Number(params.idUser))

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
                ddd: String(item.DDD),
                phone: String(item.Phone),
                saved: true,
                type: String(item.Type),
                status: item.Status
            })
        })
    }

    if (user?.UsersEmail.length > 0) {
        user?.UsersEmail.map((item) => {
            userEmails.push({
                id: String(item.Id_Email),
                userEmail: item.Email,
                saved: true,
                status: item.Status
            })
        })
    }

    return (
        <PaperBlock>
            <ContainerEdit 
                userAdressesFormat={userAdresses} 
                userContactsFormat={userContacts} 
                userEmailsFormat={userEmails} 
                creditors={creditors} 
                user={user} 
                idUser={params.idUser}
            />
        </PaperBlock>
    )
}