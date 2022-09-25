import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { UserTransactionsService } from './user-transactions.service';
import { CreateTransactionDTO, BulkCreateTxDTO } from './user-transactions.dto';

@Controller('user-transactions')
export class UserTransactionsController {
  constructor(private userTxService: UserTransactionsService) {}

  // List all user tx
  @UseGuards(JwtAuthGuard)
  @Get('')
  async fetchAllUsersTx(@Request() req, @Query() query) {
    return this.userTxService.findAll(req, query);
  }

  // Create a tx
  @UseGuards(JwtAuthGuard)
  @Post('')
  async createUserTx(@Body() body: CreateTransactionDTO, @Request() req) {
    return this.userTxService.create(body, req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('bulk')
  async createBulkTasks(@Body() body: BulkCreateTxDTO, @Request() req) {
    return this.userTxService.bulkCreate(body, req);
  }
}
