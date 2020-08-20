import { Moment } from 'moment';
import { ReservationType, ReservationStatus } from './reservation.model';
const moment = require('moment');

export class CreateReservation {
    /**
     * Id of the restaurant the reservation belongs to.
     */
    restaurant: string;

    /**
     * The date time of the reservation
     */
    dateTime: Moment;

    /**
     * The date time the reservation is suppose to go at table.
     */
    estimatedAtTableAt: Moment;

    /**
     * The number of people on the reservation
     */
    pax: number;

    /**
     * The first name of the reservation
     */
    firstName?: string;

    /**
     * The last name of the reservation
     */
    lastName?: string;

    /**
     * The email of the reservation
     */
    email?: string;

    /**
     * The phone number of the reservation
     */
    phoneNumber?: string;

    /**
     * The tables of the reservations
     */
    tables?: number[];

    /**
     * The type of the reservation
     */
    type: ReservationType;

    /**
     * Tells if the tables are forced or not
     */
    forcedTable: boolean;

    /**
     * Status of the reservation
     */
    status: ReservationStatus;

    constructor(reservation: Partial<CreateReservation>) {
        Object.assign(this, reservation);

        // this.dateTime = moment.utc(this.dateTime);
        this.estimatedAtTableAt = this.estimatedAtTableAt !== undefined ? moment.utc(this.estimatedAtTableAt) : undefined;
        this.forcedTable = this.forcedTable ? this.forcedTable : false;
    }
}
