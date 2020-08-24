import { Controller, Post, Body, Get, UseGuards, InternalServerErrorException } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.model';
import { LoggerService } from '../logger/logger.service';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService, private readonly loggerService: LoggerService) { }

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
