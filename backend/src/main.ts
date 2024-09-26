import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const options = new DocumentBuilder()
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
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

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
