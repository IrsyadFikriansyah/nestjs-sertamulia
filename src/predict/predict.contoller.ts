import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PredictService } from './predict.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ModelService } from 'src/module/model.service';

@Controller('predict')
export class PredictController {
  constructor(
    private readonly predictService: PredictService,
    private readonly modelService: ModelService,
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

    // console.log(data);
    // await storeData(id, data);

    const response = {
      status: 'success',
      message:
        confidenceScore > 99
          ? 'Model is predicted successfully.'
          : 'Model is predicted successfully but under threshold. Please use the correct picture',
      data,
    };

    return response;
  }
}
