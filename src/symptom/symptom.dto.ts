import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class SymptomGetDto {
  @IsNotEmpty()
  @IsString()
  @IsNumberString()
  id: number;
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
