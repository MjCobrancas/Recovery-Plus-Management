import { getAllQuestions } from "@/api/register/questions/getAllQuestions";
import { PaperBlock } from "@/components/PaperBlock";
import { TextPrincipal } from "@/components/TextPrincipal";
import { ContainerQuestions } from "@/components/register/questions/ContainerQuestions";
import { IGetAllQuestions } from "@/interfaces/register/questions/IQuestions";

export default async function Page() {
    const questions: IGetAllQuestions[] = await getAllQuestions()

    return (
        <PaperBlock>
            <TextPrincipal text="Gerencie suas perguntas" />

            <ContainerQuestions questions={questions} />
        </PaperBlock>
    )
}