import { ApiProperty, PartialType } from '@nestjs/swagger';

export class ContactDTO {
    @ApiProperty({
        description: `A descriptive name for contact`,
        required: true,
        type: 'string',
        default: null,
        example: `Mango`,
    })
    readonly name: string;

    @ApiProperty({
        description: `Unique email for contact`,
        required: true,
        uniqueItems: true,
        type: 'string',
        default: null,
        example: `mango@gmail.com`,
    })
    readonly email: string;

    @ApiProperty({
        description: `Telephone number for contact`,
        required: true,
        type: 'string',
        default: null,
        example: `0660847583`,
    })
    readonly phone: string;
}

export class UpdateContactDTO extends PartialType(ContactDTO) {
    @ApiProperty({
        description: `Database document's id`,
        required: true,
        type: 'string',
        default: null,
        example: `5f0309aef37826faf7367ef0`,
    })
    readonly id: string;
}

export class DeleteContactDTO {
    @ApiProperty({
        description: `Database document's id`,
        required: true,
        type: 'string',
        default: null,
        example: `5f0309aef37826faf7367ef0`,
    })
    readonly id: string;
}
