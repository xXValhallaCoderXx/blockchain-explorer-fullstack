import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Req,
  UseGuards,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { UserTransactionsService } from './user-transactions.service';
import {
  UpdateTaskParams,
  UpdateTaskDTO,
  CreateTaskDTO,
  FindOneParams,
  MoveIncompleteDTO,
  FetchTasksParams,
  MoveTasksDTO,
} from './user-transactions.dto';

@Controller('user-transactions')
export class UserTransactionsController {
  constructor(private userTxService: UserTransactionsService) {}

  // List all user tasks
  @UseGuards(JwtAuthGuard)
  @Get('')
  async fetchAllUserTasks(@Request() req, @Query() query: FetchTasksParams) {
    return this.userTxService.findAll(req, query);
  }

  // Create a task
  @UseGuards(JwtAuthGuard)
  @Post('')
  async createTask(@Body() body: CreateTaskDTO, @Request() req) {
    return this.userTxService.create(body, req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('incomplete-detail')
  async fetchAllUserIncompleteDetailTasks(@Request() req) {
    return this.userTxService.findAllIncompleteDetailTasks(req);
  }

  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @UseGuards(JwtAuthGuard)
  @Post('move-incomplete')
  async moveIncompleteTasks(@Body() body: MoveIncompleteDTO, @Req() req) {
    return this.userTxService.moveIncompleteTasks(body, req);
  }

  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @UseGuards(JwtAuthGuard)
  @Post('move-incomplete-array')
  async moveIncompleteTasksArray(@Body() body: MoveTasksDTO, @Req() req) {
    return this.userTxService.moveIncompleteTasks2(body, req);
  }

  // Update task by ID
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateTaskById(
    @Body() body: UpdateTaskDTO,
    @Req() req,
    @Param() param: UpdateTaskParams,
  ) {
    return this.userTxService.updateTask(body, req, param);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTaskById(@Req() req, @Param() param: UpdateTaskParams) {
    return this.userTxService.deleteTask(req, param);
  }

  // Find Task By ID
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findTaskById(@Param() { id }: FindOneParams) {
    return this.userTxService.findOne(id);
  }
}
