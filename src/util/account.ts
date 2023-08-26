import { Usrinfo,Network  } from '../types';
import  {validateMnemonic,mnemonicToSeed }  from 'bip39';
import  { storageCount, storageSave } from './storage';
import  { getNetworkById,networksRaw ,rpcsRaw,coinsRaw} from './networks';



//生成助记词
// export function generateMnemonic(){
//     return bip39.generateMnemonic()
// }

//助记词合法性
// export function validMnemonic(mnemonic :string):boolean{
//    //const hehe = new bip39();
//    console.log(bip39);
//    return bip39.validateMnemonic(mnemonic)
// }

//生成account_id(后续有server替换)
export function createAccoutId():string{
    return String(Date.parse(new Date().toString()))
}



//根据助记词生成账户并保存
export const createAccount=async(mnemonic :string, password : string | number)  =>{
    //校验助记词
    if(!validateMnemonic(mnemonic)){
        return false
    }
    //已存在的账户数量
    const count = await storageCount();
    
    //生成account_id
    const account_id =  createAccoutId();
    //生成账户信息，并保存到本地
    const usrinfo :Usrinfo ={
        account_id : account_id,     
        name:  'myaccount',
        //walletArray: 
        // ()=>{
        //     if(count > 0){
        //         return "myAccount" + (count +1)
        //     }else{
        //         return "myAccount"
        //     }
        // }
                       
        mnemonic: mnemonic,                
        password: password,         
         //walletArray:[],                    
        //     {
        //         chain_id :string | number,   //链ID
        //         address  :string,            //对应地址
        //         rpc_url  :string,            //rpc节点设置
        //         privatKey: string,           //用户私钥
        //         currency:[Coin]              //币种信息
        //     }
            
    
        //],             
        setting:{                         
            language: 'US',             
            theme:    'system',            
            currency: 'US-dollar'             
        }
    };
   
    console.log(usrinfo);
    await storageSave(account_id,usrinfo); 

}


