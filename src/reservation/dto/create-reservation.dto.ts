import { Moment } from 'moment';
import { IsBoolean, IsEmail, IsEnum, IsIn, IsISO8601, IsMongoId, IsNumber, IsOptional, IsString, Matches, Max, MaxLength } from 'class-validator';
// import { CreateReservation, fakeCreateReservation, ReservationStatus, ReservationType } from '@aphilia/data-reservations';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// import { NAME_PATTERN } from '@aphilia/utils';
import { ReservationStatus, ReservationType } from '../models/reservation.model';
import { CreateReservation } from '../models/create-reservation.model';

// const fakeCreateReservationData = fakeCreateReservation();

export class CreateReservationDto extends CreateReservation 
{
    @ApiProperty({
        description: 'The restaurant mongo id the reservation belongs to.',
        type: String,
        // example: fakeCreateReservationData.restaurant
    })
    @IsMongoId()
    restaurant: string;

    @ApiProperty({
        description: 'The date time of the reservation.',
        type: String,
        // example: fakeCreateReservationData.dateTime,
        format: 'ISO8601'
    })
    @IsISO8601()
    dateTime: Moment;

    @ApiPropertyOptional({
        description: 'Email of the customer taking the reservation.',
        // example: fakeCreateReservationData.email
    })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty({
        description: 'Date time the customer is estimated to be at table.',
        // example: fakeCreateReservationData.estimatedAtTableAt,
        type: String,
        format: 'ISO8601'
    })
    @IsISO8601()
    estimatedAtTableAt: Moment;

    @ApiPropertyOptional({
        description: 'First name of the customer taking the reservation.',
        // example: fakeCreateReservationData.firstName,
        // pattern: NAME_PATTERN.toString()
    })
    @IsOptional()
    // @Matches(NAME_PATTERN)
    @MaxLength(20)
    firstName?: string;

    @ApiProperty({
        description: 'Indicates if the reservation has been forced or not.',
        // example: fakeCreateReservationData.forcedTable
    })
    @IsBoolean()
    forcedTable: boolean;

    @ApiProperty({
        description: 'Last name of the customer taking the reservation.',
        // example: fakeCreateReservationData.lastName,
        // pattern: NAME_PATTERN.toString()
    })
    @IsOptional()
    // @Matches(NAME_PATTERN)
    @MaxLength(20)
    lastName: string;

    @ApiProperty({
        description: 'Number of people for the reservation.',
        // example: fakeCreateReservationData.pax,
        maximum: 30
    })
    @IsNumber()
    @Max(30)
    pax: number;

    @ApiPropertyOptional({
        description: 'Phone number of the customer making the reservation.',
        // example: fakeCreateReservationData.phoneNumber
    })
    @IsString()
    @IsOptional()
    phoneNumber?: string;

    @ApiProperty({
        description: 'Status of the reservation',
        // example: fakeCreateReservationData.status,
        enum: ReservationStatus,
        enumName: 'ReservationStatus'
    })
    @IsEnum(ReservationStatus)
    @IsString()
    status: ReservationStatus;

    @ApiPropertyOptional({
        description: 'Tables number the reservation will be assigned to.',
        // example: fakeCreateReservationData.tables,
        type: [Number]
    })
    @IsOptional()
    @IsNumber({}, { each: true })
    tables?: number[];

    @ApiPropertyOptional({
        description: 'The type of the reservation.',
        // example: fakeCreateReservationData.type.toString(),
        enumName: 'ReservationType',
        enum: ReservationType
    })
    @IsIn([ReservationType.PRE_RESERVATION, ReservationType.WALK_IN])
    type: ReservationType;

    constructor(createReservation: Partial<CreateReservationDto>) {
        super(createReservation);
    }
}
