import { Module } from '@nestjs/common';
import { UserTransactionsService } from './user-transactions.service';
import { UserTransactionsController } from './user-transactions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserTransaction } from './user-transactions.model';
import { UsersModule } from 'src/modules/user/users.module';

@Module({
  imports: [SequelizeModule.forFeature([UserTransaction]), UsersModule],
  controllers: [UserTransactionsController],
  providers: [UserTransactionsService],
})
export class UserTxModule {}
