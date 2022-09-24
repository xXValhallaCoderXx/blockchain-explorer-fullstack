import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateTransactionDTO {
  @IsNotEmpty()
  @IsString()
  tag: string;

  @IsNotEmpty()
  @IsString()
  from: string;

  @IsNotEmpty()
  @IsString()
  to: string;

  @IsNotEmpty()
  @IsString()
  amount: string;

  @IsNotEmpty()
  @IsString()
  direction: string;

  @IsNotEmpty()
  @IsDateString()
  date: string;
}

export class FetchTransactionParams {
  @IsDateString()
  date: string;
}
