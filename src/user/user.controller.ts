import {
  Controller,
  Post,
  Get,
  Body,
  HttpStatus,
  Res,
  Delete,
  Query,
  NotFoundException,
  UsePipes,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { UserDec } from './user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Res() res, @Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return res.status(HttpStatus.OK).json({
      message: 'User has been created successfully',
      user,
    });
  }

  @Post('login')
  async login(@Res() res, @Body() loginUserDto: LoginUserDto): Promise<User> {
    const _user = await this.userService.login(loginUserDto);
    return res.status(HttpStatus.OK).json(_user);
  }

  @Get('findByEmail')
  async findMe(@Res() res, @UserDec('email') email: string): Promise<User> {
    const user = await this.userService.findUserByEmail(email);
    return res.status(HttpStatus.OK).json(user);
  }

  @Get('findAll')
  async findAll(@Res() res) {
    const users = await this.userService.findAllUsers();
    return res.status(HttpStatus.OK).json(users);
  }

  @Delete('delete')
  async deleteUser(@Res() res, @Query('id') id: string) {
    const user = await this.userService.deleteUser(id);
    if (!user) throw new NotFoundException('User does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'User has been deleted',
      user,
    });
  }
}
