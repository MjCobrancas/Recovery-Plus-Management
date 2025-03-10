interface IncompleteUserValues {
    Id_User: number
    Last_Name: string
    Name: string
    Position: string
    UserName: string
    Status?: boolean
    Is_User_Data_Updated: boolean
}

interface IncompleteUserValuesData {
    users: {
        data: IncompleteUserValues[]
        count: number
    } 
    skip: number
    take: number
    count: number
}

interface IUserContainerCard {
    all: IncompleteUserValuesData
    backend_domain: string
    token: string
    countQuantityUsersNotUpdate: number
}

interface IUserCard extends IncompleteUserValues {
    Backend_Domain: string
}

export type { IncompleteUserValues, IncompleteUserValuesData, IUserCard, IUserContainerCard }