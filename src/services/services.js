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

export const storeShortUrl = async (shortCode, id) => {
    try {
        const res = await db.query('UPDATE urls SET short_code = ($1) WHERE id = ($2)', [shortCode, id]);
        return res;
    } catch (error) {
        console.error('cannot store the short-code')
    }

}