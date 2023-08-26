import Web3 from 'web3'
import { NETWORK_IDS } from './constants'

export const networksRaw = /* #__PURE__ */[
    // Ethereum
    {
        chain_id: 1,
        name: 'Ethereum Mainnet',
        short_name: 'Ethereum',
        logo_url: 'https://etherscan.io/images/ethereum-icon.png',
        explorer_url: 'https://etherscan.io',
        chain_type: 'ETH',
        path:"m/44'/60'/0'/0/0",
        is_testnet: false,
        is_default: true
    },
    // Goerli
    {
        chain_id: 5,
        name: 'Ethereum Goerli',
        short_name: 'Ethereum',
        logo_url: 'https://etherscan.io/images/ethereum-icon.png',
        explorer_url: 'https://goerli.etherscan.io/',
        chain_type: 'ETH',
        path:"m/44'/60'/0'/0/0",
        is_testnet: true,
        is_default: false
    },
    // Binance Smart Chain
    {
        chain_id: 56,
        name: 'Binance Smart Chain',
        short_name: 'BSC',
        logo_url: 'https://seeklogo.com/images/B/binance-coin-bnb-logo-CD94CC6D31-seeklogo.com.png',
        explorer_url: 'https://bscscan.com',
        chain_type: 'ETH',
        path:"m/44'/60'/0'/0/0",
        is_testnet: false,
        is_default: true
    },
    {
        chain_id: 97,
        name: 'BSC Testnet',
        short_name: 'BSC Testnet',
        logo_url: 'https://seeklogo.com/images/B/binance-coin-bnb-logo-CD94CC6D31-seeklogo.com.png',
        explorer_url: 'https://testnet.bscscan.com',
        chain_type: 'ETH',
        path:"m/44'/60'/0'/0/0",
        is_testnet: true,
        is_default: false
    },
    // Tron
    {
        chain_id: NETWORK_IDS.Tron,
        name: 'Tron',
        short_name: 'Tron',
        logo_url: 'https://cdn.via.exchange/networks/BitcoinCash.svg',
        explorer_url: 'https://tronscan.org/#/',
        chain_type: 'TRON',
        path:"m/44'/195'/0'/0/0",
        is_testnet: false,
        is_default: true
    }
    // Tron Testnet(Nile)
]

export const rpcsRaw = /* #__PURE__ */[
    // Ethereum
    {
        chain_id: 1,
        name: 'Ethereum Mainnet',
        rpc_url: 'https://rpc.ankr.com/eth',
        rpc_type: 'Ankr',
        request_type: 'HTTPS',
        key: null,
        is_default: true
    },
    {
        chain_id: 1,
        name: 'Ethereum Mainnet',
        rpc_url: 'https://mainnet.infura.io/v3/fea21218934843fc908630802ed8b94a',
        rpc_type: 'Infura',
        request_type: 'HTTPS',
        key: 'fea21218934843fc908630802ed8b94a',
        is_default: false
    },
    // Goerli
    {
        chain_id: 5,
        name: 'Ethereum Goerli',
        rpc_url: 'https://goerli.infura.io/v3/fea21218934843fc908630802ed8b94a',
        rpc_type: 'Infura',
        request_type: 'HTTPS',
        key: 'fea21218934843fc908630802ed8b94a',
        is_default: true
    },
    // Binance Smart Chain
    {
        chain_id: 56,
        name: 'Binance Smart Chain',
        rpc_url: 'https://rpc.ankr.com/bsc',
        rpc_type: 'Ankr',
        request_type: 'HTTPS',
        key: null,
        is_default: true
    },
    // Binance Test Chain
    {
        chain_id: 97,
        name: 'BSC Testnet',
        rpc_url: 'https://bsc-testnet.public.blastapi.io',
        rpc_type: 'Normal',
        request_type: 'HTTPS',
        key: null,
        is_default: true
    },
    // Tron
    {
        chain_id: NETWORK_IDS.Tron,
        name: 'Tron',
        rpc_url: 'https://api.trongrid.io',
        rpc_type: 'Normal',
        request_type: 'HTTPS',
        key: null,
        is_default: true
    },
    // Tron Testnet(Nile)
    {
        chain_id: NETWORK_IDS.Tron,
        name: 'Nile',
        rpc_url: 'https://nile.trongrid.io',
        rpc_type: 'Normal',
        request_type: 'HTTPS',
        key: null,
        is_default: true
    }
]

