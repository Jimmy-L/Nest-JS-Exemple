import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.model';
import * as faker from 'faker';
import * as moment from 'moment';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
@ApiTags('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    @ApiOkResponse({
        description: 'Return all the users registered',
        type: User,
        isArray: true
    })
    async UserRegistered() {
        return await this.usersService.findAll();
    }

    @Post('register')
    @ApiOkResponse({
        description: 'Register user and return it.',
        type: CreateUserDto
    })
    async registerUser(@Body() createUserDto: CreateUserDto) {
        const { username, password } = createUserDto;

        const newUser = new User({
            username: username,
            lastName: faker.name.lastName(),
            firstName: faker.name.firstName(),
            password: password,
            phone: faker.phone.phoneNumber(),
            email: username,
            createdAt: moment(),
            updatedAt: moment(),
        });

        return await this.usersService.createUser(newUser);
    }
}
