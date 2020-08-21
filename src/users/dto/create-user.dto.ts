import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import * as faker from 'faker';

export class CreateUserDto {
    @ApiProperty({
        type: String,
        description: 'Username of the user.',
        example: faker.internet.email(),
    })
    username: string;

    @ApiProperty({
        type: String,
        description: 'password of the user.',
    })
    password: string;

    @ApiPropertyOptional({
        type: String,
        description: 'Last name of the user.',
        example: faker.name.lastName(),
        required: false,
    })
    @IsOptional()
    lastName?: string;

    @ApiPropertyOptional({
        type: String,
        description: 'First name of the user.',
        example: faker.name.firstName(),
        required: false,
    })
    @IsOptional()
    firstName?: string;

    @ApiPropertyOptional({
        type: String,
        description: 'Phone number of the user.',
        example: faker.phone.phoneNumber(),
        required: false,
    })
    @IsOptional()
    phone?: string;

    @ApiPropertyOptional({
        type: String,
        description: 'Email of the user.',
        example: faker.internet.email(),
        required: false,
    })
    @IsOptional()
    email?: string;

    constructor(createUser: Partial<CreateUserDto>) {
        Object.assign(this, createUser);
    }
}