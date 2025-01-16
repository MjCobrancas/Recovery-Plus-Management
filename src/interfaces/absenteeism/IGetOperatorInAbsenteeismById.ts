import { IUserAdresses, IUserContacts, IUsersEmail } from "../user/User";
import { IGetAllOperatorsInAbsenteeism } from "./IGetAllOperatorsInAbsenteeism";

interface IGetOperatorInAbsenteeismById {
    userInfo: IGetOperatorInAbsenteeismUserInfo
    adresses: IUserAdresses[]
    contacts: IUserContacts[]
    emails: IUsersEmail[]
}

interface IGetOperatorInAbsenteeismUserInfo extends IGetAllOperatorsInAbsenteeism {
    Is_Justified_Absence: boolean
    Observation: string
}

export type { IGetOperatorInAbsenteeismById }
