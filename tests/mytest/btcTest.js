const bip39 = require('bip39');
const ecc = require('tiny-secp256k1');
const { BIP32Factory } = require('bip32');
const bitcoin =require('bitcoinjs-lib');
const https = require('https');


//生成助记词
//const mnemoinc  = bip39.generateMnemonic();
const mnemoinc  = 'picnic month square wagon pause measure glide panda van subway upset portion';
console.log('生成助记词：'+mnemoinc);
//助记词转成种子
const pwd ='';
const seed = bip39.mnemonicToSeedSync(mnemoinc,pwd);
//console.log('助记词转换成种子'+seed.toString());
//初始化bip32
const bip32 = BIP32Factory(ecc);
const node = bip32.fromSeed(seed);
//console.log('我也想知道的node:'+node);
/*
WIF(wallet import format): 钱包导入格式,钱包导入格式是一个数据交换格式,设计用于允许导入和导出单个私钥,该私钥通过标志标明是否使用压缩公钥.

助记词: 助记词是便于记忆的私钥形式, 基于BIP39协议的助记词由12个英文单词构成.

地址: (普通地址)比特币地址（例如:1DSrfJdB2AnWaFNgSbv3MZC2m74996JafV）由一串字符和数字组成，以阿拉伯数字“1”开头.

UTXO: 未花费交易输出,UTXO是未花费交易输出,UTXO可以作为新交易的输入.

satoshi: 以比特币创始人中本聪（Satoshi Nakamoto）名字命名的比特币单位. 1 satoshi 等于百万分之一比特币,也是目前能流通的最小比特币单位.

隔离见证(SegWit):隔离见证是比特币协议的一个升级建议,该建议技术创新性地将签名数据从比特币交易中心分离出来.
        隔离见证是一个推荐的软件分叉方案,该变化将从技术上是的比特币协议规则更严谨.

bip: Bitconin Improvement Proposals, 比特币改进提议, 指比特币社区成员所提交的一系列改进比特币的提议.例如,
        BIP0021是一项改进比特币同一资源标识符（URI）计划的提议.

ECDSA: 椭圆曲线数字签名算法 是比特币使用的加密算法, 以确保资金只能被其正确拥有者支付.

P2PKH: Pay to Public Key Hash.支付到比特币地址的交易包含支付公钥哈希脚本, 由P2PKH脚本锁定的交易输出可以通过给出由
        相应使用创建的公钥和数字签名来解锁(消费).

P2PK: Pay to Public Key. P2PKH被创建主要目的一方面为使比特币地址更简短，使之更方便使用，核心内容还是P2PK的.

MS: Multiple Signatures, 多重签名.

P2SH: Pay to Script Hash, P2SH是MS多重签名的简化版本. P2SH是一种强大的、新型的、且能大大简化复杂交易脚本的交易类型而引入.
        通过使用P2SH,详细藐视花费输出条件的复杂脚本(赎回脚本)将不会出现在锁定脚本中,相反,只有赎回脚本哈希包含在锁定脚本中.

P2SH地址: P2SH地址是基于Base58编码的一个含有20个字节哈希的脚本.P2SH地址采用“5”前缀.这导致基于Base58编码的地址以“3”开头.
        P2SH地址隐藏了所有的复杂性,因此,运用其进行支付的人将不会看到脚本.

P2WPKH: Pay To Witness PubKey Hash, P2WPKH签名包含了与P2PKH花费相同的信息.但是签名信息放置与见证字段,而不是签名脚本字段中.公钥脚本也被修改了.

P2WSH: Pay To Witness Script Hash, P2WSH与P2SH的不同之处在于加密证据存放位置从脚本签名字段转变至见证字段,公钥脚本字段也被改变.
*/

//普通BTC bip44路径
const btcPath = "m/44'/0'/0'/0/0";
const wif = node.derivePath(btcPath).toWIF();
console.log('WIF：'+wif);
const keypair = node.derivePath(btcPath);

const p2pkh = bitcoin.payments.p2pkh({ pubkey: node.derivePath(btcPath).publicKey, network : bitcoin.networks.bitcoin });
const addr = p2pkh.address;
console.log(addr);

//SW隔离见证
const swPath = "m/49'/0'/0'/0/0";
const swwif = node.derivePath(swPath).toWIF();
console.log('SW隔离见证 WIF：'+swwif);
const  swbech32addr = bitcoin.payments.p2wpkh({ pubkey: node.derivePath(swPath).publicKey, network : bitcoin.networks.bitcoin });
console.log("BECH32编码地址"+swbech32addr.address);
const  swp2shaddr = bitcoin.payments.p2sh({
    redeem: bitcoin.payments.p2wpkh({pubkey: node.derivePath(swPath).publicKey, network: bitcoin.networks.bitcoin}),
    network: bitcoin.networks.bitcoin
})
console.log("P2SH编码地址"+swp2shaddr.address);
const testaddr =bitcoin.payments.p2pkh({ pubkey: node.derivePath(btcPath).publicKey, network : bitcoin.networks.testnet}).address;
//测试地址生成
console.log("测试地址：" + testaddr);




//获取测试网络余额
//(bitcoin Testnet3)api.blockcypher.com/v1/btc/test3
//(BlockCypher  Test)api.blockcypher.com/v1/bcy/test
const url = 'https://api.blockcypher.com/v1/btc/test3/addrs/'+ testaddr ;


https.get(url,(res) => {
    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
            let balance = JSON.parse(body);
            // do something with JSON
            console.log('测试账户地址：' + balance.address);
            console.log('测试账户余额：' + balance.balance);

        } catch (error) {
            console.error(error.message);
        };
    });

}).on("error", (error) => {
    console.error(error.message);
});


/*
    BTC的交易与其他交易并不太一样, 这里需要先对整体做一个介绍, 以便于你在接入时能更好的理解他.
    发送一笔BTC交易,你需要填入input,output,并将你的交易内容用私钥签名.
    input:你的钱从哪里来.
    output:你的钱花到哪里,花多少.

    假如说我们现在从地址A转账到地址B, 转账金额为X, 你需要先得到地址A在链上所有的UTXO, 然后将所有的UTXO余额累加到一起组成你可以使用的账户余额,
    假如定义的矿工费用是Z, 我们向地址B转账X在减掉矿工费Z得到你现在剩下的余额, 但是这里需要引起注意, 这笔剩下的余额, 你需要转入回你的地址A, 否则,
    这笔钱将全部用做矿工费用,因为每一笔交易会花掉你所有的UTXO,所以你的output应该将剩余的钱转回给地址A. 再者, 签名的时候, 对应有几笔UTXO, 
    你就需要做几次签名, 你可以理解为每一笔UTXO都在一个区块中, 你需要用你的私钥去将他解锁取出. 最后, 将你拼接好的交易内容,转化成HEX格式广播出去.

    OK,通俗的讲,我的钱包里有分别有一张50,20,5的钞票,我将花费60去买东西,这时候你事先不知道自己总共有多少, 你就将钱都给商家, 商家拿掉60后,在找零给你, 这最后的找零, 就是你账户对应的新的UTXO了.

    根据地址类型,BTC的交易也有两种形式,本质上只是签名方法不太一样.
*/


