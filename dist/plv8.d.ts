declare let outPut: {
    "accountID": number;
    "title": string;
    "titleArb": string;
    "parentId": any;
    "debit": any;
    "credit": any;
    "debit_remain": any;
    "credit_remain": any;
    "children": ({
        "accountID": number;
        "title": string;
        "titleArb": string;
        "titlePer": string;
        "parentId": number;
        "debit": any;
        "credit": any;
        "debit_remain": any;
        "credit_remain": any;
        "children": {
            "accountID": number;
            "title": string;
            "titleArb": string;
            "titlePer": string;
            "parentId": number;
            "debit": number;
            "credit": number;
            "debit_remain": number;
            "credit_remain": number;
            "children": any[];
        }[];
    } | {
        "accountID": number;
        "title": string;
        "titleArb": string;
        "titlePer": string;
        "parentId": number;
        "debit": number;
        "credit": number;
        "debit_remain": number;
        "credit_remain": number;
        "children": any[];
    })[];
}[];
interface ObjectIF {
    accountID: number;
    title: string;
    titleArb: string;
    parentId: number;
    debit: number;
    credit: number;
    debit_remain: number;
    credit_remain: number;
    children: ObjectIF[];
}
declare function f8_get_calculated_account_tree(data: any): any;
declare const result: any;
