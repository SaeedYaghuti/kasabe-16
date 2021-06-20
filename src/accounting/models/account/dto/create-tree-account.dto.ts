import { IsNotEmpty, IsOptional, IsInt, IsString } from 'class-validator';
export class CreateTreeAccountDto {
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
  parent: CreateTreeAccountDto;

  @IsOptional()
  children: CreateTreeAccountDto[];

}

// parameters: { title, titleArb, titlePer, description, parentId }
// @IsOptional()
// @IsInt()
// parentId: number;
