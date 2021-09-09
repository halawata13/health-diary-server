import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';

export class DiarySymptomCreateDto {
  @IsOptional()
  @IsNumber()
  symptomId?: number;

  @IsNotEmpty()
  @IsNumber()
  level: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  color?: string;
}

export class DiarySymptomDeleteDto {
  @IsNotEmpty()
  @IsNumberString()
  id: number;
}
