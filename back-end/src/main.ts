import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

console.log(process.env.SUPABASE_URL);
console.log(process.env.SUPABASE_KEY);
console.log(process.env.DATABASE_URL);
console.log(process.env.FRONTEND_URL);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.enableCors({
  //   origin: process.env.FRONTEND_URL || 'http://localhost:3500', // Your frontend URL
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //   credentials: true,
  // });

  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [process.env.FRONTEND_URL || 'http://localhost:3500', 'http://localhost:3000'];
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });


  await app.listen(4000);
}
bootstrap();
