import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Request-Reply with NestJS and Kafka')
    .setDescription(
      'This project is an example of use nestjs using kafka microservice',
    )
    .setVersion('1.0')
    .addTag('API Microservice use NestJS, Kafka and request-reply concept')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);

  await app.listen(3000);
  console.log(`Server is running at ${await app.getUrl()}`);
}
bootstrap();
