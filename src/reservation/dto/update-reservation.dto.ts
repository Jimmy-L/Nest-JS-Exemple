import { Moment } from 'moment';
import { IsBoolean, IsEmail, IsEnum, IsIn, IsISO8601, IsNumber, IsOptional, Matches, Max, MaxLength, Min } from 'class-validator';
// import { UpdateReservation, ReservationType, ReservationStatus, fakeUpdateReservation } from '@aphilia/data-reservations';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// import { NAME_PATTERN } from '@aphilia/utils';
import { ReservationType, ReservationStatus } from '../models/reservation.model';
import { UpdateReservation } from '../models/update-reservation.model';

// const fakeUpdateReservationData = fakeUpdateReservation();

export class UpdateReservationDto extends UpdateReservation 
{
    @ApiPropertyOptional({
        description: 'The date time of the reservation.',
        type: String,
        // example: fakeUpdateReservationData.dateTime,
        format: 'ISO8601'
    })
    @IsISO8601()
    @IsOptional()
    dateTime?: Moment;

    /**
     * The date time the reservation is suppose to go at table.
     */
    @ApiPropertyOptional({
        description: 'Date time the customer is estimated to be at table.',
        // example: fakeUpdateReservationData.estimatedAtTableAt,
        type: String,
        format: 'ISO8601'
    })
    @IsISO8601()
    @IsOptional()
    estimatedAtTableAt?: Moment;

    /**
     * Pax of the reservation.
     */
    @ApiProperty({
        description: 'Number of people for the reservation.',
        // example: fakeUpdateReservationData.pax,
        maximum: 30
    })
    @IsNumber()
    @IsOptional()
    @Min(1)
    @Max(30)
    pax?: number;

    /**
     * First name of the reservation.
     */
    @ApiPropertyOptional({
        description: 'First name of the customer taking the reservation.',
        // example: fakeUpdateReservationData.firstName,
        // pattern: NAME_PATTERN.toString()
    })
    @IsOptional()
    // @Matches(NAME_PATTERN)
    @MaxLength(20)
    firstName?: string;

    /**
     * Last name of the reservation.
     */
    @ApiProperty({
        description: 'Last name of the customer taking the reservation.',
        // example: fakeUpdateReservationData.lastName,
        // pattern: NAME_PATTERN.toString()
    })
    @IsOptional()
    // @Matches(NAME_PATTERN)
    @MaxLength(20)
    lastName?: string;

    /**
     * Email of the reservation.
     */
    @ApiPropertyOptional({
        description: 'Email of the customer taking the reservation.',
        // example: fakeUpdateReservationData.email
    })
    @IsOptional()
    @IsEmail()
    email?: string;

    /**
     * Phone number of the reservation.
     */
    @ApiPropertyOptional({
        description: 'Phone number of the customer making the reservation.',
        // example: fakeUpdateReservationData.phoneNumber
    })
    @IsOptional()
    phoneNumber?: string;

    /**
     * Table of the reservation.
     */
    @ApiPropertyOptional({
        description: 'Tables number the reservation will be assigned to.',
        // example: fakeUpdateReservationData.tables,
        type: [Number]
    })
    @IsOptional()
    @IsNumber({}, { each: true })
    tables?: number[];

    /**
     * Type of the reservation.
     */
    @ApiPropertyOptional({
        description: 'The type of the reservation.',
        // example: fakeUpdateReservationData.type.toString(),
        enumName: 'ReservationType',
        enum: ReservationType
    })
    @IsOptional()
    @IsIn([ReservationType.WALK_IN, ReservationType.PRE_RESERVATION])
    type?: ReservationType;

    /**
     * Status of the reservation
     */
    @ApiPropertyOptional({
        description: 'Status of the reservation',
        // example: fakeUpdateReservationData.status,
        enum: ReservationStatus,
        enumName: 'ReservationStatus'
    })
    @IsEnum(ReservationStatus)
    @IsOptional()
    status?: ReservationStatus;

    /**
     * Tells if the tables are forced or not
     */
    @ApiPropertyOptional({
        description: 'Indicates if the reservation has been forced or not.',
        // example: fakeUpdateReservationData.forcedTable
    })
    @IsOptional()
    @IsBoolean()
    forcedTable?: boolean;
}
