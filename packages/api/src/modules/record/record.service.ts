/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Record } from './record.model';
import { CreateRecordDTO } from './record.dto';
@Injectable()
export class RecordService {
  constructor(
    @InjectModel(Record)
    private recordModel: typeof Record,
  ) {}

  async findAll(req: any, query: any): Promise<Record[]> {
    return this.recordModel.findAll();
  }

  async create(data: CreateRecordDTO, req: any): Promise<any> {
    // const user = await this.recordModel.findUserByEmail(req.user.email);
    // if (!user) {
    //   return null;
    // }

    return await this.recordModel.create<Record>(data);
  }
}
