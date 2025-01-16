import { getAllOperatorsInAbsenteeism } from "@/api/absenteeism/getAllOperatorsInAbsenteeism";
import { getAllCreditors } from "@/api/generics/getAllCreditors";
import { getAllOperators } from "@/api/generics/getAllOperators";
import { TableAbsenteeism } from "@/components/absenteeism/TableAbsenteeism";
import { PaperBlock } from "@/components/PaperBlock";
import { TextPrincipal } from "@/components/TextPrincipal";
import { ICreditorGetAllCreditors } from "@/interfaces/generics/GetAllCreditors";
import { Toaster } from "react-hot-toast";

export default async function Page() {

    const operatorsResponse = await getAllOperatorsInAbsenteeism()
    const creditors: ICreditorGetAllCreditors[] = await getAllCreditors()
    const operators = await getAllOperators()

    return (
        <PaperBlock>
            <TextPrincipal text="Absenteísmo" />

            <TableAbsenteeism 
                creditors={creditors}
                operators={operators}
                operatorsInAbsenteeism={operatorsResponse.data} 
            />

            <Toaster 
                position="bottom-right"                
                reverseOrder={false}
            />
        </PaperBlock>
    )

}
