import { Module } from '@nestjs/common';
import { RiverService } from './river/river.service';
import { WaterBodyService } from './water-body.service';
import { WaterBodyController } from './water-body.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaterBody } from 'src/shared/entities/water-body.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WaterBody])],
  providers: [RiverService, WaterBodyService],
  controllers: [WaterBodyController],
})
export class WaterBodyModule {}
