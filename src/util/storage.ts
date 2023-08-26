import { Storage } from '@ionic/storage';

const storage = new Storage();
await storage.create();



export const storageSave = async (key: string, value: any): Promise<void> =>{
    await storage.set(key,{ [key]: value })
}

export const storageGet = async (key: string): Promise<{ [key: string]: any }> => {
    return await storage.get(key)
}

export const storRemove = async (key:string): Promise<void> =>{
    await storage.remove(key)
}

export const storageWipe = async (): Promise<void> => {
    await storage.clear()
}

export const storageCount = async ():Promise<number> => {
    return await storage.length()
}





