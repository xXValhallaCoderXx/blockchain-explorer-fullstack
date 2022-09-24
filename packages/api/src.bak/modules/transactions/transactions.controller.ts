import { Controller, Query, Get, Param, ValidationPipe } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { GetTxQueryDTO, GetTxParamDTO } from './transactions.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private txService: TransactionsService) {}

  @Get('')
  async getTransactionByCount(
    // NOTE - This query is messy can make this into a middleware
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query: GetTxQueryDTO,
  ) {
    console.log("QUERY ",query)
    return this.txService.getTransactionsByCount(query);
  }
}
