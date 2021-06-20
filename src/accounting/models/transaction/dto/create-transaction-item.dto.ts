import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsBoolean, ValidateNested, IsArray } from 'class-validator';
import { TranCode } from '../tran-code.enum';
export class CreateTransactionItemDto {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  itemId: number;

  @IsNotEmpty()
  tranCode: TranCode;
}

// quantity, price, description, itemId
