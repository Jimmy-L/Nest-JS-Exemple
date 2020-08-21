import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entity/user.model';
import { ReadUserDto } from '../users/dto/read-user.dto';
import * as moment from 'moment';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async validateUser(username: string, pass: string): Promise<User> {
        const user = await this.usersService.findUserByUsername(username);
        if (!user || user && !(user.password === pass)) {
            throw new NotFoundException();
        } else {
            const { password, ...result } = user;
            return result;
        }
    }

    async login(readUserDto: ReadUserDto) {
        const user = await this.validateUser(readUserDto.username, readUserDto.password);
        const payload = { username: user.username, sub: user._id.toString(), createdAt: moment(user.createdAt).toISOString() };
        const token = this.jwtService.sign(payload);
        return { access_token: token };
    }

    getProfile(token: string) {
        return this.jwtService.decode(token);
    }
}