import {
    Controller,
    Get,
    InternalServerErrorException,
    Put,
    Param,
    Post,
    UseGuards,
    Body,
    Request
} from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ReservationsService } from './reservations.service';
import { ReservationEntity } from './entity/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { LoggerService } from '../logger/logger.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateReservationsStatusDto } from './dto/update-reservations-status.dto';

@Controller('reservations')
@ApiTags('reservations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ReservationsController {
    constructor(
        private readonly reservationsService: ReservationsService,
        private readonly loggerService: LoggerService,
    ) { }

    @Get('')
    @ApiOkResponse({
        description: 'Return all the reservations matching the request.',
        type: ReservationEntity,
        isArray: true
    })
    async getReservations(): Promise<ReservationEntity[]> {
        try {
            const reservations = await this.reservationsService.getReservations();
            return reservations;
        } catch (e) {
            this.loggerService.error(e.message, 'ReservationsController GetReservations');
            throw new InternalServerErrorException();
        }
    }

    // @Query() queryReservation: QueryReservationDto
    // return await this.reservationsService.getReservations(queryReservation);

    @Get('/:reservationId')
    @ApiOkResponse({
        description: 'Return one reservation found by its id.',
        type: ReservationEntity
    })
    @ApiNotFoundResponse({
        description: 'the resource is not found'
    })
    async getReservationById(@Param('reservationId') reservationId: string): Promise<ReservationEntity> {
        try {
            const reservation = await this.reservationsService.getReservationById(reservationId);
            return reservation;
        } catch (e) {
            this.loggerService.error(e.message, 'ReservationsController GetReservationById');
            throw new InternalServerErrorException();
        }
    }

    @Post()
    @ApiCreatedResponse({
        type: ReservationEntity,
        description: 'The reservations has been successfully created. It will also trigger the POS_RESERVATION event.',
    })
    async postReservation(@Body() createReservation: CreateReservationDto): Promise<ReservationEntity> {
        try {
            const reservation = await this.reservationsService.postReservation(createReservation);
            return reservation;
        } catch (e) {
            this.loggerService.error(e.message, 'ReservationsController PostReservation');
            throw new InternalServerErrorException();
        }
    }

    @Put('status')
    @ApiOkResponse({
        description: 'The reservations has successfully been updated.',
    })
    async updateStatusReservationsByIds(
        @Body() updateReservationsStatusDto,
        // : UpdateReservationsStatusDto,
        @Request() req
    ): Promise<any> {
        console.log(updateReservationsStatusDto);
        console.log(req.body);
        try {
            return await this.reservationsService.updateReservationsStatusByIds(updateReservationsStatusDto.reservationsId, updateReservationsStatusDto.status);
        } catch (e) {
            this.loggerService.error(e.message, 'ReservationsController updateStatusReservationsByIds');
            throw new InternalServerErrorException();
        }
    }

    @Put(':reservationId')
    @ApiOkResponse({
        description: 'The reservation has successfully been updated.',
        type: ReservationEntity
    })
    async updateReservationById(@Param('reservationId') reservationId: string, @Body() updateReservation: UpdateReservationDto): Promise<ReservationEntity> {
        try {
            const reservation = await this.reservationsService.updateReservationById(reservationId, updateReservation);
            return reservation;
        } catch (e) {
            this.loggerService.error(e.message, 'ReservationsController UpdateReservation');
            throw new InternalServerErrorException();
        }
    }
    
}
