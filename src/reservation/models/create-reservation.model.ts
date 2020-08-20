import * as moment from 'moment';
import { Moment } from 'moment';
import { ReservationStatus } from './reservation.model';
import * as faker from 'faker';

export class CreateReservation {
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

    constructor(reservation: Partial<CreateReservation>) {
        Object.assign(this, reservation);

        // this.dateTime = moment.utc(this.dateTime);
        this.estimatedAtTableAt = this.estimatedAtTableAt !== undefined ? moment.utc(this.estimatedAtTableAt) : undefined;
    }
}

export const fakeCreateReservation = () =>
    new CreateReservation({
        siteId: 'siteId',
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        pax: faker.random.number({ min: 1, max: 20 }),
        phoneNumber: faker.phone.phoneNumber(),
        status: faker.random.objectElement(ReservationStatus) as ReservationStatus,
        tables: [faker.random.number({ min: 0, max: 2000 })],
        email: faker.internet.email(),
        estimatedAtTableAt: moment(faker.date.future())
    });
