import db from "../config/db.js";


const Candidates = {
    
    insert: async (first_name, last_name, position, partylist) => {
        const querysql = `
            INSERT INTO candidates 
            (first_name, last_name, position, partylist)
            VALUES (?, ?, ?, ?)
            `;
        const [result] = await db.promise().query(querysql, [
            first_name,
            last_name,
            position,
            partylist,
        ]);
        return result;
    },

    getAllCandidates: async () => {
        const [rows] = await db.promise().query(
            "SELECT * FROM candidates"
        );
        return rows;
    },
}

export default Candidates;