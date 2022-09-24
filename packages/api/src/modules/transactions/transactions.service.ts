import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { GetTxQueryDTO, GetTxParamDTO } from './transactions.dto';
import { IExternalApiResponse, ITxItem } from './transaction.types';
import { ethers } from 'ethers';

@Injectable()
export class TransactionsService {
  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async getTransactionsByCount(query: GetTxQueryDTO): Promise<any> {
    const API_KEY = this.configService.get('API_KEY');
    const BASE_URL = this.configService.get('BASE_URL');

    const { txCount, chainId, addresses } = query;

    const parsedAddresses = addresses.split(',');

    const URL_PARAMS = `quote-currency=USD&format=JSON&block-signed-at-asc=false&no-logs=false&page-size=${txCount}&key=${API_KEY}`;

    // Barbaric way of doing this - but - POC ^^
    const apiResponse = {};
    console.log('HIT');
    for (const address of parsedAddresses) {
      try {
        console.log('MAKING CALL');
        const response = await this.httpService.axiosRef.get(
          `${BASE_URL}/${chainId}/address/${address}/transactions_v2/?${URL_PARAMS}`,
        );
        const parsedData = this.parseExternalApiResponse(response.data.data);
        console.log('END CALL');
        apiResponse[address] = parsedData;
        await new Promise((r) => setTimeout(r, 350));
      } catch (error) {
        console.log('error: ', error.response);
        // throw new HttpException(500, 'Timeout');
      }
    }
    console.log('DONE');
    return apiResponse;
  }

  private parseExternalApiResponse(data: IExternalApiResponse) {
    const parsedData = data.items.map((item) => {
      const sourceWallet = data.address;

      return {
        direction: sourceWallet === item.to_address ? 'recieving' : 'sending',
        from: item.from_address,
        to: item.to_address,
        amount: ethers.utils.formatEther(item.value),
        date: item.block_signed_at,
      };
    });

    return parsedData;
  }
}
