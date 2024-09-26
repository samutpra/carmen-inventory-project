import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { Currency } from './entities/currency.entity';
import { IResponseList } from 'src/_types/_IResponseList';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('api/v1/currencies')
@ApiTags('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Post()
  @ApiBody({
    type: CreateCurrencyDto,
    description: 'Create a new currency',
  })
  @ApiResponse({
    status: 201,
    description: 'Currency created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  create(@Body() createCurrencyDto: CreateCurrencyDto) {
    return this.currenciesService.create(createCurrencyDto);
  }

  @Get()
  @ApiBody({
    type: CreateCurrencyDto,
    description: 'Get all currencies',
  })
  @ApiResponse({
    status: 200,
    description: 'Currencies retrieved successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  async findAll(): Promise<IResponseList<Currency>> {
    return this.currenciesService.findAll();
  }

  @Get(':id')
  @ApiBody({
    type: CreateCurrencyDto,
    description: 'Get a currency by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Currency retrieved successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 404,
    description: 'Currency not found',
  })
  async findOne(@Param('id') id: string): Promise<Currency> {
    return this.currenciesService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({
    type: CreateCurrencyDto,
    description: 'Update a currency by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Currency updated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 404,
    description: 'Currency not found',
  })
  update(
    @Param('id') id: string,
    @Body() updateCurrencyDto: UpdateCurrencyDto,
  ) {
    return this.currenciesService.update(id, updateCurrencyDto);
  }

  @Delete(':id')
  @ApiBody({
    type: CreateCurrencyDto,
    description: 'Delete a currency by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Currency deleted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 404,
    description: 'Currency not found',
  })
  remove(@Param('id') id: string) {
    return this.currenciesService.remove(id);
  }
}
