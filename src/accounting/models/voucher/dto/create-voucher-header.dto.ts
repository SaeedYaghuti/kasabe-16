import { IsNotEmpty, IsOptional, IsInt, IsString, IsDate, ValidateNested } from 'class-validator';
import { CreateTransactiontDto } from '../../transaction/dto/create-transaction.dto';
export class CreateVoucherHeaderDto {
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsOptional()
  @IsString()
  description: string;
}
// parameters: { date, description}
