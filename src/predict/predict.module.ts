import { Module } from '@nestjs/common';
import { PredictController } from './predict.contoller';
import { PredictService } from './predict.service';
import { ModelModule } from 'src/module/model.module';
import { FirestoreModule } from 'src/firestore/firestore.module';

@Module({
  imports: [ModelModule, FirestoreModule],
  controllers: [PredictController],
  providers: [PredictService],
})
export class PredictModule {}
