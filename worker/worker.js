import {redis, connectRedis} from '../backend/src/config/redis.js'
import streamhandler from './jobs/streamhandler.js'

const streamKey = 'logStream'
const groupName = 'logGroup'
const consumerName = 'worker-1'


async function runWorker(){
    console.log("worker is running")
    await connectRedis()
    
    try {
        await redis.xGroupCreate(streamKey, groupName, '0',{MKSTREAM: true});
    } catch (error) {
        console.error('cannot create group:', error);
        if(!error.message.includes('BUSYGROUP')) throw error;
    }

    while(true){
        const res = await redis.xReadGroup(groupName, consumerName, 
            {key: streamKey,id: '>' },{BLOCK: 0, COUNT: 1})
        if (res) {
            try {
                for (const message of res[0].messages) {
                    const id = message.id;
                    const data = message.message;
                    await streamhandler(data);
                    await redis.xAck(streamKey, groupName, id);
                } 
            } catch (error) {
                console.error(`[${consumerName}] Erorr:`, error.message)
            }
        
        }
    
    }
   
}

runWorker();