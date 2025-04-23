import {redis} from "../config/redis.js";

const getIp = (req) => {
    const forwarded = req.headers['x-forwarded-for'];
    return forwarded ? forwarded.split(',')[0].trim() : req.socket.remoteAddress;
}

const getShortCode = (req) => {
    const short_code = req.params.id;
    return short_code;
}

const trackClickMiddleware = async (req, res, next) => {
   try {
    const clickData = {
            ip: getIp(req),
            User_Agent: req.headers['user-agent'],
            timestamp: new Date().toISOString(),
            referrer: req.headers['referrer'] || null,
            short_url_id: getShortCode(req),
            geo: null,
        }

    const addLogToQueue =  await redis.xAdd('logsStream', '*', clickData);
    if(!addLogToQueue){
        console.error('cannot add log to stream')
    }
    console.log(addLogToQueue);
    next()
   } catch (error) {
    console.error("Error in the server:", error);
    res.status(500).send('Internal server error');
   }
    
}

export default trackClickMiddleware;