import { IAgings } from "@/interfaces/generics/Agings";
import { ICreditorGetAllCreditors } from "@/interfaces/generics/GetAllCreditors";
import { IGetAllOcorrences } from "@/interfaces/generics/GetAllOcorrences";

interface IContainerScheduleProps {
    creditors: ICreditorGetAllCreditors[]
    ocorrences: IGetAllOcorrences
    agings: IAgings[]
}

export type { IContainerScheduleProps }