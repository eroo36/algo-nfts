import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Network } from 'src/providers/algo/algo.config';
import { MintNftDTO } from './nft.dto';
import { NftService } from './nft.service';

@Controller('/nft')
@ApiTags('nft')
export class NftController {
  constructor(private readonly nftService: NftService) {}
  @Post()
  @ApiOperation({
    summary: 'Create an NFT',
    description: 'Currently only testnet is supported',
  })
  async mintNft(@Body() body: MintNftDTO) {
    if (body.network === Network.MAINNET)
      throw new HttpException(
        'Mainnet not yet supported',
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    return await this.nftService.mintNft(body);
  }
}
