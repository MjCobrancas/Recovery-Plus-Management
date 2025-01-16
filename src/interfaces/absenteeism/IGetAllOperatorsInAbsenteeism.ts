interface IGetAllOperatorsInAbsenteeism {
    Id_User: number
    Name: string
    UserName: string
    Id_User_Turn: number
    Admission: string
    Creditor: string
    Id_Absenteeism_Schedule: number
    Is_On_Company: boolean
    Date: string
}

export type { IGetAllOperatorsInAbsenteeism }
