import { Module } from '@nestjs/common';
import { ReservationsModule } from './reservation/reservations.module';
import { MongooseModule } from '@nestjs/mongoose';
import mongo from './mongo';
import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule, ReservationsModule, LoggerModule, MongooseModule.forRoot(mongo.mongoUri, { useNewUrlParser: true })],
})
export class AppModule { }
