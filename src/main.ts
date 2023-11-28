import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation
  app.useGlobalPipes(new ValidationPipe());

  // Cors
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });

  // OpenAPI
  const config = new DocumentBuilder()
    .setTitle('Store & retrieve data securely')
    .setDescription('Save and retrieve json data while storing them securely. All data at rest must be securely encrypted with the key provided by the clients.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
