import { getAllCreditors } from "@/api/generics/getAllCreditors"
import { Ancora } from "@/components/Ancora"
import { PaperBlock } from "@/components/PaperBlock"
import { TextPrincipal } from "@/components/TextPrincipal"
import { CreditorTable } from "@/components/register/creditor/CreditorTable"
import { ICreditorGetAllCreditors } from "@/interfaces/generics/GetAllCreditors"

export default async function registerCreditor() {
    const registerCreditor: ICreditorGetAllCreditors[] = await getAllCreditors()

    return (
        <PaperBlock>
            <TextPrincipal text="Credores" />

            <CreditorTable
                Creditors={registerCreditor}
            />

            <Ancora
                title="Voltar"
                toGo="/register"
                styles={`m-1 mt-8 w-16`}
            />
        </PaperBlock>
    )
}