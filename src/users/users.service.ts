import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LoggerService } from '../logger/logger.service';
import * as mongoose from 'mongoose';
import { User } from './entity/user.model';

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
            const user = await createdUser.save();

            return new User({
                _id: user.id,
                username: user.username,
                lastName: user.lastName,
                firstName: user.firstName,
                email: user.email,
                phone: user.phone,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            });

        } catch (e) {
            this.loggerService.error(e.message, 'UserService CreateUser');
            throw new Error(e);
        }
    }

}