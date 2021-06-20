import { IsNotEmpty, IsOptional, IsInt, IsString } from 'class-validator';
export class CreateAccountDto {
  @IsNotEmpty()
  @IsString()
  title: string; // english

  @IsNotEmpty()
  @IsString()
  titleArb: string; // Arabic

  @IsNotEmpty()
  @IsString()
  titlePer: string; // Persian

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsInt()
  parentId: number;

}

// parameters: { title, titleArb, titlePer, description, parentId }
// @IsOptional()
// @IsInt()
// parentId: number;
