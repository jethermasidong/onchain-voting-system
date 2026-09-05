import db from "../config/db.js";


const Candidates = {
    
    insert: async (first_name, last_name, position, partylist) => {
        const querysql = `
            INSERT INTO candidates 
            (first_name, last_name, position, partylist)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
            `;
        const result = await db.query(querysql, [
            first_name,
            last_name,
            position,
            partylist,
        ]);
        return result.rows[0];
    },

    getAllCandidates: async () => {
        const rows = await db.query(
            "SELECT * FROM candidates"
        );
        return rows;
    },
}

export default Candidates;