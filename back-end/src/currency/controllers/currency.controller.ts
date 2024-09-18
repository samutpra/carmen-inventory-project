import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { CreateCurrencyDto } from '../dtos/CreateCurrencyDto';
import { UpdateCurrencyDto } from '../dtos/UpdateCurrencyDto';
import { CurrencyService } from '../services/CurrencyService';

@Controller()
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('/api/currencies')
  getTodos(@Req() req: Request) {
    return this.currencyService.getAll(req['tenantId']);
  }

  @Post('/api/currencies')
  createCurrency(@Req() req: Request, @Body() data: CreateCurrencyDto) {
    this.currencyService.create(data, req['tenantId']);
    return HttpStatus.CREATED;
  }

  @Get('/api/currencies/:uuid')
  getCurrency(@Req() req: Request, @Param('uuid') uuid: string) {
    return this.currencyService.get(uuid, req['tenantId']);
  }

  @Put('/api/currencies/:uuid')
  updateCurrency(
    @Req() req: Request,
    @Param('uuid') uuid: string,
    @Body() data: UpdateCurrencyDto,
  ) {
    this.currencyService.update(uuid, data, req['tenantId']);
    return HttpStatus.NO_CONTENT;
  }

  @Delete('/api/currencies/:uuid')
  deleteCurrency(@Req() req: Request, @Param('uuid') uuid: string) {
    this.currencyService.delete(uuid, req['tenantId']);
    return HttpStatus.ACCEPTED;
  }
}
