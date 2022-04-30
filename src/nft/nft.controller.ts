import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiMethodNotAllowedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Network } from 'src/providers/algo/algo.config';
import {
  GetNftDTO,
  GetNftResponseDTO,
  MintNftDTO,
  MintNftResponseDTO,
} from './nft.dto';
import { NftService } from './nft.service';

@Controller('/nft')
@ApiTags('nft')
export class NftController {
  constructor(private readonly nftService: NftService) {}
  @Post()
  @ApiOperation({
    summary: 'Create an NFT',
    description: 'Currently only algorand-testnet is supported,',
  })
  @ApiBadRequestResponse({ description: 'Invalid parameters sent' })
  @ApiMethodNotAllowedResponse({
    description: 'Currently Mainnet is not available',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created NFT',
    type: MintNftResponseDTO,
  })
  async mintNft(@Body() body: MintNftDTO) {
    if (body.network === Network.ALGORAND_MAINNET)
      throw new HttpException(
        'Mainnet not yet supported',
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    return await this.nftService.mintNft(body);
  }

  @Get()
  @ApiOperation({
    summary: 'Find an NFT by assetId',
    description: 'Gets the details of an NFT by its assetId',
  })
  @ApiOkResponse({
    description: 'Successfully found the NFT',
    type: GetNftResponseDTO,
  })
  @ApiNotFoundResponse({ description: 'Asset not found' })
  async getNft(@Query() query: GetNftDTO) {
    return await this.nftService.getNft(query);
  }
}
