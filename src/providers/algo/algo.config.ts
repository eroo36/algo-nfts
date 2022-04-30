export const TESTNET_CONF: AlgoConfig = {
  apiKeyHeader: { 'x-api-key': 'LZddbAAiHU19FdC6j6Xxa6TaoiImRXlk8YhLNCgI' },
  indexerUri: 'https://testnet-algorand.api.purestake.io/idx2',
  clientUri: 'https://testnet-algorand.api.purestake.io/ps2',
};

interface AlgoConfig {
  apiKeyHeader: { 'x-api-key': string };
  indexerUri: string;
  clientUri: string;
}
