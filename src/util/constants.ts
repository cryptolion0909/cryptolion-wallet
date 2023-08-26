


export const NETWORK_IDS = /* #__PURE__ */ {
    Ethereum: 1,
    Rinkeby: 4,
    Optimism: 10,
    OptimismTestnet: 69,
    Binance: 56,
    BinanceTestnet: 97,
    Polygon: 137,
    PolygonTestnet: 80001,
    Arbitrum: 42161,
    ArbitrumTestnet: 421611,
    Fantom: 250,
    Astar: 592,
    FantomTestnet: 4002,
    Avalanche: 43114,
    AvalancheTestnet: 43113,
    Harmony: 1666600000,
    HarmonyTestnet: 1666700000,
    Heco: 128,
    HecoTestnet: 256,
    Okex: 66,
    OkexTestnet: 65,
    Candle: 534,
    Gnosis: 100,
    KuCoin: 321,
    Moonbeam: 1284,
    Moonriver: 1285,
    MoonriverTestnet: 1287,
    Fuse: 122,
    Cube: 1818,
    Aurora: 1313161554,
    Cronos: 25,
    Boba: 288,
    Celo: 42220,
    ZkSync: 324,
    Solana: -1,
    SolanaTestnet: -1001,
    TON: -3,
    Cosmos: -100,
    Osmosis: -101,
    Sifchain: -102,
    TONTestnet: -1003,
    BTC: -200,
    Litecoin: -201,
    BCH: -202,
    Tron: -10
  } as const

export const BTC_CHAINS = [NETWORK_IDS.BTC, NETWORK_IDS.Litecoin, NETWORK_IDS.BCH]
export const EVM_CHAINS = /* #__PURE__ */ Object.keys(NETWORK_IDS).filter(chainName => NETWORK_IDS[chainName as keyof typeof NETWORK_IDS] > 0).map(chainName => NETWORK_IDS[chainName as keyof typeof NETWORK_IDS])
export const SOL_CHAINS = [NETWORK_IDS.Solana, NETWORK_IDS.SolanaTestnet]
export const COSMOS_CHAINS = [NETWORK_IDS.Cosmos, NETWORK_IDS.Osmosis, NETWORK_IDS.Sifchain] as const

export const isEvmChain = (chainId: number) => chainId > 0
export const isCosmosChain = (chainId: number) => COSMOS_CHAINS.includes(chainId as any)
export const isSolChain = (chainId: number) => SOL_CHAINS.includes(chainId as any)
export const isBTClikeChain = (chainId: number) => BTC_CHAINS.includes(chainId as any)

