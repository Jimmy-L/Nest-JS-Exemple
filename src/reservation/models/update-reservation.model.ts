import { Moment } from 'moment';
import { ReservationType, ReservationStatus } from './reservation.model';
const moment = require('moment');

export class UpdateReservation {
    /**
     * Date time of the reservation
     */
    dateTime?: Moment;

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
     * Type of the reservation.
     */
    type?: ReservationType;

    /**
     * Status of the reservation
     */
    status?: ReservationStatus;

    /**
     * Tells if the tables are forced or not
     */
    forcedTable?: boolean;

    constructor(updateReservation: Partial<UpdateReservation>) {
        Object.assign(this, updateReservation);

        // if (this.dateTime) {
        //     this.dateTime = moment(this.dateTime);
        // }

        if (this.estimatedAtTableAt) {
            this.estimatedAtTableAt = moment(this.estimatedAtTableAt);
        }
    }
}
