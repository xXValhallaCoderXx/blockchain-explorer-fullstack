import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { GetTxQueryDTO, GetTxParamDTO } from './transactions.dto';
import { IExternalApiResponse, ITxItem } from './transaction.types';
import { ethers } from 'ethers';
import { arrayChunker } from 'src/utils/array-parsers';
import { delay } from 'src/utils/generic-util';
@Injectable()
export class TransactionsService {
  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async getTransactionsByCountV2(query: GetTxQueryDTO): Promise<any> {
    const API_KEY = this.configService.get('API_KEY');
    const BASE_URL = this.configService.get('BASE_URL');

    const { txCount, chainId, addresses } = query;

    const parsedAddresses = addresses.split(',');

    const URL_PARAMS = `quote-currency=USD&format=JSON&block-signed-at-asc=false&no-logs=false&page-size=${txCount}&key=${API_KEY}`;

    // Simple batch runner
    const chunkedJobs = arrayChunker(parsedAddresses, 4);
    const apiResponse = {};

    for (let i = 0; i < chunkedJobs.length; i++) {
      const txJobBatch = chunkedJobs[i].map((address) => {
        return this.httpService.axiosRef.get(
          `${BASE_URL}/${chainId}/address/${address}/transactions_v2/?${URL_PARAMS}`,
        );
      });

      const txJobBatchResult = await Promise.all(txJobBatch);

      txJobBatchResult.forEach((response) => {
        const parsedData = this.parseExternalApiResponse(response.data.data);
        apiResponse[response.data.data.address] = parsedData;
      });

      await delay(1000);
    }

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
        tx_hash: item.tx_hash,
      };
    });

    return parsedData;
  }
}
