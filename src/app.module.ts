import { AlgoModule } from './providers/algo/algo.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AlgoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
