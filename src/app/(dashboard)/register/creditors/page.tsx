import { getAllCreditors } from "@/api/generics/getAllCreditors"
import { PaperBlock } from "@/components/PaperBlock"
import { TextPrincipal } from "@/components/TextPrincipal"
import { CreditorTable } from "@/components/register/creditor/CreditorTable"
import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { ICreditorGetAllCreditors } from "@/interfaces/generics/GetAllCreditors"
import { GetUserToken } from "@/utils/GetUserToken"

export default async function registerCreditor() {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const registerCreditor: ICreditorGetAllCreditors[] = await getAllCreditors(userParse.accessToken)

    return (
        <PaperBlock>
            <TextPrincipal text="Credores" />

            <CreditorTable
                Creditors={registerCreditor}
            />
        </PaperBlock>
    )
}