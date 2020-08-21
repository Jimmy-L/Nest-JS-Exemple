import { TestingModule, Test } from "@nestjs/testing";
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { LoggerModule } from '../reservation/logger/logger.module';
import { UsersService } from './users.service';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { fakeUser, User } from "./entity/user.model";
import { CreateUserDto } from './dto/create-user.dto';
import * as faker from 'faker';
import { LoggerService } from '../reservation/logger/logger.service';
import { InternalServerErrorException } from "@nestjs/common";

describe('Restaurant Services Controller', () => {
    let controller: UsersController;
    let service: UsersService;
    let logger: LoggerService;
    const user1 = fakeUser();
    const user2 = fakeUser();
    const user3 = fakeUser();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                AuthModule,
                MongooseModule.forRootAsync({
                    useFactory: () => ({
                        uri: 'mongodb://localhost/nest',
                    }),
                }),
                LoggerModule
            ],
            controllers: [UsersController],
            providers: [
                UsersService,
                LoggerService,
                {
                    provide: getModelToken('User'),
                    useClass: class UserModel { }
                }
            ]
        }).compile();

        controller = module.get<UsersController>(UsersController);
        service = module.get<UsersService>(UsersService);
        logger = module.get<LoggerService>(LoggerService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should be call findAll method from Service', async () => {
        const result = [user1, user2, user3];
        jest.spyOn(service, 'findAll').mockResolvedValue(result);
        expect(await controller.usersRegistered()).toBe(result);
        expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should catch error if findAll method from Service failed', async () => {
        jest.spyOn(service, 'findAll').mockRejectedValue(new Error('Internal Server Error') as any);
        jest.spyOn(logger, 'error').mockReturnThis();
        try {
            await controller.usersRegistered();
        } catch (e) {
            expect(logger.error).toHaveBeenCalledTimes(1);
            expect(logger.error).toHaveBeenCalledWith('Internal Server Error', 'UsersController usersRegistered');
        }
    });

    it('should be call createUser method from Service with new User (username and password param)', async () => {
        const createUserDto = new CreateUserDto({ username: faker.internet.email(), password: faker.internet.password() });
        const user = new User({ username: createUserDto.username, password: createUserDto.password, email: createUserDto.username });
        jest.spyOn(service, 'createUser').mockResolvedValue(user);
        expect(await controller.registerUser(createUserDto)).toBe(user);
        expect(service.createUser).toHaveBeenCalledTimes(1);
        expect(service.createUser).toHaveBeenCalledWith(user);
    });

    it('should catch error if findAll method from Service failed', async () => {
        const createUserDto = new CreateUserDto({ username: faker.internet.email(), password: faker.internet.password() });
        const user = new User({ username: createUserDto.username, password: createUserDto.password, email: createUserDto.username });
        jest.spyOn(service, 'createUser').mockResolvedValue(user);
        try {
            await controller.usersRegistered();
        } catch (e) {
            expect(logger.error).toHaveBeenCalledTimes(1);
            expect(logger.error).toHaveBeenCalledWith('Internal Server Error', 'UsersController usersRegistered');
        }
    });



});