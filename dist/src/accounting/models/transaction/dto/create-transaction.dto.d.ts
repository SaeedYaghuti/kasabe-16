import { CreateTransactionItemDto } from './create-transaction-item.dto';
export declare class CreateTransactiontDto {
    amount: number;
    debition: boolean;
    description: string;
    accountId: number;
    transactionItems: CreateTransactionItemDto[];
}
