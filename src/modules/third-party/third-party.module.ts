import { Module } from '@nestjs/common';
import { MateomaticsService } from './mateomatics/mateomatics.service';
import { LlamaIndexService } from './llama-index/llama-index.service';

@Module({
  providers: [MateomaticsService, LlamaIndexService]
})
export class ThirdPartyModule {}
