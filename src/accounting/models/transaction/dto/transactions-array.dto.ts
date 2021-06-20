import { IsNotEmpty, IsOptional, IsInt, IsString, IsDate, ValidateNested } from 'class-validator';
import { CreateTransactiontDto } from './create-transaction.dto';
export class TransactionsArrayDto {
  @IsNotEmpty()
  @ValidateNested()
  transactions: CreateTransactiontDto[];
}
