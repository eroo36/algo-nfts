import { NftService } from './nft.service';
import { Module } from '@nestjs/common';
import { NftController } from './nft.controller';

@Module({
  imports: [],
  controllers: [NftController],
  providers: [NftService],
})
export class NftModule {}
