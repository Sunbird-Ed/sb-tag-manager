export interface SBTagService {
    pushTag(result:Object, prefix:String,deep?:Boolean);
    removeTag(prefix:String);
    removeAllTags();
    getAllTags();
    getTags(prefix:String);
}