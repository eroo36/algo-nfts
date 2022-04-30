import { NftService } from './nft.service';
import { Module } from '@nestjs/common';
import { AlgoService } from 'src/providers/algo/algo.service';
import { NftController } from './nft.controller';

@Module({
  imports: [],
  controllers: [NftController],
  providers: [NftService],
})
export class NftModule {}
