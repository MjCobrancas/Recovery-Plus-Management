import { IAgings } from "@/interfaces/generics/Agings"

interface IGetRelationCreditorsWithOcorrenceData {
    Creditor: string
    Description: string
    Id_Aging: number | string
    Id_Creditor: number | string
    Id_Creditors_Ocorrence: number | string
    Id_Ocorrence: number | string
    Ocorrence: string
    Quantity: number | string
    Status: boolean
}

interface IGetRelationCreditorsWithOcorrence {
    data: IGetRelationCreditorsWithOcorrenceData[] | null
    status: boolean
}

interface ICreditorRelationFilterAgings {
    agings: IAgings[]
    creditor: string
    id_creditor: number
    id_creditors_ocorrence: number
    id_ocorrence: string
}

interface ICreditorRelationFilterAgingsForm extends ICreditorRelationFilterAgings {
    quantity: string
    id_aging: string
    new: boolean
}

export type { IGetRelationCreditorsWithOcorrence, IGetRelationCreditorsWithOcorrenceData, ICreditorRelationFilterAgings, ICreditorRelationFilterAgingsForm }