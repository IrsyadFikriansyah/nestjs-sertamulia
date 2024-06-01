import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PredictService } from './predict.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ModelService } from 'src/module/model.service';
import { FirestoreService } from 'src/firestore/firestore.service';
import * as crypto from 'crypto';

@Controller('predict')
export class PredictController {
  constructor(
    private readonly predictService: PredictService,
    private readonly modelService: ModelService,
    private readonly firestoreService: FirestoreService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async predictImage(@UploadedFile() image: Express.Multer.File) {
    const model = this.modelService.getModel();

    if (!model) {
      throw new Error('Model is not loaded');
    }

    const { confidenceScore, label, explanation, suggestion } =
      await this.predictService.predictImage(model, image);

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const data = {
      id: id,
      result: label,
      explanation: explanation,
      suggestion: suggestion,
      confidenceScore: confidenceScore,
      createdAt: createdAt,
    };

    await this.firestoreService.uploadData('predictions', id, data);

    const response = {
      status: 'success',
      message:
        confidenceScore > 99
          ? 'Model predicted successfully.'
          : 'Model predicted successfully but confidence is low. Please use a better image.',
      data,
    };

    return response;
  }
}
