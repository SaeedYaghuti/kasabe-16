import { Transaction } from '../transaction/transaction.interface';
export interface Vouchre {
    id?: number;
    voucherNumber: number;
    date: Date;
    description: string;

    // transactions: Transaction[];
}

// parameters: { id, voucherNumber, date, description, transactions }
