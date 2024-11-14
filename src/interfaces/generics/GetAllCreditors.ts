import { IUniqueCreditor } from "../register/unique-creditor/IUniqueCreditor"

interface ICreditorGetAllCreditors {
    Id_Creditor: number
    Identifier: number
    Creditor: string
    Number_Operators: number
    Working_Days: number
    Returns: string
    Target: number
}

interface ICreditorTable {
    Creditors: ICreditorGetAllCreditors[]
    CreditorsUnique: IUniqueCreditor[]
    DisabledCreditors: ICreditorGetAllCreditors[]
}

export type { ICreditorGetAllCreditors, ICreditorTable }