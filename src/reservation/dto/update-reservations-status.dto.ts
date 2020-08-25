import { IsMongoId, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ReservationStatus } from '../models/reservation.model';

export class UpdateReservationsStatusDto {

    @ApiProperty({
        description: 'Ids of reservations to update',
        type: 'array',
        items: {
            allOf: [
                {
                    type: 'string'
                }
            ]
        },
    })
    @IsMongoId({
        each: true
    })
    reservationsId: string[];

    @ApiProperty({
        description: 'Status to update',
        enum: ReservationStatus
    })
    @IsEnum(ReservationStatus)
    status: ReservationStatus;
}
