import { Criteria } from "../../models/criteria";
import { Observable } from "rxjs";

export interface SBActionCriteriaService {
    evaluateCriteria(tags:Array<any>,criterias:Array<Criteria>):Array<Criteria>;
}