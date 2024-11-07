'use server'

import { getAllCreditors } from "@/api/generics/getAllCreditors";
import { getManagerUsers } from "@/api/register/tasks/getManagerUsers";
import { PaperBlock } from "@/components/PaperBlock";
import { ContainerTasks } from "@/components/register/tasks/ContainerTasks";
import { EditTask } from "@/components/register/tasks/EditTask";
import { TextPrincipal } from "@/components/TextPrincipal";
import { ICreditorGetAllCreditors } from "@/interfaces/generics/GetAllCreditors";
import { IManagerUsers } from "@/interfaces/register/tasks/IManagerUsers";

export default async function Page() {

    const creditors: ICreditorGetAllCreditors[] = await getAllCreditors()
    const managerUsers: IManagerUsers[] = await getManagerUsers()

    return (
        <>
            <PaperBlock>
                <TextPrincipal text="Configure as tarefas " />
                
                <EditTask 
                    managerUsers={managerUsers}
                />

                <ContainerTasks 
                    creditors={creditors}
                    managerUsers={managerUsers}
                />

            </PaperBlock>
        </>
    )
}