import { Module } from '@nestjs/common';
import { RecordService } from './record.service';

import { RecordController } from './record.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Record } from './record.model';
import { User } from 'src/modules/users/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Record])],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordModule {}
