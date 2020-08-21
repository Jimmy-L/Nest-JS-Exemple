import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { Moment } from "moment";
import * as moment from "moment";
import * as faker from 'faker';

export class updateUserDto {
    @ApiPropertyOptional({
        type: String,
        description: 'Username of the user.',
        example: faker.internet.email(),
    })
    username?: string;

    @ApiPropertyOptional({
        type: String,
        description: 'Last name of the user.',
        example: faker.name.lastName(),
    })
    lastName?: string;

    @ApiPropertyOptional({
        type: String,
        description: 'First name of the user.',
        example: faker.name.firstName(),
    })
    firstName?: string;

    @ApiPropertyOptional({
        type: String,
        description: 'Phone number of the user.',
        example: faker.phone.phoneNumber(),
    })
    phone?: string;

    @ApiPropertyOptional({
        type: String,
        description: 'Email of the user.',
        example: faker.internet.email(),
    })
    email?: string;

    @ApiPropertyOptional({
        type: String,
        description: 'Password of the user.',
    })
    password?: string;

    @ApiProperty({
        type: String,
        description: 'Last update date of the user.',
        example: faker.date.recent(),
    })
    @Transform(updatedAt => updatedAt.toISOString())
    updatedAt?: Moment;

    constructor(updateUserDto) {
        this.updatedAt = moment();
    }
}