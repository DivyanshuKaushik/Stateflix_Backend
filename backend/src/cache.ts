import {createClient} from 'redis'
import dotenv from 'dotenv'
dotenv.config()

const redisClient = createClient({
    url: process.env.REDIS_URL,
    password: process.env.REDIS_PASSWORD,
})


redisClient.on('connect', () => {
    console.log('Redis client connected')
}
)

redisClient.on('error', (err) => {
    console.log('Something went wrong ' + err)
}
)

export async function setCache(key: string, value: string) {
    return new Promise(async(resolve, reject) => {
         try{
            await redisClient.set(key, value,{EX:3600})
            return resolve(true)
            }
            catch(err){
                return reject(err)
            }
    })
}

export async function getCache(key: string) {
    return new Promise(async(resolve, reject) => {
       try{
            const data = await redisClient.get(key)
            return resolve(data)
       }catch(err){
           return reject(err)
       }
    })
}

export async function connectToRedis(){
    try{
        await redisClient.connect()
    }catch(err){
        console.log(err)
    }
}

export default redisClient