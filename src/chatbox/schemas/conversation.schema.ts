// src/chatbox/schemas/conversation.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConversationDocument = Conversation & Document;

@Schema()
export class Conversation {
  @Prop({ required: true })
  userMessage: string;

  @Prop({ required: true })
  botResponse: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
