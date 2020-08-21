import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LoggerService } from '../reservation/logger/logger.service';
import * as mongoose from 'mongoose';
import { User } from './entity/user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel('User')
        private readonly userModel: mongoose.Model<User & mongoose.Document>,
        private readonly loggerService: LoggerService
    ) { }

    /**
     * Find all User
     *
     * @param userId
     */
    async findAll(): Promise<User[]> {
        try {
            const users = await this.userModel
                .find()
                .lean()
                .exec();

            return users.map(user => new User({
                ...user
            }));

        } catch (e) {
            this.loggerService.error(e.message, 'UserService FindOneUserById');
            throw new Error(e);
        }
    }

    /**
     * Find one reservation by its id
     *
     * @param userId
     */
    async findUserById(userId: string): Promise<User> {
        try {
            const user = await this.userModel
                .findById(userId)
                .lean()
                .exec();

            return new User({
                ...user
            });

        } catch (e) {
            this.loggerService.error(e.message, 'UserService FindOneUserById');
            throw new Error(e);
        }
    }

    /**
     * Find one user by username
     *
     * @param username
     */
    async findUserByUsername(username: string): Promise<User> {
        try {
            const user = await this.userModel
                .findOne({ username: username })
                .lean()
                .exec();


            if (!user) {
                throw new NotFoundException();
            }

            return new User({
                ...user
            });

        } catch (e) {
            this.loggerService.error(e.message, 'UserService FindOneUserById');
            throw new Error(e);
        }
    }

    /**
     * Create new User
     * @param createUserDto 
     */
    async createUser(newUser: User): Promise<User> {
        try {
            const createdUser = new this.userModel(newUser);
            return await createdUser.save();

        } catch (e) {
            this.loggerService.error(e.message, 'UserService CreateUser');
            throw new Error(e);
        }
    }

}