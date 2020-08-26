import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { WebMenuService } from './web-menu.service';
import { LoggerService } from '../logger/logger.service';
import { RpcException } from '@nestjs/microservices';

@Controller('web-menu')
export class WebMenuController {

    constructor(private readonly webMenuService: WebMenuService, private loggerService: LoggerService) { }

    @Get('menu')
    async getWebMenu() {
        try {
            let siteId = '101';
            return await this.webMenuService.getWebMenu(siteId);
        } catch (e) {
            this.loggerService.error(e.message, 'WebMenuController getWebMenu');
            return new RpcException(e.response.data);
        }
    }

    @Get('token')
    async getToken() {
        try {
            return await this.webMenuService.getTokenWebMenu();
        } catch (e) {
            this.loggerService.error(e, 'WebMenuController getToken');
            throw e;
        }
    }
}
