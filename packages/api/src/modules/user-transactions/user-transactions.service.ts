/* eslint-disable @typescript-eslint/ban-ts-comment */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { UserTransaction } from './user-transactions.model';
import {
  CreateTaskDTO,
  UpdateTaskDTO,
  UpdateTaskParams,
  MoveIncompleteDTO,
  MoveTasksDTO,
} from './user-transactions.dto';
import { UsersService } from 'src/modules/user/users.service';
import moment = require('moment');

@Injectable()
export class UserTransactionsService {
  constructor(
    @InjectModel(UserTransaction)
    private userTxModel: typeof UserTransaction,
    private usersService: UsersService,
  ) {}

  async findAll(req: any, query: any): Promise<UserTransaction[]> {
    const TODAY_START = moment(query.date).format('YYYY-MM-DD 00:00');
    const NOW = moment(query.date).format('YYYY-MM-DD 23:59');
    return this.userTxModel.findAll({
      where: {
        userId: req.user.id,
        ...(query.date && {
          deadline: {
            [Op.between]: [TODAY_START, NOW],
          },
        }),
      },
      order: [['createdAt', 'ASC']],
      attributes: [
        'title',
        'completed',
        'createdAt',
        'id',
        'focus',
        'deadline',
      ],
    });
  }



  async findAllIncompleteDetailTasks(req: any): Promise<any[]> {
    const incompleteDates = await this.userTxModel.findAll({
      where: {
        userId: req.user.id,
        completed: false,
      },
      order: [['deadline', 'ASC']],
      attributes: [
        'title',
        'completed',
        'createdAt',
        'id',
        'focus',
        'deadline',
      ],
    });
    return incompleteDates;
  }

  async remove(id: string): Promise<void> {
    const task = await this.findOne(id);
    await task.destroy();
  }

  async findOne(id: string): Promise<UserTransaction> {
    const task = await this.userTxModel.findOne({
      where: {
        id,
      },
    });

    if (!task) throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    return task;
  }

  async create(data: CreateTaskDTO, req: any): Promise<any> {
    const user = await this.usersService.findUserByEmail(req.user.email);
    if (!user) {
      return null;
    }

    return await this.userTxModel.create<UserTransaction>({
      ...data,
      completed: false,
      userId: req.user.id,
      deadline: data.deadline,
    });
  }

  moveIncompleteTasks = async (body: MoveIncompleteDTO, req: any) => {
    const TODAY_START = moment(body.from).format('YYYY-MM-DD 00:00');
    const NOW = moment(body.from).format('YYYY-MM-DD 23:59');
    await this.userTxModel.update(
      { deadline: body.to },
      {
        where: {
          userId: req.user.id,
          deadline: {
            [Op.between]: [TODAY_START, NOW],
          },
          completed: false,
        },
      },
    );

    return {
      type: 'success',
      error: null,
      data: {},
    };
  };

  moveIncompleteTasks2 = async (body: MoveTasksDTO, req: any) => {
    await this.userTxModel.update(
      { deadline: body.to },
      {
        where: {
          userId: req.user.id,
          id: body.tasks,
          completed: false,
        },
      },
    );

    return {
      type: 'success',
      error: null,
      data: {},
    };
  };

  async updateTask(
    data: UpdateTaskDTO,
    req: any,
    param: UpdateTaskParams,
  ): Promise<any> {
    const [rowsUpdated] = await this.userTxModel.update<UserTransaction>(
      { ...data },
      { where: { id: param.id, userId: req.user.id } },
    );
    if (rowsUpdated === 1) {
      return {
        type: 'success',
        error: null,
        data: {},
      };
    } else {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
  }

  async deleteTask(req: any, param: UpdateTaskParams): Promise<any> {
    const rowsUpdated = await this.userTxModel.destroy({
      where: {
        id: param.id,
      },
    });
    if (rowsUpdated === 1) {
      return {
        type: 'success',
        error: null,
        data: {},
      };
    } else {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
  }
}
