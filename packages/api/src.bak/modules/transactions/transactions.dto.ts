import { IsNumberString, IsString } from 'class-validator';

export class GetTxQueryDTO {
  @IsNumberString()
  txCount: string;

  @IsString()
  chainId: string;

  @IsString()
  addresses: string;
}

export class GetTxParamDTO {
  @IsString()
  address: string;
}
