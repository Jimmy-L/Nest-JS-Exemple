import { Controller, Post, Body, Get, UseGuards, InternalServerErrorException } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.model';
import * as faker from 'faker';
import * as moment from 'moment';
import { LoggerService } from '../reservation/logger/logger.service';

@Controller('users')
@ApiTags('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private usersService: UsersService, private loggerService: LoggerService) { }

    @Get()
    @ApiOkResponse({
        description: 'Return all the users registered',
        type: User,
        isArray: true
    })
    async usersRegistered(): Promise<User[]> {
        try {
            return await this.usersService.findAll();
        } catch (e) {
            this.loggerService.error(e.message, 'UsersController usersRegistered');
            throw new InternalServerErrorException();
        }
    }

    @Post('register')
    @ApiOkResponse({
        description: 'Register user and return it.',
        type: CreateUserDto
    })
    async registerUser(@Body() createUserDto: CreateUserDto) {
        try {
            const { username, password } = createUserDto;

            const newUser = new User({
                username: username,
                password: password,
                email: username,
            });

            return await this.usersService.createUser(newUser);

        } catch (e) {
            this.loggerService.error(e.message, 'UsersController registerUser');
            throw new InternalServerErrorException();
        }
    }
}
