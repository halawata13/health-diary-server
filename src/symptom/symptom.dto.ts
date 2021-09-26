import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class SymptomGetDto {
  @IsNotEmpty()
  @IsString()
  @IsNumberString()
  id: number;

  @IsOptional()
  @IsNumberString()
  fromYear: number;

  @IsOptional()
  @IsNumberString()
  fromMonth: number;

  @IsOptional()
  @IsNumberString()
  toYear: number;

  @IsOptional()
  @IsNumberString()
  toMonth: number;
}

export class SymptomCreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  color: string;
}

export class SymptomUpdateDto extends SymptomCreateDto {
  @IsNotEmpty()
  @IsNumberString()
  id: number;
}

export class SymptomDeleteDto {
  @IsNotEmpty()
  @IsNumberString()
  id: number;
}
