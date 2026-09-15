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

        const query = `
            SELECT
                candidates.id,
                candidates.first_name,
                candidates.last_name,
                candidates.partylist,
                candidates.total_vote,
                candidates.ballot_number,
                positions.id AS position_id,
                positions.position_name,
                positions."order",
                positions.max_votes
            FROM candidates
            JOIN positions ON candidates.position_id = positions.id
            ORDER BY positions."order" ASC, candidates.last_name ASC;
            `;

        const result = await db.query(query);
        return result.rows;
    },

    editCandidates: async (id, first_name, last_name, position, partylist) => {
        const query = `UPDATE candidates SET first_name = $1, last_name = $2, position = $3 , partylist = $4 WHERE id = $5`;
        const result = await db.query(query, [
            first_name,
            last_name,
            position,
            partylist,
            id,
        ]);
        return result.rows[0];
    },

    deleteCandidates: async (id) => {
        const result = await db.query("DELETE FROM candidates WHERE id = $1", [id]);
        
        return result.rows[0];
    }
}

export default Candidates;