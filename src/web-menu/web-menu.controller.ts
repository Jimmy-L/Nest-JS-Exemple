import { Controller, Get } from '@nestjs/common';
import { WebMenuService } from './web-menu.service';
import { LoggerService } from '../logger/logger.service';

@Controller('web-menu')
export class WebMenuController {

    constructor(private readonly webMenuService: WebMenuService, private loggerService: LoggerService) { }

    @Get('menu')
    async getWebMenu() {
        try {
            return await this.webMenuService.getWebMenu();
        } catch (e) {
            this.loggerService.error(e.message, 'WebMenuController getWebMenu');
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
