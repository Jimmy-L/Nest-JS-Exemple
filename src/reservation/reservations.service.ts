import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReservationEntity } from './entity/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import * as mongoose from 'mongoose';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class ReservationsService {

    constructor(
        @InjectModel('Reservation')
        private readonly reservationModel: mongoose.Model<ReservationEntity & mongoose.Document>,
        private readonly loggerService: LoggerService
    ) { }

    /**
     * Return all the reservations matching the query
     *
     * @param {QueryReservationDto} queryReservation
     */
    async getReservations(
        // queryReservation: QueryReservationDto
    ): Promise<ReservationEntity[]> {
        try {
            const result = await this.reservationModel
                .find()
                .lean()
                .exec();

            return result.map(
                reservation =>
                    new ReservationEntity({
                        _id: reservation._id,
                        ...reservation
                    })
            );
        } catch (e) {
            this.loggerService.error(e.message, 'ReservationsService GetReservations');
            throw new Error(e);
        }
    }

    /**
     * Find one reservation by its id
     *
     * @param reservationId
     */
    async getReservationById(reservationId): Promise<ReservationEntity> {
        try {
            const reservation = await this.reservationModel
                .findById(reservationId)
                .lean()
                .exec();

            // If the reservation is not found then throw an error
            if (!reservation) { throw new NotFoundException(); }

            return new ReservationEntity({
                ...reservation
            });

        } catch (e) {

            this.loggerService.error(e.message, 'ReservationsService FindOneReservationById');
            throw new Error(e);
        }
    }

    /**
     * Post a new reservation in the database.
     *
     * @param {CreateReservationDto} createReservation
     */
    async postReservation(createReservation: CreateReservationDto): Promise<ReservationEntity> {
        try {
            let reservation = new this.reservationModel(createReservation);
            reservation = await reservation.save();

            const newReservation = new ReservationEntity({
                _id: reservation._id,
                createdAt: reservation.createdAt,
                updatedAt: reservation.updatedAt,
                email: reservation.email,
                lastName: reservation.lastName,
                firstName: reservation.firstName,
                status: reservation.status,
                tables: reservation.tables,
                estimatedAtTableAt: reservation.estimatedAtTableAt,
                phoneNumber: reservation.phoneNumber,
                pax: reservation.pax
            });

            return newReservation;
        } catch (e) {
            this.loggerService.error(e.message, 'ReservationsService PostReservation');
            throw new Error(e);
        }
    }

    /**
     * Update a reservation by its id.
     *
     * @param {string} reservationId
     * @param {UpdateReservationDto} updateReservation
     */
    async updateReservationById(reservationId: string, updateReservation: UpdateReservationDto): Promise<ReservationEntity> {
        try {
            const reservation = await this.reservationModel
                .findByIdAndUpdate(
                    reservationId,
                    {
                        ...updateReservation
                    },
                    { new: true }
                )
                .lean()
                .exec();

            return new ReservationEntity({
                ...reservation
            });
        } catch (e) {
            this.loggerService.error(e.message, 'ReservationsService UpdateReservation');
            throw new Error(e);
        }
    }

}
