import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ReadUserDto } from 'src/users/dto/read-user.dto';
import { User } from '../users/entity/user.model';
import * as moment from 'moment';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async validateUser(username: string, pass: string): Promise<User> {
        const user = await this.usersService.findUserByUsername(username);
        console.log('validateUser user', user);
        if (!user || user && !(user.password === pass)) {
            throw new NotFoundException();
        } else {
            const { password, ...result } = user;
            console.log('validateUser result', result);
            return result;
        }
    }

    async login(readUserDto: ReadUserDto) {
        console.log('login readUserDto', readUserDto);
        const user = await this.validateUser(readUserDto.username, readUserDto.password);
        const payload = { username: user.username, sub: user._id.toString(), createdAt: moment(user.createdAt).toISOString() };
        console.log('login payload', payload);
        const token = this.jwtService.sign(payload);
        console.log('login token', token);
        return { access_token: token };
    }
}