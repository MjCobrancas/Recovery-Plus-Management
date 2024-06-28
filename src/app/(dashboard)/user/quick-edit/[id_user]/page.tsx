import { getAllCreditors } from "@/api/generics/getAllCreditors";
import { getUserInfo } from "@/api/user/quick-edit/getUserInfo";
import { Ancora } from "@/components/Ancora";
import { PaperBlock } from "@/components/PaperBlock";
import { TextPrincipal } from "@/components/TextPrincipal";
import { ContainerQuickEdit } from "@/components/user/quick-edit/ContainerQuickEdit";
import { IResultDefaultResponse } from "@/interfaces/Generics";
import { ICreditorGetAllCreditors } from "@/interfaces/generics/GetAllCreditors";
import { IGetUserInfo } from "@/interfaces/user/quick-edit/IGetUserInfo";
import { Toaster } from "react-hot-toast";

export default async function Page({ params }: { params: { id_user: string } }) {

    const user: IResultDefaultResponse<IGetUserInfo | null> = await getUserInfo(params.id_user)
    const creditors: ICreditorGetAllCreditors[] = await getAllCreditors()

    return (
        <PaperBlock>
            <TextPrincipal text="Edição rápida de usuário" />

            {user.data == null ? (
                <p className="text-2xl text-bold text-center text-red-500">Usuário não foi encontrado</p>
            ) : (
                <ContainerQuickEdit
                    creditors={creditors}
                    userInfo={user.data}
                />
            )}

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