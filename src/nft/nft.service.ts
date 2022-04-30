import { Inject, Injectable, Logger } from '@nestjs/common';
import { Network } from 'src/providers/algo/algo.config';
import { AlgoService } from 'src/providers/algo/algo.service';

@Injectable()
export class NftService {
  public async mintNft(params: {
    assetName: string;
    unitName: string;
    metadataUrl: string;
    network: Network;
  }) {
    const { assetName, unitName, metadataUrl, network } = params;
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
      metadataUrl,
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

  public async getNft(params: { assetId: number; network: Network }) {
    const { assetId, network } = params;
    const algoService = new AlgoService(network);
    const nft = await algoService.getAssetByID(assetId);
    return nft;
  }
}
