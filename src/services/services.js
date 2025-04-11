import * as db from '../config/db.js'

export const getId = async (url) => {
    try {
        console.log(url);
        const res = await db.query('INSERT INTO urls (original_url) VALUES ($1) RETURNING id', [url])
        console.log(res.rows[0].id)
        return res;
    } catch (error) {
        console.error('cannot get the id', error)
    }
}
