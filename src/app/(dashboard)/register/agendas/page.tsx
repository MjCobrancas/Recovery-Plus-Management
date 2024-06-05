import { getAllAgings } from "@/api/generics/getAllAgings";
import { getAllCreditors } from "@/api/generics/getAllCreditors";
import { getAllOcorrences } from "@/api/generics/getAllOcorrences";
import { Ancora } from "@/components/Ancora";
import { PaperBlock } from "@/components/PaperBlock";
import { TextPrincipal } from "@/components/TextPrincipal";
import { ContainerSchedule } from "@/components/register/agendas/ContainerSchedule";
import { IAgings } from "@/interfaces/generics/Agings";
import { ICreditorGetAllCreditors } from "@/interfaces/generics/GetAllCreditors";
import { IGetAllOcorrences } from "@/interfaces/generics/GetAllOcorrences";

export default async function Page() {
    const creditors: ICreditorGetAllCreditors[] = await getAllCreditors()
    const ocorrences: IGetAllOcorrences = await getAllOcorrences()
    const agings: IAgings[] = await getAllAgings()

    return (
        <PaperBlock>
            <TextPrincipal text="Configure as agendas" />

            <ContainerSchedule 
                creditors={creditors} 
                ocorrences={ocorrences} 
                agings={agings}
            />

            <Ancora
                title="Voltar"
                toGo="/register"
                styles={`m-1 w-16`}
            />
        </PaperBlock>
    )

}