import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReservationEntity } from './entity/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import * as mongoose from 'mongoose';
import { LoggerService } from '../logger/logger.service';
import { ReservationStatus } from './models/reservation.model';
import { UpdateReservationsStatusDto } from './dto/update-reservations-status.dto';

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
            throw e;
        }
    }

    /**
     * Find one reservation by its id
     *
     * @param reservationId
     */
    async getReservationById(reservationId: string): Promise<ReservationEntity> {
        try {
            const reservation = await this.reservationModel
                .findById(reservationId)
                .lean()
                .orFail(() => new NotFoundException())
                .exec();

            return new ReservationEntity({
                ...reservation
            });

        } catch (e) {

            this.loggerService.error(e.message, 'ReservationsService FindOneReservationById');
            throw e;
        }
    }

    /**
     * Find one reservation by its id
     *
     * @param reservationId
     */
    async getReservationsById(reservationsId: string[]): Promise<ReservationEntity[]> {
        try {
            const reservations = await this.reservationModel
                .find({ _id: { $in: reservationsId } })
                .lean()
                .orFail(() => new NotFoundException())
                .exec();

            return reservations.map(reservation =>
                new ReservationEntity({
                    _id: reservation._id,
                    ...reservation
                })
            );

        } catch (e) {
            this.loggerService.error(e.message, 'ReservationsService FindReservationsById');
            throw e;
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
            throw e;
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
                .orFail(() => new NotFoundException())
                .lean()
                .exec();

            return new ReservationEntity({
                ...reservation
            });
        } catch (e) {
            this.loggerService.error(e.message, 'ReservationsService UpdateReservation');
            throw e;
        }
    }

    /**
     * update all reservation status by its id
     *
     * @param reservationsId
     * @param status
     */
    async updateReservationsStatusByIds(reservationsId: string[], status: ReservationStatus): Promise<any> {
        try {
            await this.reservationModel
                .updateMany(
                    { _id: { $in: reservationsId } },
                    { $set: { status: status } },
                    { multi: true })
                .exec();

            return await this.getReservationsById(reservationsId);
        } catch (e) {
            this.loggerService.error(e.message, 'ReservationsService updateReservationsStatusByIds');
            throw e;
        }
    }

}
