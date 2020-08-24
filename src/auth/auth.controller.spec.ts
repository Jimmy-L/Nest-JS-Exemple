import { TestingModule, Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { jwtConstants } from '../jwt';
import { LoggerModule } from '../logger/logger.module';
import { ReadUserDto } from 'src/users/dto/read-user.dto';

describe('Auth Services Controller', () => {
    let controller: AuthController;
    let service: AuthService;

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
                        uri: 'mongodb://localhost/auth',
                    }),
                }),
                LoggerModule
            ],
            controllers: [AuthController],
            providers: [AuthService],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        service = module.get<AuthService>(AuthService);

    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should call login method from service', async () => {
        const readUserDto: ReadUserDto = { username: 'username', password: 'pass' }
        const result = { access_token: 'access_token' };
        jest.spyOn(service, 'login').mockResolvedValue(result);
        expect(await controller.login(readUserDto)).toBe(result);
        expect(service.login).toBeCalledTimes(1);
        expect(service.login).toBeCalledWith(readUserDto);
    });

    it('should call getProfile method from service', async () => {
        const request = { headers: { authorization: 'Bearer token' } }
        const tokenDecoded = 'profile';
        jest.spyOn(service, 'getProfile').mockReturnValue(tokenDecoded);
        expect(await controller.getProfile(request)).toBe(tokenDecoded);
        expect(service.getProfile).toBeCalledTimes(1);
        expect(service.getProfile).toBeCalledWith('token');
    });

});
