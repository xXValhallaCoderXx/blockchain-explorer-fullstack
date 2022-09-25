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
    const userTx = await this.userTxModel.findAll({
      where: {
        userId: req.user.id,
      },
      order: [['createdAt', 'ASC']],
    });

    const apiResponse = {};

    userTx.forEach((tx) => {
      // @ts-ignore
      const { direction, from, to, ...rest } = tx.dataValues;
      const address = direction === 'sending' ? from : to;
      const item = {
        address,
        direction,
        from,
        to,
        ...rest,
      };
      if (apiResponse[address]) {
        // Push tinto array
        apiResponse[address].push(item);
      } else {
        apiResponse[address] = [item];
      }
    });
    // @ts-ignore
    return apiResponse;
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

  async bulkCreate(data: any, req: any): Promise<any> {
    const user = await this.usersService.findUserByEmail(req.user.email);
    if (!user) {
      return null;
    }
    const injectUser = data.transactions.map((tx) => ({
      ...tx,
      userId: user.id,
    }));
    return await this.userTxModel.bulkCreate<UserTransaction>(injectUser);
  }
}
