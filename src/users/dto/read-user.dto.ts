import { ApiProperty } from "@nestjs/swagger";
import * as faker from 'faker';

export class ReadUserDto {
    @ApiProperty({
        type: String,
        description: 'Email of the user.',
        example: faker.internet.email(),
    })
    username: string;

    @ApiProperty({
        type: String,
        description: 'password of the user.',
    })
    password: string;
}