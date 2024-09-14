// src/chatbox/chatbox.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatboxService } from './chatbox.service';
import { ChatboxController } from './chatbox.controller';
import { Conversation, ConversationSchema } from './schemas/conversation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Conversation.name, schema: ConversationSchema }]),
  ],
  controllers: [ChatboxController],
  providers: [ChatboxService],
})
export class ChatboxModule {}
