import { TranCode } from '../tran-code.enum';
export declare class CreateTransactionItemDto {
    quantity: number;
    price: number;
    description: string;
    itemId: number;
    tranCode: TranCode;
}
