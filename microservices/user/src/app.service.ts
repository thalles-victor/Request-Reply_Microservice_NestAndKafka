import { HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from './Core/Entities/User.entity';
import { v4 as uuid_v4 } from 'uuid';
import { delay } from './utils/delay';
import { CreateUserDTO } from './Core/DTOs/CreateUser.dto';
import { Result } from './@Types/ResultTypes';

@Injectable()
export class AppService {
  private users: UserEntity[] = [
    {
      id: uuid_v4(),
      name: 'jhon',
      email: 'jhon@gmail.com',
      password: 'minhasenhas123',
    },
  ];

  getHello(name: string): string {
    return `Hello ${name}!!!`;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    await delay(); //await 500ms to simulate database
    return this.users;
  }

  async createUserDTO(userDTO: CreateUserDTO): Promise<Result<UserEntity>> {
    const userAlredyExist = this.users.find(
      (user) => user.email === userDTO.email,
    );

    if (userAlredyExist) {
      return {
        errors: {
          message: 'The email is already in use',
          statusCode: HttpStatus.BAD_REQUEST,
        },
        data: null,
      };
    }

    const newUser: UserEntity = {
      id: uuid_v4(),
      email: userDTO.email,
      password: userDTO.password,
      name: userDTO.name,
    };

    await delay(); //await 500ms to simulate database
    this.users.push(newUser);

    return {
      data: newUser,
      errors: null,
    };
  }
}