export const coinsRaw = /* #__PURE__ */[
    // Ethereum
    {
        name: 'ETH',
        chain_id: 1,
        symbol: 'ETH',
        decimals: 18,
        type: null,
        is_maincoin: true,
        contract_address: null,
        is_default: true
    },
    {
        name: 'Tether USD',
        chain_id: 1,
        symbol: 'USDT',
        decimals: 6,
        type: 'ERC20',
        is_maincoin: false,
        logo_url: null,
        contract_address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        is_default: true
    },
    // Goerli
    {
        name: 'ETH',
        chain_id: 5,
        symbol: 'ETH',
        decimals: 18,
        type: null,
        is_maincoin: true,
        contract_address: null,
        is_default: false
    },
    // Binance Smart Chain
    {
        chain_id: 56,
        name: 'Binance Smart Chain',
        symbol: 'BNB',
        decimals: 18,
        type: null,
        is_maincoin: true,
        contract_address: null,
        is_default: true
    },
    // Binance Test Chain
    {
        chain_id: 97,
        name: 'BSC Testnet',
        symbol: 'BNB',
        decimals: 18,
        type: null,
        is_maincoin: true,
        contract_address: null,
        is_default: false
    },
    // Tron
    {
        chain_id: NETWORK_IDS.Tron,
        name: 'Tron',
        symbol: 'TRX',
        decimals: 6,
        type: null,
        is_maincoin: true,
        contract_address: null,
        is_default: true
    },
    // Tron Testnet(Nile)
    {
        chain_id: NETWORK_IDS.Tron,
        name: 'Nile',
        symbol: 'TRX',
        decimals: 6,
        type: null,
        is_maincoin: true,
        contract_address: null,
        is_default: false
    }
]



//根据chain_id获取chain全部的rpcs信息,is_default:是否返回系统默认设置的币种信息
export const getRpcUrlsById = (chainId: string | number, is_default?: Boolean) => {
    const rpcUrls = rpcsRaw.filter((obj) => {
        if(is_default){
            return  (obj.chain_id === chainId) && (obj.is_default === is_default);
        }else{
            return obj.chain_id === chainId
        }
        
    })
    if (rpcUrls) {
        return rpcUrls
    }
    throw new Error(`Unknown chainId ${chainId}`)
}

//根据chain_id获取coin信息,is_default:是否返回系统默认设置的币种信息
export const getCoinsById = (chainId: string | number, is_default?: Boolean) => {
    
    const coins = coinsRaw.filter((obj) => {
        if(is_default){
            return (obj.chain_id === chainId) && (obj.is_default === is_default)
        }else{
            return obj.chain_id === chainId
        }
    })
    if (coins) {
        return coins
    }
    throw new Error(`Unknown chainId ${chainId}`)
}







const networks = networksRaw.map(item => ({
    ...item,
    chainID: item.chain_id,
    icon: item.logo_url,
    fullName: item.name,
    name: item.short_name,
    data: {
        params: [
            {
                chainId: `0x${item.chain_id.toString(16)}`,
                chainName: item.name,
                coins: getCoinsById(item.chain_id),
                rpcUrls: getRpcUrlsById(item.chain_id),
                blockExplorerUrls: [item.explorer_url]
            }
        ]
    }

}))




//获取系统默认的RPC节点
export const rpcMapping = (chainId: number) => {
    const rpcs = getRpcUrlsById(chainId);
    if(rpcs){
        const rpc = rpcs.find((obj) =>{
             obj.is_default == true;
        })
        return rpc?.rpc_url
    }
    throw new Error(`Unknown chainId ${chainId}`)
}

//根据chain_id获取chain信息
export const getNetworkById = (chainId: string | number) => {
    const network = networks.find(net => net.chain_id === chainId)
    if (network) {
        return network
    }

    throw new Error(`Unknown chainId ${chainId}`)
}




// 获取系统默认的chain
// export const getDefaultChain = {
//     const network = networksRaw.find((obj) =>{
//         return obj.is_default == true
// })}



// export const estimateGas = async (chainId: number, tx: TransactionConfig) => {
//     const rpcUrl = rpcMapping(chainId)
  
//     if (!rpcUrl) {
//       return null
//     }
  
//     const web3 = new Web3(rpcUrl)
  
//     try {
//       const gasEstimate = await web3.eth.estimateGas(tx)
//       return gasEstimate
//     } catch (error) {
//       console.error(`An error occurred while estimating gas: ${error}`)
//       throw error
//     }
//   }