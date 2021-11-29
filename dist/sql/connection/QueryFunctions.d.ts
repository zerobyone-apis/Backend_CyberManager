import ResultObject from '../../src/utils/ResultObject';
export default class QueryFunctions {
    query(queryData: any, data: any[]): Promise<any>;
    get(queryData: any, data: any): Promise<ResultObject>;
    action(queryData: any, data: any): Promise<ResultObject>;
}
