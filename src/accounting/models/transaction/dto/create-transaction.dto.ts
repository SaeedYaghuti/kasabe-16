import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsBoolean, ValidateNested, IsArray } from 'class-validator';
import { CreateTransactionItemDto } from './create-transaction-item.dto';
export class CreateTransactiontDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsBoolean()
  debition: boolean;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  accountId: number;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  transactionItems: CreateTransactionItemDto[];  // Bill: row[]

}

// parameters: { amount, debition, description, accountId, }
