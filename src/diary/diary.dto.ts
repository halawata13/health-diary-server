import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, ValidateNested } from 'class-validator';
import { DiarySymptomCreateDto, DiarySymptomDeleteDto } from '../diary-symptom/diary-symptom.dto';
import { Type } from 'class-transformer';

export class DiaryGetDto {
  @IsNotEmpty()
  @IsNumberString()
  year: number;

  @IsNotEmpty()
  @IsNumberString()
  month: number;
}

export class DiaryCreateDto {
  @IsOptional()
  @IsString()
  memo: string;

  @IsNotEmpty()
  @IsNumber()
  condition: number | null;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @Type(() => DiarySymptomCreateDto)
  @ValidateNested({ each: true })
  symptoms: DiarySymptomCreateDto[];

  @IsNotEmpty()
  @Type(() => DiarySymptomDeleteDto)
  @ValidateNested({ each: true })
  deleteSymptoms: DiarySymptomDeleteDto[];
}

export class DiaryUpdateDto extends DiaryCreateDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
