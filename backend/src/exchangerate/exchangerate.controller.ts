import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExchangerateService } from './exchangerate.service';
import { CreateExchangerateDto } from './dto/create-exchangerate.dto';
import { UpdateExchangerateDto } from './dto/update-exchangerate.dto';
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
} from '@nestjs/swagger';
import { ResponseId, ResponseList, ResponseSingle } from 'src/interfaces';
import { ExchangeRate } from 'src/entities';
import { Mock_ExchangeRate } from 'src/mocks';

@Controller('api/exchangerate')
@ApiTags('exchangerate')
export class ExchangerateController {
  constructor(private readonly exchangerateService: ExchangerateService) {}

  @Get('/v1')
  @ApiOkResponse({
    status: 200,
    description: 'Exchangerate created successfully',
    type: Promise<ResponseList<ExchangeRate>>,
    example: {
      data: Mock_ExchangeRate,
      pagination: {
        total: Mock_ExchangeRate.length,
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
  async findAll(): Promise<ResponseList<ExchangeRate>> {
    return this.exchangerateService.findAll();
  }

  @Get('/v1/:id')
  @ApiParam({ name: 'id', description: 'Exchangerate id' })
  @ApiOkResponse({
    status: 200,
    description: 'Exchangerate retrieved successfully',
    type: ResponseSingle<ExchangeRate>,
    example: {
      data: Mock_ExchangeRate[0],
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
  async findOne(
    @Param('id') id: string,
  ): Promise<ResponseSingle<ExchangeRate>> {
    return this.exchangerateService.findOne(id);
  }

  @Post('/v1')
  @ApiBody({
    type: CreateExchangerateDto,
    description: 'Create a new exchangerate',
    examples: {
      example1: {
        value: {
          create_On: new Date(),
          update_On: new Date(),
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Exchangerate created successfully',
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
  async create(
    @Body() createExchangerateDto: CreateExchangerateDto,
  ): Promise<ResponseId<string>> {
    return this.exchangerateService.create(createExchangerateDto);
  }

  @Patch('/v1/:id')
  @ApiParam({ name: 'id', description: 'Exchangerate id' })
  @ApiBody({
    type: CreateExchangerateDto,
    description: 'Update a exchangerate by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Exchangerate updated successfully',
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
    @Body() updateExchangerateDto: UpdateExchangerateDto,
  ) {
    return this.exchangerateService.update(id, updateExchangerateDto);
  }

  @Delete('/v1/:id')
  @ApiParam({ name: 'id', description: 'Exchangerate id' })
  @ApiResponse({
    status: 200,
    description: 'Exchangerate deleted successfully',
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
    return this.exchangerateService.remove(id);
  }
}
