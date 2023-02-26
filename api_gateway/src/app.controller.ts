import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { UserDTO } from './Core/DTOs/User.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/user/:name')
  @ApiTags('Hello')
  getHello(@Param('name') name: string) {
    return this.appService.getHello(name);
  }

  @Post()
  @ApiBody({
    schema: {
      example: {
        user: {
          name: 'thalles',
          email: 'thalles@gmail.com',
          password: 'minhasenha123',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Create a new user' })
  @ApiTags('user')
  @ApiResponse({
    status: 200,
    description: '',
  })
  @ApiResponse({
    status: 400,
    description: 'The email is already in use',
  })
  createUser(@Body('user') userDTO: UserDTO) {
    return this.appService.createUser(userDTO);
  }

  @Get('all')
  @ApiTags('user')
  getAllUsers() {
    return this.appService.getAllUsers();
  }
}
