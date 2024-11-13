import { getAllUniqueCreditors } from "@/api/generics/getAllUniqueCreditors"
import { Ancora } from "@/components/Ancora"
import { PaperBlock } from "@/components/PaperBlock"
import { TextPrincipal } from "@/components/TextPrincipal"
import { SectionTable } from "@/components/register/unique-creditor/SectionTable"
import { IUniqueCreditor } from "@/interfaces/register/unique-creditor/IUniqueCreditor"

export default async function registerCreditor() {

    const uniqueCreditors: IUniqueCreditor[] = await getAllUniqueCreditors()

    return (
        <PaperBlock>
            <TextPrincipal text="Credores" />

            <SectionTable 
                creditors={uniqueCreditors}
            />

            <Ancora
                title="Voltar"
                toGo="/register"
                styles={`m-1 mt-8 w-16`}
            />
        </PaperBlock>
    )
}