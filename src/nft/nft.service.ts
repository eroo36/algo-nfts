import { Injectable, Logger } from '@nestjs/common';
import { NFTStorage } from 'nft.storage';
import { Network } from 'src/providers/algo/algo.config';
import { AlgoService } from 'src/providers/algo/algo.service';
import { ARC69Metadata } from './nft.dto';

@Injectable()
export class NftService {
  public async mintNft(params: {
    assetName: string;
    unitName: string;
    metadata: ARC69Metadata;
    network: Network;
  }) {
    const { assetName, unitName, metadata, network } = params;
    const cid = await this.storeMetadata(metadata);
    const algoService = new AlgoService(network);
    const acc = algoService.generateAccount();
    await algoService.sendAlgos({
      to: acc.addr,
      amount: 0.201,
    });
    Logger.log('Sent 0.201 to : ' + acc.addr);
    const nft = await algoService.mintNft({
      assetName,
      unitName,
      from: acc,
      metadataUrl: `ipfs://${cid}`,
    });
    Logger.log('Created NFT: ' + nft['asset-index']);
    return {
      assetId: nft['asset-index'],
      algoAccount: {
        publicAddress: acc.addr,
        mnemonicKey: acc.sk,
      },
    };
  }

  public async storeMetadata(metadata: ARC69Metadata) {
    const client = new NFTStorage({ token: process.env.NFT_STORAGE_KEY });
    const blob = new Blob([JSON.stringify(metadata)], {
      type: 'application/json',
    });
    const cid = await client.storeBlob(blob);
    return cid;
  }
  public async getNft(params: { assetId: number; network: Network }) {
    const { assetId, network } = params;
    const algoService = new AlgoService(network);
    const nft = await algoService.getAssetByID(assetId);
    return nft;
  }
}
