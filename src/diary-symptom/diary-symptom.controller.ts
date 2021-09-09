import { BadRequestException, Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { DiarySymptomService } from './diary-symptom.service';
import { JwtGuard } from '../auth/jwt.guard';
import { JwtRequest } from '../auth/auth.type';

@Controller('diary-symptom')
export class DiarySymptomController {
  constructor(private readonly diarySymptomService: DiarySymptomService) {
  }
}
