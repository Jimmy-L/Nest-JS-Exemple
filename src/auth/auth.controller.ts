import { Controller, Get, Request, Post, UseGuards, Body, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { ReadUserDto } from '../users/dto/read-user.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() readUserDto: ReadUserDto) {
        return this.authService.login(readUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        const token = (req.headers.authorization as string).substring(7, (req.headers.authorization as string).length)
        return this.authService.getProfile(token);
    }
}
