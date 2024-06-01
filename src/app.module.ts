import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PredictModule } from './predict/predict.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PredictModule, ConfigModule.forRoot({ cache: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
