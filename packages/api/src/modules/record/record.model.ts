import {
    Column,
    Model,
    Table,
    DataType,
  //   ForeignKey,
  //   BelongsTo,
  } from 'sequelize-typescript';
  //   import { User } from '../user/user.model';
  // import { Category } from '../categories/categories.model';
  
  @Table
  export class Record extends Model<Record> {
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

    
  
    // @ForeignKey(() => User)
    // @Column({
    //   type: DataType.INTEGER,
    //   allowNull: false,
    // })
    // userId: number;
  
    // @BelongsTo(() => User, 'userId')
    // user: User;
  
    // @ForeignKey(() => Category)
    // @Column({
    //   type: DataType.INTEGER,
    //   allowNull: false,
    // })
    // categoryId: number;
  
    // @BelongsTo(() => Category, 'categoryId')
    // category: Category;
  }
  