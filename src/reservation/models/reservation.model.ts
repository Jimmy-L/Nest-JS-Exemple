import * as mongoose from 'mongoose'
import * as moment from "moment";
import * as faker from 'faker';
import { Moment } from "moment";

export class Reservation {
    /**
     * ID of the reservation
     */
    _id: string;
    /**
     * Restaurant where the reservation has been taken. This is only the mongo ID in the DB.
     */
    siteId: string;
    /**
     * The date time the reservation is suppose to go at table.
     */
    estimatedAtTableAt: Moment;
    /**
     * Number of people for that reservation
     */
    pax: number;
    /**
     * First name of the person that made the reservation.
     * The first name is mandatory if the consumer makes th reservations by himself.
     * It is optional if the reservation is made by the restaurant.
     */
    firstName?: string;
    /**
     * Last Name of the person who made the reservation. It can be unset if the reservation has been taken for the same moment it will go at table.
     * Example: The reservation is a walk-in and the table is free right now. We record the reservation but we don't take the customer's information.
     */
    lastName?: string;
    /**
     * Email for the reservation.
     * The email is mandatory if the consumer makes th reservations by himself.
     * It is optional if the reservation is made by the restaurant.
     */
    email?: string;
    /**
     * Phone number for the reservation. It can be unset if the reservation has been taken for the same moment it will go at table.
     * Example: The reservation is a walk-in and the table is free right now. We record the reservation but we don't take the customer's information.
     */
    phoneNumber?: string;
    /**
     * Status of the reservation
     */
    status: ReservationStatus;
    /**
     * Table the reservation is assigned to.
     */
    tables?: number[];
    /**
     * Date time the reservation was updated the last time
     */
    updatedAt: Moment;
    /**
     * Date time the reservation was created
     */
    createdAt: Moment;

    constructor(reservation: Partial<Reservation>) {
        Object.assign(this, reservation);

        this.estimatedAtTableAt = this.estimatedAtTableAt !== undefined ? moment(this.estimatedAtTableAt) : undefined;
    }
}

export enum ReservationStatus {
    WAITING = 'WAITING',
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELLED',
    STAND_BY = 'STAND_BY',
    ON_SITE = 'ON_SITE',
    AT_TABLE = 'AT_TABLE',
    NO_SHOW = 'NO_SHOW',
    IN_BOOKING = 'IN_BOOKING',
    BOOKING_CANCELLED = 'BOOKING_CANCELLED',
    REQUESTED = 'REQUESTED' // the reservation has been made on the internet by a consumer
}

export const ReservationTransition = {
    TO_BE_CONFIRMED: {
        name: 'TO_BE_CONFIRMED',
        next: ReservationStatus.CONFIRMED,
        previous: [ReservationStatus.WAITING, ReservationStatus.REQUESTED]
    },
    TO_ARRIVE: {
        name: 'TO_ARRIVE',
        next: ReservationStatus.ON_SITE,
        previous: [ReservationStatus.CONFIRMED]
    },
    TO_PLACE: {
        name: 'TO_PLACE',
        next: ReservationStatus.AT_TABLE,
        previous: [ReservationStatus.ON_SITE]
    },
    TO_CANCEL: {
        name: 'TO_CANCEL',
        next: ReservationStatus.CANCELLED,
        previous: [ReservationStatus.WAITING]
    },
    TO_NO_SHOW: {
        name: 'TO_NO_SHOW',
        next: ReservationStatus.NO_SHOW,
        previous: [ReservationStatus.CONFIRMED, ReservationStatus.STAND_BY]
    }
};

export enum ReservationType {
    WALK_IN = 'WALK_IN',
    PRE_RESERVATION = 'PRE_RESERVATION'
}

/**
 * Generate one fake reservation.
 */
export const fakeReservation = (
    minDateTime: Moment = moment(faker.date.past()),
    maxDateTime: Moment = moment(faker.date.future()),
): Reservation => {
    return new Reservation({
        _id: mongoose.Types.ObjectId().toHexString(),
        siteId: 'siteId',
        estimatedAtTableAt: moment(faker.date.between(minDateTime.toDate(), maxDateTime.toDate())),
        pax: faker.random.number({ min: 30, max: 250 }),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.phoneNumber('fr'),
        status: faker.random.objectElement(ReservationStatus) as ReservationStatus,
        tables: [faker.random.number({ min: 300, max: 325 })],
        createdAt: moment(),
        updatedAt: moment()
    });
};
