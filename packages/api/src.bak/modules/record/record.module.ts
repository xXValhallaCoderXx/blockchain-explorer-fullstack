import { Module } from '@nestjs/common';
import { RecordService } from './record.service';

import { RecordController } from './record.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Record } from './record.model';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule, SequelizeModule.forFeature([Record])],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordModule {}
