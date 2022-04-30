import { AlgoService } from './algo.service';
import { Module } from '@nestjs/common';
@Module({
  imports: [],
  controllers: [],
  providers: [AlgoService],
  exports: [AlgoService],
})
export class AlgoModule {}
