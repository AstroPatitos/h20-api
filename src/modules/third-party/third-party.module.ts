import { Module } from '@nestjs/common';
import { MateomaticsService } from './mateomatics/mateomatics.service';

@Module({
  providers: [MateomaticsService]
})
export class ThirdPartyModule {}
