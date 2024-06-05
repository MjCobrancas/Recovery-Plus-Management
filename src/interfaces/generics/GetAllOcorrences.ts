interface IGetAllOcorrences {
    ocorrence: IOcorrence[]
}

interface IOcorrence {
    Id_Ocorrence: number
    Ocorrence: string
    Status_Name: string
    Id_Status_Ocorrence: number
    cpc: boolean
    Status: boolean
}

export type { IGetAllOcorrences, IOcorrence }