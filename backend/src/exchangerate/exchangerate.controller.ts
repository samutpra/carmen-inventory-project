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
} from '@nestjs/common';
import { ExchangerateService } from './exchangerate.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiMethodNotAllowedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';
import { ExchangeRate, Prisma } from '@prisma-carmen-client/tenant';

@Controller('api/v1/exchangerate')
@ApiTags('exchangerate')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ExchangerateController {
  constructor(private readonly exchangerateService: ExchangerateService) {}

  //#region GET ONE
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<ResponseSingle<ExchangeRate>> {
    return this.exchangerateService.findOne(req, id);
  }
  //#endregion GET ONE

  //#region GET ALL
  @Get()
  async findAll(@Req() req: Request): Promise<ResponseList<ExchangeRate>> {
    return this.exchangerateService.findAll(req);
  }
  //#endregion GET ALL

  //#region CREATE
  @Post()
  async create(
    @Body() createExchangerateDto: Prisma.ExchangeRateCreateInput,
    @Req() req: Request,
  ): Promise<ResponseId<string>> {
    return this.exchangerateService.create(req, createExchangerateDto);
  }
  //#endregion Create

  //#region UPDATE
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExchangerateDto: Prisma.ExchangeRateUpdateInput,
    @Req() req: Request,
  ) {
    return this.exchangerateService.update(req, id, updateExchangerateDto);
  }
  //#endregion UPDATE

  //#region DELETE
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.exchangerateService.delete(req, id);
  }
  //#endregion DELETE
}
