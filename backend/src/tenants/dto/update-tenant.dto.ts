import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { Tenant } from '../entities/tenant.entity';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTenantDto extends PartialType(Tenant) {
  @ApiProperty({
    description: 'Tenant id',
    example: uuidv4(),
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
}
