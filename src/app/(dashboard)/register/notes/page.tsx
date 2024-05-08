import { getAllNotes } from "@/api/register/notes/getAllNotes"
import { Ancora } from "@/components/Ancora"
import { PaperBlock } from "@/components/PaperBlock"
import { TextPrincipal } from "@/components/TextPrincipal"
import { EditNotesTable } from "@/components/register/notes/EditNotesTable"
import { IGetAllNotes } from "@/interfaces/register/notes/GetAllNotes"

export default async function RegisterNotes() {

    const notes: IGetAllNotes[] = await getAllNotes()

    return (
        <PaperBlock>
            <TextPrincipal text="Configure as notas" styles={`max-md:text-[2rem] mb-6`} />

            <EditNotesTable
                Notes={notes}
            />

            <Ancora
                title="Voltar"
                toGo="/register"
                styles={`ml-1 mb-1 mt-0 w-16`}
            />
        </PaperBlock>
    )
}