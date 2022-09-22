/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Record } from './record.model';
import { User } from 'src/modules/users/user.model';
import { CreateRecordDTO } from './record.dto';
@Injectable()
export class RecordService {
  constructor(
    @InjectModel(Record)
    private recordModel: typeof Record,
    // private userModel: typeof User,
  ) {}

  async findAll(req: any, query: any): Promise<Record[]> {
    return this.recordModel.findAll();
  }

  async create(data: CreateRecordDTO, req: any): Promise<any> {
    // const user = await this.userModel.findOne({
    //   where: {
    //     email: req.user.email,
    //   },
    // });
    // if (!user) {
    //   return null;
    // }

    return await this.recordModel.create<Record>(data);
  }
}
