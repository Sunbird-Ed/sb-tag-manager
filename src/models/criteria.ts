export interface Criteria {
        commandId: number;
        expiresAfter: number,
        commandType: string,
        targetVersion: string,
        targetDeviceIds: Array<any>,
        tagFilters: Array<any>,
        tagFilterUpto: any,
        actionFunction: string,
        controlFunctionPayload: any,
        tagCriteria: string
};