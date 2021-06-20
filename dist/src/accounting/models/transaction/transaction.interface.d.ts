import { Vouchre } from '../voucher/voucher.interface';
export interface Transaction {
    id?: number;
    amount: number;
    debition: boolean;
    description: string;
    voucher: Vouchre;
    voucherId: number;
    account: Account;
    accountId: number;
}
