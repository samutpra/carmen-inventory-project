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

  @Get('/api/currencies/:id')
  getCurrency(@Req() req: Request, @Param('id') id: string) {
    return this.currencyService.get(id, req['tenantId']);
  }

  @Put('/api/currencies/:id')
  updateCurrency(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() data: UpdateCurrencyDto,
  ) {
    this.currencyService.update(id, data, req['tenantId']);
    return HttpStatus.NO_CONTENT;
  }

  @Delete('/api/currencies/:id')
  deleteCurrency(@Req() req: Request, @Param('id') id: string) {
    this.currencyService.delete(id, req['tenantId']);
    return HttpStatus.ACCEPTED;
  }
}
