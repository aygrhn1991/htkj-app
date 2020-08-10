export class VehBase {
    vid: number;
    vin: string;
    vno: string;
    policy: number;
}
export class Pagination extends VehBase {
    loading: boolean = false;
    page: number = 1;
    limit: number = 10;
    total: number = 0;
}
export class Search extends Pagination {
    string1: string;
    string2: string;
    number1: number;
    number2: number;
    datetime1: Date;
    datetime2: Date;
    daterange: Array<Date>;
}
export class Result {
    successed: boolean;
    msg: string;
    data: any;
}