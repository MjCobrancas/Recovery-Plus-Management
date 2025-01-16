import { ICreditorGetAllCreditors } from "../generics/GetAllCreditors";
import { IGetAllOperators } from "../generics/IGetAllOperators";
import { IGetAllOperatorsInAbsenteeism } from "./IGetAllOperatorsInAbsenteeism";

interface ITableAbsenteeismProps {
    creditors: ICreditorGetAllCreditors[]
    operators: IGetAllOperators[]
    operatorsInAbsenteeism: IGetAllOperatorsInAbsenteeism[]
}

export type { ITableAbsenteeismProps }
