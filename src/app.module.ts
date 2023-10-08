import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WaterBodyModule } from './modules/water-body/water-body.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './core/config/typeorm.config';
import { ThirdPartyModule } from './modules/third-party/third-party.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    WaterBodyModule,
    ThirdPartyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
