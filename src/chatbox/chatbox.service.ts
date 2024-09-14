// src/chatbox/chatbox.service.ts

import { Injectable } from '@nestjs/common';
import { OpenAI } from 'langchain/llms/openai';
import { LLMChain, PromptTemplate } from 'langchain';
import { BufferMemory } from 'langchain/memory';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Conversation, ConversationDocument } from './schemas/conversation.schema';

@Injectable()
export class ChatboxService {
  private model: OpenAI;
  private chain: LLMChain;

  constructor(
    @InjectModel(Conversation.name) private conversationModel: Model<ConversationDocument>,
  ) {

    this.model = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const promptTemplate = new PromptTemplate({
      template: 'You are a helpful assistant. Answer the following: {question}',
      inputVariables: ['question'],
    });

    const memory = new BufferMemory();

    this.chain = new LLMChain({
      llm: this.model,
      prompt: promptTemplate,
      memory: memory,
    });
  }

  async getResponse(userQuery: string): Promise<string> {
    const response = await this.chain.call({ question: userQuery });

    const newConversation = new this.conversationModel({
      userMessage: userQuery,
      botResponse: response.text,
    });
    await newConversation.save();

    return response.text;
  }
}
