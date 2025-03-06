import { IBackOffice } from "@/interfaces/generics/IBackOffice";
import { ICreditorsResponsables } from "./ICreditorsResponsables";

interface IContainerResponsableCreditorProps {
    backOffices: IBackOffice[]
    creditorsResponsables: ICreditorsResponsables[]
}

export type { IContainerResponsableCreditorProps }
