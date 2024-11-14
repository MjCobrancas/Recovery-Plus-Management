import { getAllDisabledUniqueCreditors } from "@/api/generics/getAllDisabledUniqueCreditors"
import { getAllUniqueCreditors } from "@/api/generics/getAllUniqueCreditors"
import { Ancora } from "@/components/Ancora"
import { PaperBlock } from "@/components/PaperBlock"
import { TextPrincipal } from "@/components/TextPrincipal"
import { SectionTable } from "@/components/register/unique-creditor/SectionTable"
import { IDisabledUniqueCreditor, IUniqueCreditor } from "@/interfaces/register/unique-creditor/IUniqueCreditor"

export default async function registerCreditor() {

    const uniqueCreditors: IUniqueCreditor[] = await getAllUniqueCreditors()
    const disabledUniqueCreditors: IDisabledUniqueCreditor[] = await getAllDisabledUniqueCreditors()

    console.log(uniqueCreditors)

    return (
        <PaperBlock>
            <TextPrincipal text="Credores" />

            <SectionTable 
                UniqueCreditors={uniqueCreditors}
                DisabledUniqueCreditors={disabledUniqueCreditors}
            />

            <Ancora
                title="Voltar"
                toGo="/register"
                styles={`m-1 mt-8 w-16`}
            />
        </PaperBlock>
    )
}