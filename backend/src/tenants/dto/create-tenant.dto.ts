import { PartialType } from '@nestjs/mapped-types';
import { Tenant } from '../entities/tenant.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantDto extends PartialType(Tenant) {
  @ApiProperty({
    description: 'Tenant name',
    example: 'Sunset Beach Resort',
    required: true,
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
}
