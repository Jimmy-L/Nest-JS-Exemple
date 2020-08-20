import { Module } from '@nestjs/common';
import { ReservationsModule } from './reservation/reservations.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config';
import { LoggerModule } from './reservation/logger/logger.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ReservationsModule, LoggerModule, MongooseModule.forRoot(config.mongoUri, { useNewUrlParser: true }), AuthModule, UsersModule],
})
export class AppModule { }
