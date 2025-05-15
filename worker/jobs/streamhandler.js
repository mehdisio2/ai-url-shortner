import * as db from '../config/db.js'



const streamhandler = async (data) => {
    const values = [String(data.ip), data.user_agent,data.timestamp, data.referrer, data.short_url_id, data.geo]
    console.log(JSON.stringify(values));
    const query = `INSERT INTO clicks (ip, user_agent, timestamp, referrer, url_id, country)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`

    try {
        const res = await db.query(query, values);
        console.log('Inserted:', res.rows[0]);
        return res.rows[0];
    } catch (err) {
        console.error('Error inserting request:', err);
    }

};

export default streamhandler;