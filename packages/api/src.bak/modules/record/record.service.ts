/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Record } from './record.model';
import { UsersService } from '../users/users.service';
import { CreateRecordDTO } from './record.dto';
@Injectable()
export class RecordService {
  constructor(
    @InjectModel(Record)
    private recordModel: typeof Record,
    private userService: typeof UsersService,
  ) {}

  async findAll(req: any, query: any): Promise<Record[]> {
    return this.recordModel.findAll();
  }

  async create(data: CreateRecordDTO, req: any): Promise<any> {
    // console.log("USER SERVICE: ", this.userService)
    // const user = await this.userService.findUserByEmail({
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
