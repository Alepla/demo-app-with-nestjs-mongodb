import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { SECRET } from '../config';
const jwt = require('jsonwebtoken');
import { Model } from 'mongoose';

import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  HOURS_TO_VERIFY = 4;

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    await this.isEmailUnique(user.email);
    await user.save();
    return this.buildRegistrationInfo(user);
  }

  async login(loginUserDto: LoginUserDto): Promise<User> {
    const user = await this.userModel.findOne({ email: loginUserDto.email });
    if (!user) {
      return null;
    }
    await this.checkPassword(loginUserDto.password, user);

    return this.buildRegistrationInfo(user);
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email });
    return this.buildRegistrationInfo(user);
  }

  /**************************************************************************ADMIN ACTIONS ***************************************************************************/

  async findAllUsers(): Promise<any> {
    return await this.userModel.find().exec();
  }

  async deleteUser(id): Promise<any> {
    return await this.userModel.findByIdAndRemove(id, {
      useFindAndModify: false,
    });
  }

  public generateJWT(user) {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        exp: exp.getTime() / 1000,
      },
      SECRET,
    );
  }

  /**************************************************************************PRIVATE FUNCTIONS ***************************************************************************/

  private async isEmailUnique(email: string) {
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new BadRequestException('Email most be unique.');
    }
  }

  private buildRegistrationInfo(user): any {
    const userRegistrationInfo = {
      username: user.username,
      email: user.email,
      token: this.generateJWT(user),
    };
    return userRegistrationInfo;
  }

  private async checkPassword(attemptPass: string, user) {
    const match = await bcrypt.compare(attemptPass, user.password);
    if (!match) {
      throw new NotFoundException('Wrong email or password.');
    }
    return match;
  }
}
