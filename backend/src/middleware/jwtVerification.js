import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: '/home/mahdi/Documents/Projects/ai-url-shortner/backend/.env' });

const authenticateToken = (req, res, next) => {
    const token = req.cookies['token'];
    console.log(token);
    if (!token) return res.status(401).send('Access Denied');

    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err) return res.status(403).send('Invalid Token');
        req.user = user; // Store user info from the token in the request
        next();
    });
};

export default authenticateToken;