import { Moment } from 'moment';
import * as moment from 'moment';
import * as faker from 'faker';
import { ReservationStatus } from './reservation.model';

export class UpdateReservation {
    /**
     * Restaurant where the reservation has been taken. This is only the mongo ID in the DB.
     */
    siteId: string;

    /**
     * The date time the reservation is suppose to go at table.
     */
    estimatedAtTableAt?: Moment;

    /**
     * Pax of the reservation.
     */
    pax?: number;

    /**
     * First name of the reservation.
     */
    firstName?: string;

    /**
     * Last name of the reservation.
     */
    lastName?: string;

    /**
     * Email of the reservation.
     */
    email?: string;

    /**
     * Phone number of the reservation.
     */
    phoneNumber?: string;

    /**
     * Table of the reservation.
     */
    tables?: number[];

    /**
     * Status of the reservation
     */
    status?: ReservationStatus;

    constructor(updateReservation: Partial<UpdateReservation>) {
        Object.assign(this, updateReservation);

        if (this.estimatedAtTableAt) {
            this.estimatedAtTableAt = moment(this.estimatedAtTableAt);
        }
    }
}

export const fakeUpdateReservation = () =>
    new UpdateReservation({
        siteId: 'siteId',
        firstName: faker.name.firstName(),
        pax: faker.random.number({ min: 1, max: 20 }),
        phoneNumber: faker.phone.phoneNumber(),
        status: faker.random.objectElement(ReservationStatus) as ReservationStatus,
        estimatedAtTableAt: moment(faker.date.future()),
        email: faker.internet.email(),
        lastName: faker.name.lastName(),
        tables: [faker.random.number({ min: 1, max: 2000 })]
    });
