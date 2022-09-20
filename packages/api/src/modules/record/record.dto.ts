import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  IsDateString,
} from 'class-validator';

export class CreateRecordDTO {
  @IsNotEmpty()
  @IsString()
  from: string;

  @IsNotEmpty()
  @IsString()
  to: string;

  @IsNotEmpty()
  @IsString()
  direction: string;

  @IsNotEmpty()
  @IsString()
  @IsNumberString()
  amount: string;

  @IsNotEmpty()
  @IsDateString()
  date: string;
}
