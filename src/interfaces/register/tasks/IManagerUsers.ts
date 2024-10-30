interface IManagerUsers {
    Id_User: number
    Name: string
    Last_Name: string
    Permission_Level_Id: number
}

interface IManagerUsersData {
    managerUsers: IManagerUsers[]
}

export type { IManagerUsers, IManagerUsersData }