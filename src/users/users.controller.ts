import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  ParseIntPipe
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  @Get()
  async getAll() {
    const users = await this.usersService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Users retrieved successfully',
      data: users,
    };
  }

  @Post()
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'User created successfully',
      data: newUser,
    };
  }
  //   @Get()
  //   getAll() {
  //     const users = this.usersService.findAll();
  //     return {
  //       statusCode: HttpStatus.OK,
  //       message: 'Users retrieved successfully',
  //       data: users,
  //     };
  //   }

  //   @Get(':id')
  //   getOne(@Param('id', ParseIntPipe) id: number) {
  //     const user = this.usersService.findOne(id);
  //     if (!user) {
  //       return {
  //         statusCode: HttpStatus.NOT_FOUND,
  //         message: 'User not found',
  //       };
  //     }
  //     return {
  //       statusCode: HttpStatus.OK,
  //       message: 'User retrieved successfully',
  //       data: user,
  //     };
  //   }

  //   @Post()
  //   @HttpCode(HttpStatus.CREATED)
  //   create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
  //     const newUser = this.usersService.create(createUserDto);
  //     return {
  //       statusCode: HttpStatus.CREATED,
  //       message: 'User created successfully',
  //       data: newUser,
  //     };
  //   }

  //   @Put(':id')
  //   update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
  //     const updatedUser = this.usersService.update(id, body);
  //     if ('message' in updatedUser && updatedUser.message === 'User not found') {
  //       return {
  //         statusCode: HttpStatus.NOT_FOUND,
  //         message: 'User not found',
  //       };
  //     }
  //     return {
  //       statusCode: HttpStatus.OK,
  //       message: 'User updated successfully',
  //       data: updatedUser,
  //     };
  //   }

  //   @Delete(':id')
  //   delete(@Param('id', ParseIntPipe) id: number) {
  //     this.usersService.remove(id);
  //     return {
  //       statusCode: HttpStatus.OK,
  //       message: 'User deleted successfully',
  //     };
  //   }
}
