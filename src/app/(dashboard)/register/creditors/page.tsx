import { getAllCreditors } from "@/api/generics/getAllCreditors"
import { getAllDisabledCreditors } from "@/api/generics/getAllDisabledCreditors"
import { Ancora } from "@/components/Ancora"
import { PaperBlock } from "@/components/PaperBlock"
import { TextPrincipal } from "@/components/TextPrincipal"
import { CreditorTable } from "@/components/register/creditor/CreditorTable"
import { ICreditorGetAllCreditors } from "@/interfaces/generics/GetAllCreditors"

export default async function registerCreditor() {
    const registerCreditor: ICreditorGetAllCreditors[] = await getAllCreditors()
    const disabledCreditors: ICreditorGetAllCreditors[] = await getAllDisabledCreditors()

    return (
        <PaperBlock>
            <TextPrincipal text="Equipes" />

            <CreditorTable
                Creditors={registerCreditor}
                DisabledCreditors={disabledCreditors}
            />

            <Ancora
                title="Voltar"
                toGo="/register"
                styles={`m-1 mt-8 w-16`}
            />
        </PaperBlock>
    )
}