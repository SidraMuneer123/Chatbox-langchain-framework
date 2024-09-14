import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatboxModule } from './chatbox/chatbox.module';

dotenv.config();  // for loading env file

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI, ),
    ChatboxModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

