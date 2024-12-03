interface IUserProps {
    Id_User: number,
    Name: string,
    Last_Name: string,
    UserName: string,
    Mother: string,
    Father: string,
    Birth_Date: string,
    Admission: string,
    Dismissal: null | string,
    Position: string,
    Permission_Level_Id: number,
    Marital_Status_Id: number,
    Education_Level_Id: number,
    id_credor: number,
    Status: boolean,
    Id_User_Turn: number
    UsersAddresses: IUserAdresses[]
    UsersContacts: IUserContacts[]
    UsersEmail: IUsersEmail[]
}

interface IUserAdresses {
    Address: string
    Address_2: string | null
    City: string
    Country: string
    Id_Address: number
    Neighborhood: string
    Postal_Code: string
    States: string
    Status: boolean
}

interface IUserContacts {
    Id_Contacts: number
    DDD: number
    Phone: number
    Status: boolean
    Type: "Residencial" | "Pessoal" | null
}

interface IUsersEmail {
    Id_Email: number
    Email: string
    Status: boolean
}

export type { IUserProps, IUserAdresses, IUserContacts, IUsersEmail }