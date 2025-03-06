'use server'

import { getAllUniqueCreditors } from "@/api/generics/getAllUniqueCreditors";
import { getManagerUsers } from "@/api/register/tasks/getManagerUsers";
import { PaperBlock } from "@/components/PaperBlock";
import { ContainerTasks } from "@/components/register/tasks/ContainerTasks";
import { EditTask } from "@/components/register/tasks/EditTask";
import { TextPrincipal } from "@/components/TextPrincipal";
import { IManagerUsers } from "@/interfaces/register/tasks/IManagerUsers";
import { IUniqueCreditor } from "@/interfaces/register/unique-creditor/IUniqueCreditor";

export default async function Page() {

    const creditors: IUniqueCreditor[] = await getAllUniqueCreditors()
    const managerUsers: IManagerUsers[] = await getManagerUsers()

    return (
        <>
            <PaperBlock>
                <TextPrincipal text="Configure as tarefas " />
                
                <EditTask 
                    creditors={creditors}
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
