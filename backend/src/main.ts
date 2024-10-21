import * as dotenv from 'dotenv';

import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { AppModule } from './app.module';
import { DBTenantConfigService } from 'src/db_tenant/db_tenant.config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

// @Injectable()
// export class TenantMiddleware implements NestMiddleware {
//   constructor(private readonly configService: DBTenantConfigService) {}

//   use(req: Request, res: Response, next: NextFunction) {
//     const tenantId = req.headers['x-tenant-id'] as string; // Get tenant ID from headers
//     if (!tenantId) {
//       return res.status(400).send('Tenant ID missing in headers');
//     }
//     this.configService.setTenantId(tenantId);
//     next();
//   }
// }

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('CARMEN INVENTORY API')
    .setDescription('API for managing inventory')
    .setVersion('1.0')
    .addServer(
      `http://localhost:${process.env.PORT || 4000}`,
      'local environment',
    )
    .addServer(
      'https://carmen-inventory-backend.vercel.app/',
      'Dev Cloud Environment',
    )
    // .addSecurity('token', {
    //   type: 'apiKey',
    //   scheme: 'api_key',
    //   in: 'header',
    //   name: 'auth-token',
    // })
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      in: 'header',
    })
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('swagger', app, document, {
    jsonDocumentUrl: 'swagger/json',
  });

  // app.enableCors({
  //   origin: (origin, callback) => {
  //     const allowedOrigins = [
  //       process.env.FRONTEND_URL || 'http://localhost:3500',
  //       'http://localhost:3000',
  //     ];
  //     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
  //       callback(null, true);
  //     } else {
  //       callback(new Error('Not allowed by CORS'));
  //     }
  //   },
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //   credentials: true,
  // });

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
