import { Controller, Get } from '@nestjs/common';
import { NftService } from './nft.service';

@Controller()
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @Get('/nft')
  test() {
    return this.nftService.test();
  }
}
