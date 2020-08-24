import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ParseArrayPipe, ParseIntPipe } from '@nestjs/common';
import { Transform } from 'class-transformer';

export class UpdateReservationsStatusDto {
    @ApiProperty({
        description: 'Ids of reservations to upadate',
        type: [String]
    })
    reservationIds;

    @ApiProperty({
        description: 'Status to update',
        type: String
    })
    status;
}
