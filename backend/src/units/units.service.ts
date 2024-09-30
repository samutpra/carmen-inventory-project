import { CreateUnitDto } from './dto/create-unit.dto';
import { Injectable } from '@nestjs/common';
import { UpdateUnitDto } from './dto/update-unit.dto';

@Injectable()
export class UnitsService {
  create(createUnitDto: CreateUnitDto) {
    return 'This action adds a new unit';
  }

  findAll() {
    return `This action returns all units`;
  }

  findOne(id: string) {
    return `This action returns a #${id} unit`;
  }

  update(id: string, updateUnitDto: UpdateUnitDto) {
    return `This action updates a #${id} unit`;
  }

  remove(id: string) {
    return `This action removes a #${id} unit`;
  }
}
