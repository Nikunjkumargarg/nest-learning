import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DataResponseInterceptor } from './common/interceptors/data-response/data-response.interceptor';

// @UsePipes(new ValidationPipe({ transform: true }))
//   createUser(@Body() createUserDto: CreateUserDto) {

// @Body(new ValidationPipe()) createUserDto: CreateUserDto,

// these both ways are same?

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  //Boiler plate code to implement swagger.
  const config = new DocumentBuilder()
    .setTitle('NestJs Master class - Blog app Api')
    .setDescription('Use the base API URL as http://localhost:3000')
    .setTermsOfService('http://localhost:3000 - terms of service')
    .addServer('http://localhost:3000')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalInterceptors(new DataResponseInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
