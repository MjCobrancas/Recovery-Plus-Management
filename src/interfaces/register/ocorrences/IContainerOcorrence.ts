import { IGetAllOcorrences } from "@/interfaces/generics/GetAllOcorrences";
import { IStatusOcorrence } from "./ICorrencePage";

interface IContainerOcorrenceProps {
    ocorrences: IGetAllOcorrences
    statusOcorrences: IStatusOcorrence[]
}

export type { IContainerOcorrenceProps }