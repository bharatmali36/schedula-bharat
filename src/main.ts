import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';


// async function bootstrap1() {
//   console.log('DB URL:', process.env.DATABASE_URL); // add this
//   const app = await NestFactory.create(AppModule);
  
// }



async function bootstrap() {
  const app =
    await NestFactory.create(AppModule);

    app.enableCors({
    origin: '*',  // change to your frontend URL once you have one
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();