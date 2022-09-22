import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../users/user.model';

@Table
export class Record extends Model<Record> {
  // Should be relation or very least ENUM
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  tag: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  from: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  to: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  amount: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  direction: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User, 'userId')
  user: User;
}
