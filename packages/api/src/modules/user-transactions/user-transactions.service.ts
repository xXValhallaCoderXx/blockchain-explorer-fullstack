/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { UserTransaction } from './user-transactions.model';
import { CreateTransactionDTO } from './user-transactions.dto';
import { UsersService } from 'src/modules/user/users.service';

@Injectable()
export class UserTransactionsService {
  constructor(
    @InjectModel(UserTransaction)
    private userTxModel: typeof UserTransaction,
    private usersService: UsersService,
  ) {}

  async findAll(req: any, query: any): Promise<UserTransaction[]> {
    return this.userTxModel.findAll({
      where: {
        userId: req.user.id,
      },
      order: [['createdAt', 'ASC']],
    });
  }

  async create(data: CreateTransactionDTO, req: any): Promise<any> {
    const user = await this.usersService.findUserByEmail(req.user.email);
    if (!user) {
      return null;
    }

    return await this.userTxModel.create<UserTransaction>({
      ...data,
      userId: req.user.id,
    });
  }
}
