// src/chatbox/chatbox.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { ChatboxService } from './chatbox.service';

@Controller('chatbox')
export class ChatboxController {
  constructor(private readonly chatboxService: ChatboxService) {}

  @Post('message')
  async getChatResponse(@Body('query') query: string): Promise<{ message: string }> {
    const response = await this.chatboxService.getResponse(query);
    return { message: response };
  }
}
