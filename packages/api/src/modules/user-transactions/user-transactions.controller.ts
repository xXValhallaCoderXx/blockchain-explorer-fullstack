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
import { FetchTransactionParams, CreateTransactionDTO } from './user-transactions.dto';

@Controller('user-transactions')
export class UserTransactionsController {
  constructor(private userTxService: UserTransactionsService) {}

  // List all user tx
  @UseGuards(JwtAuthGuard)
  @Get('')
  async fetchAllUserTasks(@Request() req, @Query() query: FetchTransactionParams) {
    return this.userTxService.findAll(req, query);
  }

  // Create a tx
  @UseGuards(JwtAuthGuard)
  @Post('')
  async createTask(@Body() body, @Request() req) {
    return this.userTxService.create(body, req);
  }
}
