import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { CurrenciesService } from './currencies.service';

import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';

import { Currency, Prisma } from '@prisma-carmen-client/tenant';

@Controller('api/v1/currencies')
@ApiTags('currencies')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  //#region GET ONE
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<ResponseSingle<Currency>> {
    return this.currenciesService.findOne(req, id);
  }
  //#endregion GET ONE

  //#region GET ALL
  @Get()
  async findAll(@Req() req: Request): Promise<ResponseList<Currency>> {
    return this.currenciesService.findAll(req);
  }
  //#endregion GET ALL

  //#region CREATE
  @Post()
  async create(
    @Body(new ValidationPipe()) createCurrencyDto: Prisma.CurrencyCreateInput,
    @Req() req: Request,
  ): Promise<ResponseId<string>> {
    return this.currenciesService.create(req, createCurrencyDto);
  }
  //#endregion CREATE

  //#region UPDATE
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCurrencyDto: Prisma.CurrencyUpdateInput,
    @Req() req: Request,
  ): Promise<ResponseId<string>> {
    return this.currenciesService.update(req, id, updateCurrencyDto);
  }
  //#endregion UPDATE

  //#region DELETE
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.currenciesService.delete(req, id);
  }
  //#endregion DELETE
}
