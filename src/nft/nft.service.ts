import { Inject, Injectable } from '@nestjs/common';
import { Network } from 'src/providers/algo/algo.config';
import { AlgoService } from 'src/providers/algo/algo.service';

@Injectable()
export class NftService {
  test() {
    const algoService = new AlgoService(Network.TESTNET);
    return algoService.generateAccount();
  }
}
