import { getAllCompany } from "@/api/generics/getAllCompany";
import { getUserEducation } from "@/api/user/getUserEducation";
import { getUserMaritalStatus } from "@/api/user/getUserMaritalStatus";
import { getUserRoles } from "@/api/user/getUserRoles";
import { PaperBlock } from "@/components/PaperBlock";
import { ContainerRegister } from "@/components/user/register/ContainerRegister";
import { IResultDefaultResponse } from "@/interfaces/Generics";
import { ICreditors } from "@/interfaces/generics/Creditors";
import { IUserEducation, IUserMaritalStatus, IUserRoles } from "@/interfaces/user/register/ContainerRegisterProps";

export default async function Register() {

    const creditors: ICreditors[] = await getAllCompany()
    const userRoles: IResultDefaultResponse<IUserRoles[] | []> = await getUserRoles()
    const userEducation: IResultDefaultResponse<IUserEducation[] | []> = await getUserEducation()
    const userMaritalStatus: IResultDefaultResponse<IUserMaritalStatus[] | []> = await getUserMaritalStatus()
    const BACKEND_DOMAIN = process.env.BACKEND_DOMAIN

    return (
        <PaperBlock>
            <ContainerRegister BACKEND_DOMAIN={BACKEND_DOMAIN!} userMaritalStatus={userMaritalStatus.data!} userEducation={userEducation.data!} userRoles={userRoles.data!} creditors={creditors} />
        </PaperBlock>
    )
}