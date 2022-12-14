import * as bcrypt from 'bcrypt';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDTO, UpdatePasswordDTO } from './user.dto';
import { InvalidCredentials } from 'src/exceptions/api-exceptions';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async remove(id: string): Promise<void> {
    const user = await this.userModel.findOne({ where: { id } });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    await user.destroy();
  }

  findUserByEmail(email: string): Promise<User> {
    const user = this.userModel.findOne({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  findUserById(id: string): Promise<User> {
    const user = this.userModel.findOne({
      where: {
        id,
      },
      attributes: ['id', 'email'],
    });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  async create(user: CreateUserDTO): Promise<User> {
    return await this.userModel.create<User>({
      ...user,
      email: user.email.toLowerCase(),
    });
  }

  private async verifyPassword(plainPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(
      plainPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new InvalidCredentials();
    }
  }

  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  async updatePassword(userId: any, body: UpdatePasswordDTO): Promise<User> {
    const user = await this.userModel.findOne({
      where: {
        id: userId,
      },
    });

    await this.verifyPassword(body.oldPassword.toString(), user.password);
    const hashedPassword = await this.hashPassword(body.newPassword.toString());
    user.password = hashedPassword;
    await user.save();
    return user;
  }
}
