import { TestingModule, Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { jwtConstants } from '../jwt';
import { LoggerModule } from '../reservation/logger/logger.module';

describe('Auth Services Controller', () => {
    let controller: AuthController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                UsersModule,
                JwtModule.register({
                    secret: jwtConstants.secret,
                    signOptions: { expiresIn: '120s' },
                }),
                MongooseModule.forRootAsync({
                    useFactory: () => ({
                        uri: 'mongodb://localhost/nest',
                    }),
                }),
                LoggerModule
            ],
            controllers: [AuthController],
            providers: [AuthService],
        }).compile();

        controller = module.get<AuthController>(AuthController);

    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
