import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import { Network } from 'src/providers/algo/algo.config';

export class ARC69Metadata {
  @ApiProperty({
    description: '(Required) Describes the standard used.',
    example: 'ARC69',
  })
  @IsString()
  standard: string;
  @ApiProperty({
    description: 'Describes the asset to which this token represents.',
    example: 'A nice NFT description',
  })
  @IsString()
  description: string;
  @ApiProperty({
    description: `A URI pointing to an external website. Borrowed from Open Sea's metadata format (https://docs.opensea.io/docs/metadata-standards).\n
      external_url is defined similarly to the Asset URL parameter au. However, contrary to the Asset URL, the external_url does not need to link to the digital media file.`,
    example:
      'https://nftstorage.link/ipfs/bafybeid4gwmvbza257a7rx52bheeplwlaogshu4rgse3eaudfkfm7tx2my/image.png',
  })
  @IsUrl()
  @IsOptional()
  external_url?: string;
  @ApiProperty({
    description:
      'A URI pointing to an image,video ex. Borrowed from Open Sea"s metadata format (https://docs.opensea.io/docs/metadata-standards).',
    example:
      'https://nftstorage.link/ipfs/bafybeid4gwmvbza257a7rx52bheeplwlaogshu4rgse3eaudfkfm7tx2my/image.png',
  })
  @IsUrl()
  media_url: string;
  @ApiProperty({
    description:
      'Properties following the EIP-1155 "simple properties" format. (https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema)',
  })
  @IsObject()
  @IsOptional()
  properties?: { [key: string]: string };
  @ApiProperty({
    description: 'Describes the MIME type of the ASA`s URL ("au" field)',
  })
  @IsString()
  mime_type: string;
  @ApiProperty({
    description:
      'Deprecated. New NFTs should define attributes with the simple `properties` object. Marketplaces should support both the `properties` object and the `attributes` array). The `attributes` array follows Open Sea"s format: https://docs.opensea.io/docs/metadata-standards#attributes',
  })
  @IsArray()
  @IsOptional()
  attributes?: any[];
}

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
    description: `JSON object containing the metadata of the nft, standards for the metadata can be found on https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0069.md`,
  })
  @Type(() => ARC69Metadata)
  metadata: ARC69Metadata;
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
