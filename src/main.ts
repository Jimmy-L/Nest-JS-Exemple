import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ReservationsModule } from './reservation/reservations.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'reservations';
  // app.setGlobalPrefix(globalPrefix);

  const options = new DocumentBuilder()
    .setTitle('Reservations API')
    .setDescription('The reservation API description')
    .setVersion('0.1')
    .addTag('reservations')
    .addServer('http://localhost:3000')
    // .addServer('https://development-259117.appspot.com/api')
    .build();

  const reservationDocument = SwaggerModule.createDocument(app, options, {
    include: [AuthModule, UsersModule, ReservationsModule]
  });
  SwaggerModule.setup('/api-documentation', app, reservationDocument);

  await app.listen(3000);
}
bootstrap();
