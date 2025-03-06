import { getAllBackoffices } from "@/api/generics/getAllBackoffices";
import { getAllCreditorsResponsable } from "@/api/register/creditor-responsable/getAllCreditorsResponsable";
import { Ancora } from "@/components/Ancora";
import { PaperBlock } from "@/components/PaperBlock";
import { ContainerResponsableCreditor } from "@/components/responsable-creditor/ContainerResponsableCreditor";
import { TextPrincipal } from "@/components/TextPrincipal";

export default async function Page() {

    const backOffices = await getAllBackoffices()
    const creditorsResponsables = await getAllCreditorsResponsable()

    return (
        <PaperBlock
            styles="relative"
        >
            <TextPrincipal text="Responsáveis por carteira" />

            <ContainerResponsableCreditor 
                backOffices={backOffices}
                creditorsResponsables={creditorsResponsables}
            />

            <Ancora 
                title="Voltar"
                toGo="/register"
                styles="absolute left-1 bottom-1"
            />
        </PaperBlock>
    )

}