

export type Network ={
    chain_id: number | string,          //chain_id
    name: string,                       //链全称
    short_name: string,                 //简称
    logo_url: string,                   //logo图片地址
    explorer_url: string,               //浏览器地址
    chain_type: string,                 //内部分类（BTC、EVM、SOL、COSMOS）
    path: string,                       //BIP44路径
    is_testnet: boolean,                //是否测试网络
    is_default: boolean                 //是否系统默认chain
}

export  type Rpc ={
    chain_id: number | string,          //与network中chain对应
    name: string,                       //RPC对应的链名称
    rpc_url: string,                    //RPC节点地址
    rpc_type: string,                   //RPC节点类型（Infura、Alchemy、Local、Normal、Ankr等）
    request_type: string,               //请求类型(一般为HTTP HTTPS 和  WEBSOCKET 两种类型) 
    key: string,                        //有些节点请求的时候，需要增加key值，例如infura节点       
    is_default : boolean                //是否默认RPC节点
}

export type Coin ={
    name : string,               //币种名称
    chain_id:number | string,    //与network中chain对应
    symbol: string,              //符号 
    decimals: number,            //精度
    type: string,                //货币相关规范（ERC20 TRX20）
    is_maincoin: boolean,        //是否主币
    logo_url:string,             //币种图标地址
    contract_address: string,    //代币对应合约地址
    is_default: boolean          //是否默认货币
}

export  type Account ={
    account_id : number | string,     //账户唯一ID
    name: string,                     //账户名称，默认：我的钱包+数字
    password: number | string         //用户密码

}

export type Wallet = {
    account_id : number | string,     //账户唯一ID
    chain_id : number| string ,       //对应chain_id
    network :  object,                //对应不同的network
    address : string ,                //对应链的地址
    extend_address: string            //同一个地址可能存在不同表现形式（例如说BTC 的测试地址），作为扩展
}

export type Usrinfo ={
    account_id : number | string,     //账户唯一ID
    name: string,                     //账户名称，默认：我的钱包+数字
    mnemonic: string,                 //助记词
    password: number | string         //用户密码
    walletArray?:[                     //钱包信息
        {
            chain_id :string | number,   //链ID
            address  :string,            //对应地址
            rpc_url  :string,            //rpc节点设置
            privatKey:string,            //用户私钥
            currency:[Coin]              //币种信息
        }
    ]             
    setting:{                         //用户设置
        language: string,             //语言
        theme:    string,             //主体
        currency: string              //展示货币
    }
}

export type WalletInfo ={
    chain_id :string | number,    //链ID
    address  ?:string,            //对应地址
    rpc_url  :string,             //rpc节点设置
    privatKey?:string,            //用户私钥
    currency:[Coin]               //币种信息
}