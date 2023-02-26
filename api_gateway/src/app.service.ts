import { HttpException, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Result } from './@Types/ResultTypes';
import { UserDTO } from './Core/DTOs/User.dto';
import { UserEntity } from './Core/Entities/User.entity';

@Injectable()
export class AppService implements OnModuleInit {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId:
          'API_GATEWAY_CLIENT_ID?id=90903c03-9143-4426-8d0b-543b5301a90b',
        brokers: ['kafka_service:9092'],
      },
      consumer: {
        groupId: 'NESTJS_KAFKA_MICROSERVICE',
      },
    },
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf('USER_HELLO_TOPIC');
    this.client.subscribeToResponseOf('USER_MS_GET_ALL_USERS_TOPIC');
    this.client.subscribeToResponseOf('USER_MS_REGISTER_USER_TOPIC');
    await this.client.connect();
  }

  getHello(name: string) {
    return this.client.send('USER_HELLO_TOPIC', name);
  }

  async getAllUsers() {
    const result = await lastValueFrom(
      this.client.send('USER_MS_GET_ALL_USERS_TOPIC', {}),
    );

    return result;
  }

  async createUser(userDTO: UserDTO): Promise<UserEntity> {
    const result = (await lastValueFrom(
      this.client.send('USER_MS_REGISTER_USER_TOPIC', userDTO),
    )) as Result<UserEntity>;

    if (result.errors) {
      throw new HttpException(result.errors.message, result.errors.statusCode);
    }

    return result.data;
  }
}
