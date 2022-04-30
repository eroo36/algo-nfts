import { config } from 'dotenv';
config();

export interface AlgoConfig {
  apiKeyHeader: { 'x-api-key': string };
  indexerUri: string;
  clientUri: string;
  addr: string;
  sk: string;
}
export enum Network {
  TESTNET = 'testnet',
  MAINNET = 'mainnet',
}

export type CreateAssetTxn = {
  'asset-index': number;
  'confirmed-round': number;
  'pool-error': string;
  txn: any;
};

export const TESTNET_ALGO_CONF: AlgoConfig = {
  apiKeyHeader: { 'x-api-key': process.env.ALGO_API_KEY },
  indexerUri: 'https://testnet-algorand.api.purestake.io/idx2',
  clientUri: 'https://testnet-algorand.api.purestake.io/ps2',
  addr: process.env.TESTNET_ALGO_ACCOUNT,
  sk: process.env.TESTNET_ALGO_SECRET,
};

export const MAINNET_ALGO_CONF: AlgoConfig = {
  apiKeyHeader: { 'x-api-key': process.env.ALGO_API_KEY },
  indexerUri: 'https://mainnet-algorand.api.purestake.io/idx2',
  clientUri: 'https://mainnet-algorand.api.purestake.io/ps2',
  addr: process.env.MAINNET_ALGO_ACCOUNT,
  sk: process.env.MAINNET_ALGO_SECRET,
};
