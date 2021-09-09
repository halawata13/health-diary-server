import { Module } from '@nestjs/common';
import { SymptomService } from './symptom.service';
import { SymptomController } from './symptom.controller';
import { DatabaseModule } from '../database.module';
import { symptomProviders } from './symptom.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...symptomProviders,
    SymptomService,
  ],
  controllers: [SymptomController]
})
export class SymptomModule {}
