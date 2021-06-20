import { IsNotEmpty, IsString } from 'class-validator';
export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  barcode: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
