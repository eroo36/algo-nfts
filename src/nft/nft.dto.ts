import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsUrl } from 'class-validator';
import { Network } from 'src/providers/algo/algo.config';

export class MintNftDTO {
  @ApiProperty({
    description: 'The name of the asset/nft',
    example: 'AlgoKitten',
  })
  @IsString()
  assetName: string;
  @ApiProperty({
    description: 'The name of the unit/token',
    example: 'TNFT',
  })
  @IsString()
  unitName: string;
  @ApiProperty({
    description: `JSON file url containing the metadata of the nft, standards for the metadata can be found on https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0069.md \n 
      Ideally these files are hosted on IPFS. To easily upload files to IPFS you can use services like https://pinata.cloud or https://nft.storage`,
    examples: [
      'https://ipfs.io/ipfs/QmbcqLtgWsB6E4PPwoKSYPJaM8c7EsjGLPn48owdRQWy42',
      'https://gateway.pinata.cloud/ipfs/QmbcqLtgWsB6E4PPwoKSYPJaM8c7EsjGLPn48owdRQWy42',
    ],
  })
  @IsUrl()
  metadataUrl: string;
  @ApiProperty({
    description: 'The name of the asset/nft',
    enum: Network,
  })
  @IsEnum(Network)
  network: Network;
}
