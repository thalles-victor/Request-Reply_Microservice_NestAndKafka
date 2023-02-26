import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Result } from './@Types/ResultTypes';
import { AppService } from './app.service';
import { CreateUserDTO } from './Core/DTOs/CreateUser.dto';
import { UserEntity } from './Core/Entities/User.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('USER_HELLO_TOPIC')
  getHello(@Payload() name: string): string {
    return this.appService.getHello(name);
  }

  @MessagePattern('USER_MS_GET_ALL_USERS_TOPIC')
  async getAllUsers() {
    return await this.appService.getAllUsers();
  }

  @MessagePattern('USER_MS_REGISTER_USER_TOPIC')
  async createUser(
    @Payload() userDTO: CreateUserDTO,
  ): Promise<Result<UserEntity>> {
    return await this.appService.createUserDTO(userDTO);
  }
}
