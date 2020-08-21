import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    InternalServerErrorException,
    UseInterceptors,
    Query,
    Put,
    Param,
    Body,
    Inject,
    Post,
    NotFoundException
} from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ReservationsService } from './reservations.service';
import { ReservationEntity } from './entity/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { LoggerService } from './logger/logger.service';
import { fakeCreateReservation } from './models/create-reservation.model';
import { fakeUpdateReservation } from './models/update-reservation.model';

@Controller('reservations')
@ApiTags('reservations')
export class ReservationsController {
    constructor(
        private readonly reservationsService: ReservationsService,
        private readonly loggerService: LoggerService,
    ) {}

    @Get('')
    @ApiOkResponse({
        description: 'Return all the reservations matching the request.',
        type: ReservationEntity,
        isArray: true
    })
    async getReservations(
        // @Query() queryReservation: QueryReservationDto
        ): Promise<ReservationEntity[]> {
        try {
            // return await this.reservationsService.getReservations(queryReservation);
            return await this.reservationsService.getReservations();
        } catch (e) {
            this.loggerService.error(e.message, 'ReservationsController GetReservations');
            throw new InternalServerErrorException();
        }
    }

    @Get(':reservationId')
    @ApiOkResponse({
        description: 'Return one reservation found by its id.',
        type: ReservationEntity
    })
    @ApiNotFoundResponse({
        description: 'the resource is not found'
    })
    async getReservationById(@Param('reservationId') reservationId: string): Promise<ReservationEntity> {
        try {
            const reservation = await this.reservationsService.findReservationById(reservationId);

            // If the reservation is not found then throw an error
            if (!reservation) {
                throw new NotFoundException();
            }

            return reservation;
        } catch (e) {
            this.loggerService.error(e.message, 'ReservationsController GetReservationById');
            throw new InternalServerErrorException();
        }
    }

    @Post()
    @ApiCreatedResponse({
        type: ReservationEntity,
        description: 'The reservations has been successfully created. It will also trigger the POS_RESERVATION event.'
    })
    async postReservation(@Body() createReservation: CreateReservationDto): Promise<ReservationEntity> {
        try {
            const fake_createReservation = fakeCreateReservation();
            const reservation = await this.reservationsService.postReservation(fake_createReservation);
            return reservation;
        } catch (e) {
            this.loggerService.error(e.message, 'ReservationsController PostReservation');
            throw new InternalServerErrorException();
        }
    }

    @Put('/:reservationId')
    @ApiOkResponse({
        description: 'The reservation has successfully been updated.',
        type: ReservationEntity
    })
    async updateReservationById(@Param('reservationId') reservationId: string, @Body() updateReservation: UpdateReservationDto): Promise<ReservationEntity> {
        try {
            const fake_upadteReservation = fakeUpdateReservation();
            // updateReservation = new UpdateReservationDto(updateReservation);
            updateReservation = new UpdateReservationDto(fake_upadteReservation);
            const reservation = await this.reservationsService.updateReservationById(reservationId, updateReservation);
            return reservation;
        } catch (e) {
            this.loggerService.error(e.message, 'ReservationsController UpdateReservation');
            throw new InternalServerErrorException();
        }
    }
}
