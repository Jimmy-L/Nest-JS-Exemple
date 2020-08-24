import { TestingModule, Test } from "@nestjs/testing";
import { CanActivate } from "@nestjs/common";
import { ReservationsController } from './reservations.controller';
import { AuthModule } from '../auth/auth.module';
import { LoggerModule } from '../logger/logger.module';
import { ReservationsService } from "./reservations.service";
import { MongooseModule, getModelToken } from "@nestjs/mongoose";
import { fakeReservation } from './models/reservation.model';
import { LoggerService } from "../logger/logger.service";
import { ReservationEntity } from "./entity/reservation.entity";
import { CreateReservationDto } from "./dto/create-reservation.dto";

describe('Reservations Services Controller', () => {
    let controller: ReservationsController;
    let service: ReservationsService;
    let logger: LoggerService;
    const reservation1 = new ReservationEntity(fakeReservation());
    const reservation2 = new ReservationEntity(fakeReservation());
    const reservation3 = new ReservationEntity(fakeReservation());

    beforeEach(async () => {
        const mockGuard: CanActivate = { canActivate: jest.fn(() => true) };

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
                LoggerService,
                {
                    provide: getModelToken('Reservation'),
                    useClass: class ReservationModel { }
                }
            ],
        })
            .compile();

        controller = module.get<ReservationsController>(ReservationsController);
        service = module.get<ReservationsService>(ReservationsService);
        logger = module.get<LoggerService>(LoggerService);

    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should be call getReservations method from Service', async () => {
        const result = [reservation1, reservation2, reservation3];
        jest.spyOn(service, 'getReservations').mockResolvedValue(result);
        expect(await controller.getReservations()).toBe(result);
        expect(result[0]).toBeInstanceOf(ReservationEntity);
        expect(service.getReservations).toHaveBeenCalledTimes(1);
    });

    // it('should catch error if getReservations method from Service failed', async () => {
    //     jest.spyOn(service, 'getReservations').mockRejectedValue(new Error('Internal Server Error') as any);
    //     jest.spyOn(logger, 'error').mockReturnThis();
    //     try {
    //         await controller.getReservations();
    //     } catch (e) {
    //         expect(logger.error).toHaveBeenCalledWith('Internal Server Error', 'ReservationsController GetReservations');
    //         expect(logger.error).toHaveBeenCalledTimes(1);
    //     }
    // });

    it('should be call getReservationById method from Service', async () => {
        const result = reservation1;
        jest.spyOn(service, 'getReservationById').mockResolvedValue(result);
        expect(await controller.getReservationById(reservation1._id)).toBe(result);
        expect(result).toBeInstanceOf(ReservationEntity);
        expect(service.getReservationById).toHaveBeenCalledTimes(1);
    });

    it('should call post method from Service', async () => {
        const result = reservation1;
        jest.spyOn(service, 'postReservation').mockImplementation(async () => reservation1);
        expect(await controller.postReservation(new CreateReservationDto(reservation1))).toBe(result);
        expect(result).toBeInstanceOf(ReservationEntity);
    });

    it('should be call updateReservationById method from Service', async () => {
        const result = reservation1;
        jest.spyOn(service, 'updateReservationById').mockResolvedValue(result);
        expect(await controller.updateReservationById(reservation1._id, reservation1)).toBe(result);
        expect(result).toBeInstanceOf(ReservationEntity);
        expect(service.updateReservationById).toHaveBeenCalledTimes(1);
    });

});