import { Moment } from "moment";
import { Transform } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import * as faker from 'faker';
import * as mongoose from 'mongoose';
import * as moment from "moment";

export class User {
    @ApiPropertyOptional({
        type: String,
        description: 'Mongo id of the user in the database.',
        example: mongoose.Types.ObjectId().toHexString(),
    })
    @Transform(_id => _id.toString())
    _id?: string;

    @ApiProperty({
        type: String,
        description: 'Username of the user.',
        example: faker.internet.email(),
    })
    username: string;

    @ApiPropertyOptional({
        type: String,
        description: 'Password of the user.',
    })
    password?: string;

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
    firstName: string;

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

    @ApiProperty({
        type: String,
        description: 'Creation date of the user.',
        example: moment().toISOString(),
    })
    @Transform(updatedAt => updatedAt.toISOString())
    createdAt: Moment;

    @ApiProperty({
        type: String,
        description: 'Last update date of the user.',
        example: moment().toISOString(),
    })
    @Transform(updatedAt => updatedAt.toISOString())
    updatedAt: Moment;

    constructor(user: Partial<User>) {
        Object.assign(this, user);
    }
}

export const fakeUser = () => {
    return new User({
        _id: mongoose.Types.ObjectId().toHexString(),
        username: faker.internet.email(),
        lastName: faker.name.lastName(),
        firstName: faker.name.firstName(),
        email: faker.phone.phoneNumber(),
        password: 'testPass',
        phone: faker.internet.email(),
        createdAt: moment(),
        updatedAt: moment(),
    })
}