import { getAllOcorrences } from "@/api/generics/getAllOcorrences";
import { getAllStatusOcorrences } from "@/api/register/ocorrences/getAllStatusOcorrences";
import { Ancora } from "@/components/Ancora";
import { PaperBlock } from "@/components/PaperBlock";
import { TextPrincipal } from "@/components/TextPrincipal";
import { ContainerOcorrence } from "@/components/register/ocorrences/ContainerOcorrence";
import { IResultDefaultResponse } from "@/interfaces/Generics";
import { IGetAllOcorrences } from "@/interfaces/generics/GetAllOcorrences";
import { IStatusOcorrence } from "@/interfaces/register/ocorrences/ICorrencePage";

export default async function Page() {
    const ocorrences: IGetAllOcorrences = await getAllOcorrences(true)
    const statusOcorrences: IResultDefaultResponse<IStatusOcorrence[]> = await getAllStatusOcorrences()

    return (
        <PaperBlock>
            <TextPrincipal text="Ocorrências" />

            <ContainerOcorrence ocorrences={ocorrences} statusOcorrences={statusOcorrences.data} />

            <Ancora
                title="Voltar"
                toGo="/register"
                styles={`m-1 mt-32 w-16`}
            />
        </PaperBlock>
    )
}