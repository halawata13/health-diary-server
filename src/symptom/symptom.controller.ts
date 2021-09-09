import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { SymptomService } from './symptom.service';
import { JwtGuard } from '../auth/jwt.guard';
import { JwtRequest } from '../auth/auth.type';
import { SymptomCreateDto, SymptomDeleteDto, SymptomGetDto, SymptomUpdateDto } from './symptom.dto';

@Controller('symptom')
export class SymptomController {
  constructor(private readonly symptomService: SymptomService) {
  }

  @UseGuards(JwtGuard)
  @Get()
  async get(@Req() req: JwtRequest, @Query() query: SymptomGetDto) {
    const result = await this.symptomService.find(req.user.id, query.id);
    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  @UseGuards(JwtGuard)
  @Get('all')
  async getAll(@Req() req: JwtRequest) {
    return await this.symptomService.findAll(req.user.id);
  }

  @UseGuards(JwtGuard)
  @Post()
  async create(@Req() req: JwtRequest, @Body() body: SymptomCreateDto) {
    return await this.symptomService.create(req.user.id, body);
  }

  @UseGuards(JwtGuard)
  @Put()
  async update(@Req() req: JwtRequest, @Body() body: SymptomUpdateDto) {
    const result = await this.symptomService.update(req.user.id, body);
    if (!result) {
      throw new BadRequestException();
    }

    return result;
  }

  @UseGuards(JwtGuard)
  @Delete()
  async delete(@Req() req: JwtRequest, @Query() query: SymptomDeleteDto) {
    const result = await this.symptomService.delete(req.user.id, query.id);
    if (!result) {
      throw new BadRequestException();
    }

    return query;
  }
}
