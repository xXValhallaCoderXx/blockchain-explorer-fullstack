import {
    Column,
    Model,
    Table,
    DataType,
    HasMany,
    Default,
  } from 'sequelize-typescript';
  import { Record } from '../record/record.model';
  
  @Table
  export class User extends Model<User> {
    @Column({
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    })
    email: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    password: string;
  
    @Default({ autoMove: false })
    @Column(DataType.JSONB)
    prefs!: object;
  
    @HasMany(() => Record)
    tasks: Record[];
  }