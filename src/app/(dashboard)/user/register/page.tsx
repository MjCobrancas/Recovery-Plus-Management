import { getAllCompany } from "@/api/generics/getAllCompany";
import { PaperBlock } from "@/components/PaperBlock";
import { ContainerRegister } from "@/components/user/register/ContainerRegister";
import { ICreditors } from "@/interfaces/generics/Creditors";

export default async function Register() {

    const creditors: ICreditors[] = await getAllCompany()

    return (
        <PaperBlock>
            <ContainerRegister creditors={creditors} />
        </PaperBlock>
    )
}