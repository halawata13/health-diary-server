import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DiaryModule } from './diary/diary.module';
import { SymptomModule } from './symptom/symptom.module';
import { DiarySymptomModule } from './diary-symptom/diary-symptom.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    DiaryModule,
    SymptomModule,
    DiarySymptomModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
