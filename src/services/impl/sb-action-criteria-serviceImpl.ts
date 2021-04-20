import { injectable } from "inversify";
import { SBActionCriteriaService } from "../interface/sb-action-criteria-service";
import { Criteria } from "../../models/criteria";

@injectable()
export class SBActionCriteriaServiceImpl implements SBActionCriteriaService {

    evaluateCriteria(tags:Array<any>,criterias: Criteria[]): Criteria[] {
        let computedCriteriaList:Criteria[]  = new Array<Criteria>();
        criterias.forEach(criteria => {
            if(this.isCriteriaApplicable(tags,criteria)) {
                computedCriteriaList.push(criteria);
            }
        });
        return computedCriteriaList;
    }

    isCriteriaApplicable(tags:Array<any>, criteria: Criteria): boolean {
        var today = new Date();
        if(criteria.expiresAfter > today.getTime()) {
            switch(criteria.commandType) {
                case 'DEVICE_COMMAND':
                for(let i=0;i<criteria.targetDeviceIds.length;i++) {
                    if(tags.indexOf(criteria.targetDeviceIds[i])!= -1) {
                        return true;
                    }
                }
                break;
                case 'VERSION_COMMAND':
                break;
                case 'SEGMENT_COMMAND':
                    let tagCriteria = criteria.tagCriteria;
                    let tagFilters = criteria.tagFilters;
                    let valid = this.searchForTags(tagCriteria,tags,tagFilters);
                    return valid;
                break;
            }
        }
        return false;
    }

    searchForTags(tagCriteria:String,tags:Array<String>,tagFilters:Array<any>) {
        if(tagCriteria !=null && tags != null && tagFilters != null) {
            if(tagCriteria === "AND") {
                for(let i = 0;i < tagFilters.length;i++) {
                    if(tags.indexOf(tagFilters[i]) != -1) {
                    } else {
                        return false;
                    }
                }
                return true;
            } else if (tagCriteria === "OR") {
                for(let i = 0;i < tagFilters.length;i++) {
                    if(tags.indexOf(tagFilters[i]) != -1) {
                        return true;
                    }
                }
                return false;
            }
        }
        return false;
    }
}