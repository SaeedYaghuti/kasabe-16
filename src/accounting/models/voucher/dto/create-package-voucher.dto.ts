import { IsNotEmpty, IsOptional, IsInt, IsString, IsDate, ValidateNested } from 'class-validator';
import { CreateTransactiontDto } from '../../transaction/dto/create-transaction.dto';
export class CreatePackageVoucherDto {
  // @IsNotEmpty()
  // @IsDate()
  // date: Date;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @ValidateNested()
  transactions: CreateTransactiontDto[];
}
// parameters: { date, description, transactions}
