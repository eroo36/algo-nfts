import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString, IsUrl, Max, Min } from 'class-validator';
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
    example: 'AKNFT',
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
    example: Network.ALGORAND_TESTNET,
  })
  @IsEnum(Network)
  network: Network;
}
export class MintNftResponseDTO {
  @ApiProperty({
    description: 'ID of the asset/nft',
    example: 86862666,
  })
  assetId: number;
  @ApiProperty({
    description: 'Algorand Account that has the NFT in it',
    example: {
      publicAddress:
        'CJAQ2O2SMRNI6TB53C36X2C2WDDC64XJ5IBGNQF3SR2NOXUKZH62WKQCEA',
      mnemonicKey: 'jaguar dinosaur mammal two small ...',
    },
  })
  algoAccount: {
    publicAddress: string;
    mnemonicKey: string;
  };
}
export class GetNftDTO {
  @ApiProperty({
    description: 'ID of the asset/nft',
    example: 86862666,
  })
  @IsNumber()
  @Type(() => Number)
  @Min(10000000)
  @Max(999999999)
  assetId: number;
  @ApiProperty({
    description: 'The name of the asset/nft',
    enum: Network,
    example: Network.ALGORAND_TESTNET,
  })
  @IsEnum(Network)
  network: Network;
}

export class GetNftResponseDTO {
  @ApiProperty({ description: 'ID of the asset/nft', example: 86862666 })
  index: number;
  @ApiProperty({
    description: 'Details of the asset',
    example: {
      creator: 'ZW5AMTXITMRZJV7IZ7MZF6ISJ56HZ63SYBWVZQRIH4KBS26L22J74BX3HI',
      decimals: 0,
      'default-frozen': false,
      name: 'test-nft',
      'name-b64': 'dGVzdC1uZnQ=',
      total: 1,
      'unit-name': 'TNFT',
      'unit-name-b64': 'VE5GVA==',
      url: 'https://ipfs.io/ipfs/QmbcqLtgWsB6E4PPwoKSYPJaM8c7EsjGLPn48owdRQWy42',
      'url-b64':
        'aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1iY3FMdGdXc0I2RTRQUHdvS1NZUEphTThjN0VzakdMUG40OG93ZFJRV3k0Mg==',
    },
  })
  params: {
    creator: string;
    decimals: number;
    'default-frozen': boolean;
    name: string;
    'name-b64': string;
    total: number;
    'unit-name': string;
    'unit-name-b64': string;
    url: string;
    'url-b64': string;
  };
}
