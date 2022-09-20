import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionsService {
  constructor() {}

  //   async findAll(): Promise<User[]> {
  //     return this.userModel.findAll();
  //   }

  testService(): any {
    return { hello: 'world' };
  }
}
