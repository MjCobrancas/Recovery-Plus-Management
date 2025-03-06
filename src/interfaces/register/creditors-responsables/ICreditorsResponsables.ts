interface ICreditorsResponsables {
    Id_Unique_Creditor: number
    Creditor: string
    Responsables: {
        Id_Responsable: number | null
        Name: string
    }[]
}

export type { ICreditorsResponsables }
