import { SBTagService } from "../interface/sb-tag-service";
import { injectable } from "inversify";

@injectable()
export class SBTagServiceImpl implements SBTagService {

    private __tagSnapShot:any = new Object();
    private __tagList: any = new Array();
    private __tagObj: any = new Object();

    pushTag(result: Object, prefix: String, deep?: Boolean | undefined) {
        let linearArr = this.propertiesToArrayKeyValues(result);
        let tagArray = Object.values(linearArr);
        let prefixTagArr = tagArray.map(i => prefix.toString() + i)
        this.__tagSnapShot[prefix.toString()] = prefixTagArr; 
        this.__tagObj[prefix.toString()] = result;
        this.calculateTags();
    }    
    removeTag(prefix: String) {
        this.__tagSnapShot[prefix.toString()] = null;
        this.__tagObj[prefix.toString()] = null;
        this.calculateTags();
    }
    removeAllTags() {
        this.__tagSnapShot = new Object();
        this.__tagObj = new Object();
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

    getTagAttributes() {
        return this.propertiesToArray(this.__tagObj);
    }
    getTagAttributeValues() {
        return this.propertiesToArrayKeyValues(this.__tagObj);
    }

    appendTag(result: any, prefix: String, deep?: Boolean | undefined) {
        if(result instanceof Object) {
            let linearArr = this.propertiesToArrayKeyValues(result);
            let tagArray = Object.values(linearArr);
            let prefixTagArr = tagArray.map(i => prefix.toString() + i);
            if(this.__tagSnapShot[prefix.toString()] != null) {
                this.__tagSnapShot[prefix.toString()].concat(prefixTagArr);
            } else {
                this.__tagSnapShot[prefix.toString()] = prefixTagArr;
            }
            this.calculateTags();
        } else {
            let tagToBePushed = prefix.toString()+result.toString();
            if(this.__tagSnapShot[prefix.toString()] != null) {
                this.__tagSnapShot[prefix.toString()].push(tagToBePushed);
            } else {
                this.__tagSnapShot[prefix.toString()] = new Array();
                this.__tagSnapShot[prefix.toString()].push(tagToBePushed);
            }
        }
    }

    private propertiesToArray(obj: any) {
        const isObject = val =>
            typeof val === 'object' && !Array.isArray(val);
    
        const addDelimiter = (a, b) =>
            a ? `${a}.${b}` : b;
    
        const paths = (obj = {}, head = '') => {
            return Object.entries(obj)
                .reduce((product, [key, value]) => 
                    {
                        let fullPath = addDelimiter(head, key)
                        return isObject(value) ?
                            product.concat(paths(value, fullPath))
                        : product.concat(fullPath)
                    }, []);
        }
    
        return paths(obj);
    }

    private propertiesToArrayKeyValues(obj: any, prefix?) {

        var res = {};
    
        for (var k of Object.keys(obj)) {
            var val = obj[k],
                key = prefix ? prefix + '.' + k : k;
    
            if (typeof val === 'object')
                Object.assign(res, this.propertiesToArrayKeyValues(val, key)); // <-- recursion
            else
                res[key] = val;
        }
    
        return res;
    }
}