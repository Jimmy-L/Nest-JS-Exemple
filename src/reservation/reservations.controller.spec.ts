import { TestingModule, Test } from "@nestjs/testing";
import { ReservationsController } from './reservations.controller';
import { AuthModule } from '../auth/auth.module';
import { LoggerModule } from './logger/logger.module';
import { ReservationsService } from "./reservations.service";
import { MongooseModule, getModelToken } from "@nestjs/mongoose";

describe('Reservations Services Controller', () => {
    let controller: ReservationsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                AuthModule,
                MongooseModule.forRootAsync({
                    useFactory: () => ({
                        uri: 'mongodb://localhost/nest',
                    }),
                }),
                LoggerModule,
            ],
            controllers: [ReservationsController],
            providers: [
                ReservationsService,
                {
                    provide: getModelToken('Reservation'),
                    useClass: class ReservationModel { }
                }
            ],
        }).compile();

        controller = module.get<ReservationsController>(ReservationsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});