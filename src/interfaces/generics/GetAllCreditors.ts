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
    DisabledCreditors: ICreditorGetAllCreditors[]
}

export type { ICreditorGetAllCreditors, ICreditorTable }