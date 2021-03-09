import {
  Controller,
  Res,
  Query,
  Get,
  HttpStatus,
  Post,
  Body,
  NotFoundException,
  Put,
  Delete,
} from '@nestjs/common';
import { AboutService } from './about.service';
import { CreateAboutDTO } from './dto/about.dto';

@Controller('about')
export class AboutController {
  constructor(private readonly AboutService: AboutService) {}

  @Post('/create')
  async addCustomer(@Res() res, @Body() CreateAboutDTO: CreateAboutDTO) {
    const lists = await this.AboutService.create(CreateAboutDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Post has been created successfully',
      lists,
    });
  }

  @Get('all')
  async findAll(@Res() res) {
    const lists = await this.AboutService.findAll();
    return res.status(HttpStatus.OK).json(lists);
  }

  @Get('id')
  async findById(@Res() res, @Query('id') id: string) {
    const lists = await this.AboutService.findById(id);
    if (!lists) throw new NotFoundException('Id does not exist!');
    return res.status(HttpStatus.OK).json(lists);
  }
  @Put('/update')
  async update(
    @Res() res,
    @Query('id') id: string,
    @Body() CreateAboutDTO: CreateAboutDTO,
  ) {
    const lists = await this.AboutService.update(id, CreateAboutDTO);
    if (!lists) throw new NotFoundException('Id does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Post has been successfully updated',
      lists,
    });
  }
  @Delete('/delete')
  async delete(@Res() res, @Query('id') id: string) {
    const lists = await this.AboutService.delete(id);
    if (!lists) throw new NotFoundException('Post does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Post has been deleted',
      lists,
    });
  }
}
