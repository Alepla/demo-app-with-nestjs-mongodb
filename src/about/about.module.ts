import { Module } from '@nestjs/common';
import { AboutController } from './about.controller';
import { AboutService } from './about.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AboutSchema } from './schemas/about.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'About', schema: AboutSchema }]),
  ],
  controllers: [AboutController],
  providers: [AboutService],
})
export class AboutModule {}
