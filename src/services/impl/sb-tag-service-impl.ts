import { SBTagService } from "../interface/sb-tag-service";
import { injectable } from "inversify";

@injectable()
export class SBTagServiceImpl implements SBTagService {

    private __tagSnapShot:any = new Object();
    private __tagList: any = new Array();

    pushTag(result: Object, prefix: String, deep?: Boolean | undefined) {
        let tagArray = Object.values(result);
        let prefixTagArr = tagArray.map(i => prefix.toString() + i)
        this.__tagSnapShot[prefix.toString()] = prefixTagArr; 
        this.calculateTags();
    }    
    removeTag(prefix: String) {
        this.__tagSnapShot[prefix.toString()] = null;
        this.calculateTags();
    }
    removeAllTags() {
        this.__tagSnapShot = new Object();
        this.calculateTags();
    }
    getAllTags() {
        return this.__tagList;
    }
    calculateTags() {
        let tag2DArray:any[] = Object.values(this.__tagSnapShot);
        this.__tagList = [].concat.apply([], tag2DArray);
    }
    getTags(prefix: String) {
        return this.__tagSnapShot[prefix.toString()];
    }


}