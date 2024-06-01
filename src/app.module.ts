import { Module } from '@nestjs/common';
import { FirestoreModule } from './firestore/firestore.module';
import { PredictModule } from './predict/predict.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FirestoreModule,
    PredictModule,
  ],
})
export class AppModule {}
