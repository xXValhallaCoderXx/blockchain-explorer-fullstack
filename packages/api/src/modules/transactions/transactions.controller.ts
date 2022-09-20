import { Controller, Request, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private txService: TransactionsService) {}

  @Get('')
  async updatePrefs(@Request() req) {
    return this.txService.testService();
  }
}
