import { NftModule } from '../nft/nft.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from 'dotenv';
config();
@Module({
  imports: [NftModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
