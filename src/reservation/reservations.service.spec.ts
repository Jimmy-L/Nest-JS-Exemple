import * as faker from 'faker';
import * as mongoose from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { ReservationsService } from './reservations.service';
import { ReservationEntity } from './entity/reservation.entity';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationSchema } from './schema/reservation.schema';
import { LoggerService } from '../logger/logger.service';
import { fakeReservation } from './models/reservation.model';
import { CreateReservationDto } from './dto/create-reservation.dto';

describe('Restaurant Normal Services Service', () => {
    let service: ReservationsService;
    let model: mongoose.Model<ReservationEntity & mongoose.Document>;
    let fakeReservations: ReservationEntity[];
    const reservation1 = new ReservationEntity(fakeReservation());
    const reservation2 = new ReservationEntity(fakeReservation());
    const reservation3 = new ReservationEntity(fakeReservation());
    const reservationToInject = new CreateReservationDto(fakeReservation());

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forRootAsync({
                    useFactory: () => ({ uri: 'mongodb://localhost/test-reservations' }),
                }),
                MongooseModule.forFeature([{ name: 'Reservation', schema: ReservationSchema }])
            ],
            providers: [ReservationsService, LoggerService]
        }).compile();

        service = module.get<ReservationsService>(ReservationsService);
        model = module.get<mongoose.Model<ReservationEntity & mongoose.Document>>(getModelToken('Reservation'));
        fakeReservations = [reservation1, reservation2, reservation3];
        await model.insertMany(fakeReservations);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return all the reservations', async () => {
        const result = await service.getReservations();
        expect(result[0]).toBeInstanceOf(ReservationEntity);
    });

    it('should return one reservation by its id', async () => {
        const reservation = faker.random.arrayElement(fakeReservations);
        const result = await service.getReservationById(reservation._id);
        expect(result).toBeInstanceOf(ReservationEntity);
        expect(result._id.toString()).toBe(reservation._id);
    });

    it('should call save method from Mongo', async () => {
        const result = await service.postReservation(reservationToInject);
        expect(result).toBeInstanceOf(ReservationEntity);
        expect(result._id.toString()).toBe(reservationToInject._id);
    });

    it('should update one reservation', async () => {
        const reservation = faker.random.arrayElement(fakeReservations);
        const result = await service.updateReservationById(
            reservation._id,
            new UpdateReservationDto({
                pax: 19
            })
        );
        expect(result).toBeInstanceOf(ReservationEntity);
        expect(result._id.toString()).toBe(reservation._id);
        expect(result.pax).toBe(19);
    });

    afterAll(async () => {
        await model.remove({});
    });
});
