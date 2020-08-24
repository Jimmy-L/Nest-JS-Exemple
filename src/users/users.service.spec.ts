import * as faker from 'faker';
import * as mongoose from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { LoggerService } from '../logger/logger.service';
import { UsersService } from './users.service';
import { User, fakeUser } from './entity/user.model';
import { UserSchema } from './schema/user.schema';

describe('Restaurant Normal Services Service', () => {
    let service: UsersService;
    let model: mongoose.Model<User & mongoose.Document>;
    let fakeUsers: User[];
    const user1 = new User(fakeUser());
    const user2 = new User(fakeUser());
    const user3 = new User(fakeUser());

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forRootAsync({
                    useFactory: () => ({ uri: 'mongodb://localhost/test-users' }),
                }),
                MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
            ],
            providers: [UsersService, LoggerService]
        }).compile();

        service = module.get<UsersService>(UsersService);
        model = module.get<mongoose.Model<User & mongoose.Document>>(getModelToken('User'));
        fakeUsers = [user1, user2, user3];
        await model.insertMany(fakeUsers);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return all the reservations', async () => {
        const result = await service.findAll();
        expect(result[0]).toBeInstanceOf(User);
    });

    it('should return one reservation by its id', async () => {
        const user = faker.random.arrayElement(fakeUsers);
        const result = await service.findUserById(user._id);
        expect(result).toBeInstanceOf(User);
        expect(result._id.toString()).toBe(user._id);
    });

    it('should return one reservation by its username', async () => {
        const user = faker.random.arrayElement(fakeUsers);
        const result = await service.findUserByUsername(user.username);
        expect(result).toBeInstanceOf(User);
        expect(result.username).toBe(user.username);
    });

    afterAll(async () => {
        await model.remove({});
    });
});
