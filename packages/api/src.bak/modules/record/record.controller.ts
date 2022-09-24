import { Controller, Request, Get, UseGuards, Query, Post,Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { RecordService } from './record.service';
import { CreateRecordDTO } from './record.dto';

@Controller('records')
export class RecordController {
  constructor(private recordService: RecordService) {}

  // List all user tasks
  // @UseGuards(JwtAuthGuard)
  @Get('')
  async fetchAllUserTasks(@Request() req, @Query() query) {
    return this.recordService.findAll(req, query);
  }

  // // Create a task
  // @UseGuards(JwtAuthGuard)
  @Post('')
  async createTask(@Body() body: CreateRecordDTO, @Request() req) {
    return this.recordService.create(body, req);
  }
}
