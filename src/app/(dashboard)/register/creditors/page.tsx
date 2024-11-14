import { getAllCreditors } from "@/api/generics/getAllCreditors"
import { getAllDisabledCreditors } from "@/api/generics/getAllDisabledCreditors"
import { getAllUniqueCreditors } from "@/api/generics/getAllUniqueCreditors"
import { Ancora } from "@/components/Ancora"
import { PaperBlock } from "@/components/PaperBlock"
import { TextPrincipal } from "@/components/TextPrincipal"
import { CreditorTable } from "@/components/register/creditor/CreditorTable"
import { ICreditorGetAllCreditors } from "@/interfaces/generics/GetAllCreditors"
import { IUniqueCreditor } from "@/interfaces/register/unique-creditor/IUniqueCreditor"
import { Toaster } from "react-hot-toast"

export default async function registerCreditor() {
    const registerCreditor: ICreditorGetAllCreditors[] = await getAllCreditors()
    const creditorsUnique: IUniqueCreditor[] = await getAllUniqueCreditors()
    const disabledCreditors: ICreditorGetAllCreditors[] = await getAllDisabledCreditors()

    return (
        <PaperBlock>
            <TextPrincipal text="Equipes" />

            <CreditorTable
                Creditors={registerCreditor}
                CreditorsUnique={creditorsUnique}
                DisabledCreditors={disabledCreditors}
            />

            <Toaster 
                reverseOrder={false}
                position="bottom-right"
            />

            <Ancora
                title="Voltar"
                toGo="/register"
                styles={`m-1 mt-8 w-16`}
            />
        </PaperBlock>
    )
}