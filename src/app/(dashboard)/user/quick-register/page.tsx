import { getAllCreditors } from "@/api/generics/getAllCreditors";
import { getUserRoles } from "@/api/user/getUserRoles";
import { Ancora } from "@/components/Ancora";
import { PaperBlock } from "@/components/PaperBlock";
import { TextPrincipal } from "@/components/TextPrincipal";
import { ContainerQuickRegister } from "@/components/user/quick-register/ContainerQuickRegister";
import { IResultDefaultResponse } from "@/interfaces/Generics";
import { ICreditorGetAllCreditors } from "@/interfaces/generics/GetAllCreditors";
import { IUserRoles } from "@/interfaces/user/register/ContainerRegisterProps";
import { Toaster } from "react-hot-toast";

export default async function Page() {

    const creditors: ICreditorGetAllCreditors[] = await getAllCreditors()
    const userRoles: IResultDefaultResponse<IUserRoles[] | []> = await getUserRoles()

    return (
        <PaperBlock>
            <TextPrincipal text="Cadastro rápido de usuário" />

            <ContainerQuickRegister userRoles={userRoles.data!} creditors={creditors} />

            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />

            <Ancora
                title="Voltar"
                toGo="/user"
                styles={`ml-1 mb-1 w-16`}
            />
        </PaperBlock>
    )
}