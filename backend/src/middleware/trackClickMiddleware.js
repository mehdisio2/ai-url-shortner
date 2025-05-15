import {redis, connectRedis} from "../config/redis.js";

const getIp = (req) => {
    const forwarded = req.headers['X-Real-IP'];
    return forwarded ? forwarded.split(',')[0].trim().replace : req.socket.remoteAddress.replace(/^::ffff:/, '');
}

const getShortCode = (req) => {
    const short_code = req.params.id;
    return short_code;
}

const trackClickMiddleware = async (req, res, next) => {
   try {
    const clickData = {
        ip: getIp(req) || 'unknown',
        user_agent: req.headers['user-agent'] || 'unknown',
        timestamp: new Date().toISOString(),
        referrer: req.headers['referrer'] || 'none', // careful: HTTP uses 'referer' not 'referrer'
        short_url_id: getShortCode(req) || 'unknown',
        geo: 'null' // or 'unknown' or an empty string
      };
      // Convert all values to strings:
    const cleanedData = Object.fromEntries(
        Object.entries(clickData).map(([k, v]) => [k, String(v)])
    );
    console.log(cleanedData);
    await connectRedis()
    const addLogToQueue =  await redis.xAdd('logStream', '*', cleanedData);
    if(!addLogToQueue){
        console.error('cannot add log to stream')
    }
    next()
   } catch (error) {
    console.error("Error in the server:", error);
    next()    
   }
    
}


export default trackClickMiddleware;