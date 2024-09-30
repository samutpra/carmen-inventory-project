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
import { Currency } from 'src/entities';
import { ResponseId, ResponseList, ResponseSingle } from 'src/interfaces';
import {
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiMethodNotAllowedResponse,
  ApiConflictResponse,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { Mock_Currency } from 'src/mocks';

@Controller('api/currencies')
@ApiTags('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}
  @Post('/v1')
  @ApiBody({
    type: CreateCurrencyDto,
    description: 'Create a new currency',
    examples: {
      example1: {
        value: {
          name: 'Thai Baht',
          code: 'THB',
          symbol: '฿',
          isActive: true,
        },
      },
      example2: {
        value: {
          name: 'Chinese Yuan',
          code: 'CNY',
          symbol: '¥',
          isActive: false,
        },
      },
      example3: {
        value: {
          name: 'Indian Rupee',
          code: 'INR',
          symbol: '₹',
          isActive: false,
        },
      },
      example4: {
        value: {
          name: 'Russian Ruble',
          code: 'RUB',
          symbol: '₽',
          isActive: false,
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Currency created successfully',
    type: Promise<ResponseId<string>>,
    example: {
      id: '01J8ZCTHG9EG0PZXH66JY1WE5C',
    },
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request',
    example: {
      statusCode: 400,
      message: 'Bad Request',
      error: 'Bad Request',
    },
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found',
    example: {
      statusCode: 404,
      message: 'Not Found',
      error: 'Not Found',
    },
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal Server Error',
    example: {
      statusCode: 500,
      message: 'Internal Server Error',
      error: 'Internal Server Error',
    },
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      message: 'Unauthorized',
      error: 'Unauthorized',
    },
  })
  @ApiForbiddenResponse({
    status: 403,
    description: 'Forbidden',
    example: {
      statusCode: 403,
      message: 'Forbidden',
      error: 'Forbidden',
    },
  })
  @ApiMethodNotAllowedResponse({
    status: 405,
    description: 'Method Not Allowed',
    example: {
      statusCode: 405,
      message: 'Method Not Allowed',
      error: 'Method Not Allowed',
    },
  })
  @ApiConflictResponse({
    status: 409,
    description: 'Conflict',
    example: {
      statusCode: 409,
      message: 'Conflict',
      error: 'Conflict',
    },
  })
  @ApiTooManyRequestsResponse({
    status: 429,
    description: 'Too Many Requests',
    example: {
      statusCode: 429,
      message: 'Too Many Requests',
      error: 'Too Many Requests',
    },
  })
  create(
    @Body() createCurrencyDto: CreateCurrencyDto,
  ): Promise<ResponseId<string>> {
    return this.currenciesService.create(createCurrencyDto);
  }

  @Get('/v1')
  @ApiOkResponse({
    status: 200,
    description: 'Currencies retrieved successfully',
    type: Promise<ResponseList<Currency>>,
    example: {
      data: Mock_Currency,
      pagination: {
        total: Mock_Currency.length,
        page: 1,
        perPage: 10,
        pages: 1,
      },
    },
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request',
    example: {
      statusCode: 400,
      message: 'Bad Request',
      error: 'Bad Request',
    },
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found',
    example: {
      statusCode: 404,
      message: 'Not Found',
      error: 'Not Found',
    },
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal Server Error',
    example: {
      statusCode: 500,
      message: 'Internal Server Error',
      error: 'Internal Server Error',
    },
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      message: 'Unauthorized',
      error: 'Unauthorized',
    },
  })
  @ApiForbiddenResponse({
    status: 403,
    description: 'Forbidden',
    example: {
      statusCode: 403,
      message: 'Forbidden',
      error: 'Forbidden',
    },
  })
  @ApiMethodNotAllowedResponse({
    status: 405,
    description: 'Method Not Allowed',
    example: {
      statusCode: 405,
      message: 'Method Not Allowed',
      error: 'Method Not Allowed',
    },
  })
  @ApiConflictResponse({
    status: 409,
    description: 'Conflict',
    example: {
      statusCode: 409,
      message: 'Conflict',
      error: 'Conflict',
    },
  })
  @ApiTooManyRequestsResponse({
    status: 429,
    description: 'Too Many Requests',
    example: {
      statusCode: 429,
      message: 'Too Many Requests',
      error: 'Too Many Requests',
    },
  })
  async findAll(): Promise<ResponseList<Currency>> {
    return this.currenciesService.findAll();
  }

  @Get('/v1/:id')
  @ApiParam({ name: 'id', description: 'Currency id' })
  @ApiOkResponse({
    status: 200,
    description: 'Currency retrieved successfully',
    type: ResponseSingle<Currency>,
    example: {
      data: Mock_Currency[0],
    },
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request',
    example: {
      statusCode: 400,
      message: 'Bad Request',
      error: 'Bad Request',
    },
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found',
    example: {
      statusCode: 404,
      message: 'Not Found',
      error: 'Not Found',
    },
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal Server Error',
    example: {
      statusCode: 500,
      message: 'Internal Server Error',
      error: 'Internal Server Error',
    },
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      message: 'Unauthorized',
      error: 'Unauthorized',
    },
  })
  @ApiForbiddenResponse({
    status: 403,
    description: 'Forbidden',
    example: {
      statusCode: 403,
      message: 'Forbidden',
      error: 'Forbidden',
    },
  })
  @ApiMethodNotAllowedResponse({
    status: 405,
    description: 'Method Not Allowed',
    example: {
      statusCode: 405,
      message: 'Method Not Allowed',
      error: 'Method Not Allowed',
    },
  })
  @ApiConflictResponse({
    status: 409,
    description: 'Conflict',
    example: {
      statusCode: 409,
      message: 'Conflict',
      error: 'Conflict',
    },
  })
  @ApiTooManyRequestsResponse({
    status: 429,
    description: 'Too Many Requests',
    example: {
      statusCode: 429,
      message: 'Too Many Requests',
      error: 'Too Many Requests',
    },
  })
  async findOne(@Param('id') id: string): Promise<ResponseSingle<Currency>> {
    return this.currenciesService.findOne(id);
  }

  @Patch('/v1/:id')
  @ApiParam({ name: 'id', description: 'Currency id' })
  @ApiBody({
    type: CreateCurrencyDto,
    description: 'Update a currency by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Currency updated successfully',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request',
    example: {
      statusCode: 400,
      message: 'Bad Request',
      error: 'Bad Request',
    },
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found',
    example: {
      statusCode: 404,
      message: 'Not Found',
      error: 'Not Found',
    },
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal Server Error',
    example: {
      statusCode: 500,
      message: 'Internal Server Error',
      error: 'Internal Server Error',
    },
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      message: 'Unauthorized',
      error: 'Unauthorized',
    },
  })
  @ApiForbiddenResponse({
    status: 403,
    description: 'Forbidden',
    example: {
      statusCode: 403,
      message: 'Forbidden',
      error: 'Forbidden',
    },
  })
  @ApiMethodNotAllowedResponse({
    status: 405,
    description: 'Method Not Allowed',
    example: {
      statusCode: 405,
      message: 'Method Not Allowed',
      error: 'Method Not Allowed',
    },
  })
  @ApiConflictResponse({
    status: 409,
    description: 'Conflict',
    example: {
      statusCode: 409,
      message: 'Conflict',
      error: 'Conflict',
    },
  })
  @ApiTooManyRequestsResponse({
    status: 429,
    description: 'Too Many Requests',
    example: {
      statusCode: 429,
      message: 'Too Many Requests',
      error: 'Too Many Requests',
    },
  })
  update(
    @Param('id') id: string,
    @Body() updateCurrencyDto: UpdateCurrencyDto,
  ) {
    return this.currenciesService.update(id, updateCurrencyDto);
  }

  @Delete('/v1/:id')
  @ApiParam({ name: 'id', description: 'Currency id' })
  @ApiResponse({
    status: 200,
    description: 'Currency deleted successfully',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request',
    example: {
      statusCode: 400,
      message: 'Bad Request',
      error: 'Bad Request',
    },
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found',
    example: {
      statusCode: 404,
      message: 'Not Found',
      error: 'Not Found',
    },
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal Server Error',
    example: {
      statusCode: 500,
      message: 'Internal Server Error',
      error: 'Internal Server Error',
    },
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      message: 'Unauthorized',
      error: 'Unauthorized',
    },
  })
  @ApiForbiddenResponse({
    status: 403,
    description: 'Forbidden',
    example: {
      statusCode: 403,
      message: 'Forbidden',
      error: 'Forbidden',
    },
  })
  @ApiMethodNotAllowedResponse({
    status: 405,
    description: 'Method Not Allowed',
    example: {
      statusCode: 405,
      message: 'Method Not Allowed',
      error: 'Method Not Allowed',
    },
  })
  @ApiConflictResponse({
    status: 409,
    description: 'Conflict',
    example: {
      statusCode: 409,
      message: 'Conflict',
      error: 'Conflict',
    },
  })
  @ApiTooManyRequestsResponse({
    status: 429,
    description: 'Too Many Requests',
    example: {
      statusCode: 429,
      message: 'Too Many Requests',
      error: 'Too Many Requests',
    },
  })
  remove(@Param('id') id: string) {
    return this.currenciesService.remove(id);
  }
}
