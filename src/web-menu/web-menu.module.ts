import { Module, HttpModule } from '@nestjs/common';
import { WebMenuController } from './web-menu.controller';
import { WebMenuService } from './web-menu.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [HttpModule, ScheduleModule.forRoot()],
  controllers: [WebMenuController],
  providers: [WebMenuService]
})
export class WebMenuModule {}
