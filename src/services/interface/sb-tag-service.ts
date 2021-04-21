export interface SBTagService {
    pushTag(result:Object, prefix:String,deep?:Boolean);
    removeTag(prefix:String);
    removeAllTags();
    getAllTags();
    getTags(prefix:String);
    appendTag(result:Object, prefix:String,deep?:Boolean);
    getTagAttributes();
    getTagAttributeValues();
    restoreTags(jsonString:string);
}