import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { RecordModule } from './modules/record/record.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      // sync: {
      //   force: true,
      // },
      synchronize: true,
      autoLoadModels: true,
      dialectOptions: {
        ...(process.env.NODE_ENV !== 'develop' && {
          ssl: {
            rejectUnauthorized: false,
          },
        }),
      },
    }),
    AuthModule,
    UsersModule,
    RecordModule,
    TransactionsModule,
  ],
})
export class AppModule {}
