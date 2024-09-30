import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { Tenant } from 'src/entities';
import { ulid } from 'ulid';

export class UpdateTenantDto extends PartialType(Tenant) {
  @ApiProperty({
    description: 'Tenant id',
    example: ulid(),
    required: true,
    uniqueItems: true,
  })
  id: string;

  @ApiProperty({
    description: 'Tenant name',
    example: 'Sunset Beach Resort',
    required: false,
    uniqueItems: true,
  })
  name: string;

  @ApiProperty({
    description: 'Tenant description',
    example: 'A luxurious beachfront resort with stunning ocean views',
    nullable: true,
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Whether the tenant is active or not',
    example: true,
    required: false,
  })
  isActive: boolean;
}
