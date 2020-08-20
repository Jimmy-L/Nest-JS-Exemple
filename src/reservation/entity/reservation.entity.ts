import { Moment } from 'moment';
import { Transform } from 'class-transformer';
// import { ReservationStatus, ReservationType, Reservation, fakeReservation } from '@aphilia/data-reservations';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ReservationStatus, ReservationType, Reservation } from '../models/reservation.model';

// This allows to give example to the properties
// const fakeReservationData = fakeReservation();

export class ReservationEntity extends Reservation {
    @ApiProperty({
        type: String,
        description: 'The date time the reservation has been created',
        // example: fakeReservationData.createdAt.toISOString(),
        format: 'ISO3601'
    })
    @Transform(createdAt => createdAt.toISOString())
    createdAt: Moment;

    // @ApiProperty({
    //     type: String,
    //     description: 'The date time the reservation is normally set up.',
    //     // example: fakeReservationData.dateTime.toISOString(),
    //     format: 'ISO3601'
    // })
    // @Transform(dateTime => dateTime.toISOString())
    // dateTime: Moment;

    @ApiPropertyOptional({
        type: String,
        description: 'Email of the person that has taken the reservation.',
        // example: fakeReservationData.email
    })
    email?: string;

    @ApiProperty({
        type: String,
        description: 'The date time the reservation is going to be place at a table.',
        // example: fakeReservationData.estimatedAtTableAt.toISOString(),
        format: 'ISO3601'
    })
    @Transform(estimatedAtTableAt => (estimatedAtTableAt ? estimatedAtTableAt.toISOString() : undefined))
    estimatedAtTableAt: Moment;

    @ApiPropertyOptional({
        type: String,
        description: 'First name of the person that has taken the reservation.',
        // example: fakeReservationData.firstName
    })
    firstName?: string;

    @ApiProperty({
        type: Boolean,
        description: 'Indicates weather the table has been forced by the user or it was the system that gave it.',
        // example: fakeReservationData.forcedTable
    })
    forcedTable: boolean;

    @ApiProperty({
        type: String,
        description: 'Mongo id of the reservation in the database',
        // example: fakeReservationData._id
    })
    @Transform(_id => _id.toString())
    _id: string;

    @ApiPropertyOptional({
        type: String,
        description: 'Last name of the person that has taken the reservation.',
        // example: fakeReservationData.lastName
    })
    lastName?: string;

    @ApiProperty({
        type: Number,
        description: 'Number of person for the reservation.',
        // example: fakeReservationData.pax
    })
    pax: number;

    @ApiPropertyOptional({
        type: String,
        description: 'Phone Number of the person that has taken the reservation.',
        // example: fakeReservationData.phoneNumber
    })
    phoneNumber?: string;

    @ApiProperty({
        type: String,
        description: 'Id of the restaurant the reservation belongs to.',
        // example: fakeReservationData.restaurant
    })
    restaurant: string;

    @ApiProperty({
        type: String,
        description: 'Status of the reservation.',
        // example: fakeReservationData.restaurant,
        enum: ReservationStatus,
        enumName: 'ReservationStatus'
    })
    status: ReservationStatus;

    @ApiPropertyOptional({
        description: 'Tables number the reservation is assigned to.',
        // example: fakeReservationData.tables,
        type: [Number]
    })
    tables?: number[];

    @ApiProperty({
        description: 'Type of the reservation.',
        // example: fakeReservationData.type,
        type: String,
        enum: ReservationType,
        enumName: 'ReservationType'
    })
    type: ReservationType;

    @ApiProperty({
        type: String,
        description: 'The date time the reservation has been updated.',
        // example: fakeReservationData.updatedAt.toISOString(),
        format: 'ISO3601'
    })
    @Transform(updatedAt => updatedAt.toISOString())
    updatedAt: Moment;

    constructor(reservation: Partial<ReservationEntity>) {
        super(reservation);
    }
}
