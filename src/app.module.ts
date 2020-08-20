import { Module } from '@nestjs/common';
import { ReservationsModule } from './reservation/reservations.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config';
import { LoggerModule } from './reservation/logger/logger.module';

@Module({
  imports: [ReservationsModule, LoggerModule, MongooseModule.forRoot(config.mongoUri, { useNewUrlParser: true })],
})
export class AppModule { }
