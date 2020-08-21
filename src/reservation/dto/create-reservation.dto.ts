import { Moment } from 'moment';
import { IsEmail, IsEnum, IsISO8601, IsMongoId, IsNumber, IsOptional, IsString, Max, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ReservationStatus } from '../models/reservation.model';
import { CreateReservation, fakeCreateReservation } from '../models/create-reservation.model';

const fakeCreateReservationData = fakeCreateReservation();

export class CreateReservationDto extends CreateReservation 
{
    @ApiProperty({
        description: 'The site mongo id the reservation belongs to.',
        type: String,
        example: fakeCreateReservationData.siteId
    })
    @IsMongoId()
    siteId: string;

    @ApiPropertyOptional({
        description: 'Email of the customer taking the reservation.',
        type: String,
        example: fakeCreateReservationData.email
    })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty({
        description: 'Date time the customer is estimated to be at table.',
        example: fakeCreateReservationData.estimatedAtTableAt,
        type: String,
        format: 'ISO8601'
    })
    @IsISO8601()
    estimatedAtTableAt: Moment;

    @ApiPropertyOptional({
        description: 'First name of the customer taking the reservation.',
        example: fakeCreateReservationData.firstName,
    })
    @IsOptional()
    @MaxLength(20)
    firstName?: string;

    @ApiProperty({
        description: 'Last name of the customer taking the reservation.',
        example: fakeCreateReservationData.lastName,
        type: String,
    })
    @IsOptional()
    @MaxLength(20)
    lastName?: string;

    @ApiProperty({
        description: 'Number of people for the reservation.',
        example: fakeCreateReservationData.pax,
        type: Number,
        maximum: 30,
    })
    @IsNumber()
    @Max(30)
    pax: number;

    @ApiPropertyOptional({
        description: 'Phone number of the customer making the reservation.',
        example: fakeCreateReservationData.phoneNumber,
        type: String,
    })
    @IsString()
    @IsOptional()
    phoneNumber?: string;

    @ApiProperty({
        description: 'Status of the reservation',
        example: fakeCreateReservationData.status,
        enum: ReservationStatus,
        enumName: 'ReservationStatus'
    })
    @IsEnum(ReservationStatus)
    @IsString()
    status: ReservationStatus;

    @ApiPropertyOptional({
        description: 'Tables number the reservation will be assigned to.',
        example: fakeCreateReservationData.tables,
        type: [Number]
    })
    @IsOptional()
    @IsNumber({}, { each: true })
    tables?: number[];

    constructor(createReservation: Partial<CreateReservationDto>) {
        super(createReservation);
    }
}
