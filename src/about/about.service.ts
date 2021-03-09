import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { About } from './interfaces/about.interface';
import { CreateAboutDTO } from './dto/about.dto';

@Injectable()
export class AboutService {
  constructor(@InjectModel('About') private AboutModel: Model<About>) {}
  async create(CreateAboutDTO: CreateAboutDTO): Promise<any> {
    const createdCat = new this.AboutModel(CreateAboutDTO);
    return createdCat.save();
  }
  async findAll(): Promise<any> {
    return await this.AboutModel.find().exec();
  }
  async findById(id): Promise<About> {
    const customer = await this.AboutModel.findById(id).exec();
    return customer;
  }
  async find(req): Promise<any> {
    return await this.AboutModel.find(req).exec();
  }
  async update(id, CreateAboutDTO: CreateAboutDTO): Promise<any> {
    return await this.AboutModel.findByIdAndUpdate(id, CreateAboutDTO, {
      new: true,
      useFindAndModify: false,
    });
  }
  async delete(id): Promise<any> {
    return await this.AboutModel.findByIdAndRemove(id, {
      useFindAndModify: false,
    });
  }
}
