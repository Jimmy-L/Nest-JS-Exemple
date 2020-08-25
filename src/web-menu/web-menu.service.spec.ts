import { Test, TestingModule } from '@nestjs/testing';
import { WebMenuService } from './web-menu.service';

describe('WebMenuService', () => {
  let service: WebMenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebMenuService],
    }).compile();

    service = module.get<WebMenuService>(WebMenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
