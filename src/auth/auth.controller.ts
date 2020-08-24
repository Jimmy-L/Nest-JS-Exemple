import { Controller, Get, Request, Post, UseGuards, Body, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
// import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { ReadUserDto } from '../users/dto/read-user.dto';
import { LoggerService } from '../logger/logger.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private authService: AuthService, private loggerService: LoggerService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() readUserDto: ReadUserDto): Promise<any> {
        try {
            return this.authService.login(readUserDto);
        } catch (e) {
            this.loggerService.error(e.message, 'AuthController login');
            throw new InternalServerErrorException();
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        try {
            const token = (req.headers.authorization as string).substring(7, (req.headers.authorization as string).length)
            return this.authService.getProfile(token);
        } catch (e) {
            this.loggerService.error(e.message, 'AuthController getProfile');
            throw new InternalServerErrorException();
        }
    }
}
