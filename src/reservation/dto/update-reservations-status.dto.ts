import { IsNotEmpty, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ReservationStatus } from '../models/reservation.model';
import { Transform } from 'class-transformer';

export class UpdateReservationsStatusDto {

    @ApiProperty({
        description: 'Ids of reservations to upadate',
        type: [String]
    })
    @Transform(reservationId => Array.from(reservationId))
    @IsNotEmpty()
    reservationsIds: string[];

    @ApiProperty({
        description: 'Status to update',
        type: String
    })
    @IsIn(Object.keys(ReservationStatus))
    @IsNotEmpty()
    status: ReservationStatus;
}
