import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
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
import { InventorytransactionsService } from './inventorytransactions.service';
import { CreateInventorytransactionDto } from './dto/create-inventorytransaction.dto';
import { UpdateInventorytransactionDto } from './dto/update-inventorytransaction.dto';
import { ResponseId, ResponseList, ResponseSingle } from 'src/interfaces';
import { InventoryTransaction } from 'src/entities';
import { Mock_InventoryTransaction } from 'src/mocks';

@Controller('api/inventorytransactions')
@ApiTags('inventorytransactions')
export class InventorytransactionsController {
  constructor(
    private readonly inventorytransactionsService: InventorytransactionsService,
  ) {}

  @Post('/v1')
  @ApiBody({
    type: CreateInventorytransactionDto,
    description: 'Create a new inventorytransaction',
    examples: {
      example1: {
        value: {
          create_On: new Date(),
          update_On: new Date(),
        },
      },
    },
  })
  @ApiOkResponse({
    status: 201,
    description: 'Inventorytransaction created successfully',
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
    @Body() createInventorytransactionDto: CreateInventorytransactionDto,
  ): Promise<ResponseId<string>> {
    return this.inventorytransactionsService.create(
      createInventorytransactionDto,
    );
  }

  @Get('/v1')
  @ApiOkResponse({
    status: 200,
    description: 'Inventorytransactions retrieved successfully',
    type: Promise<ResponseList<InventoryTransaction>>,
    example: {
      data: Mock_InventoryTransaction,
      pagination: {
        total: Mock_InventoryTransaction.length,
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
  async findAll(): Promise<ResponseList<InventoryTransaction>> {
    return this.inventorytransactionsService.findAll();
  }

  @Get('/v1/:id')
  @ApiParam({ name: 'id', description: 'Inventorytransaction id' })
  @ApiOkResponse({
    status: 200,
    description: 'Inventorytransaction retrieved successfully',
    type: ResponseSingle<InventoryTransaction>,
    example: {
      data: Mock_InventoryTransaction[0],
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
  ): Promise<ResponseSingle<InventoryTransaction>> {
    return this.inventorytransactionsService.findOne(id);
  }

  @Patch('/v1/:id')
  @ApiParam({ name: 'id', description: 'Inventorytransaction id' })
  @ApiBody({
    type: CreateInventorytransactionDto,
    description: 'Update a inventorytransaction by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Inventorytransaction updated successfully',
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
    @Body() updateInventorytransactionDto: UpdateInventorytransactionDto,
  ) {
    return this.inventorytransactionsService.update(
      id,
      updateInventorytransactionDto,
    );
  }

  @Delete('/v1/:id')
  @ApiParam({ name: 'id', description: 'Inventorytransaction id' })
  @ApiResponse({
    status: 200,
    description: 'Inventorytransaction deleted successfully',
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
    return this.inventorytransactionsService.remove(id);
  }
}
