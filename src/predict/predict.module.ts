import { Module } from '@nestjs/common';
import { PredictController } from './predict.contoller';
import { PredictService } from './predict.service';
import { ModelModule } from 'src/module/model.module';

@Module({
  imports: [ModelModule],
  controllers: [PredictController],
  providers: [PredictService],
})
export class PredictModule {}
