import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AboutModule } from './about/about.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AboutModule,
    MongooseModule.forRoot('mongodb://localhost:27019/mongodb_nest'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
