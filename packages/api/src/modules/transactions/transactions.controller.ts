import {
  Controller,
  Query,
  Get,
  ValidationPipe,
  Post,
  UseGuards,
  Body,
  Request,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { GetTxQueryDTO } from './transactions.dto';

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
    return this.txService.getTransactionsByCount(query);
  }

  // Create a task
  @UseGuards(JwtAuthGuard)
  @Post('')
  async createTask(@Body() body: any, @Request() req) {
    return this.txService.create(body, req);
  }
}
