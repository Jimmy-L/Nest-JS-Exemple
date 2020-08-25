import { Test, TestingModule } from '@nestjs/testing';
import { WebMenuController } from './web-menu.controller';

describe('WebMenu Controller', () => {
  let controller: WebMenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebMenuController],
    }).compile();

    controller = module.get<WebMenuController>(WebMenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
