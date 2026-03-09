import db from "../config/db.js";


const Candidates = {
    
    insert: async (full_name, position, partylist) => {
        const querysql = `
            INSERT INTO candidates 
            (full_name, position, partylist)
            VALUES (?, ?, ?)
            `;
        const [result] = await db.promise().query(querysql, [
            full_name,
            position,
            partylist,
        ]);
        return result;
    },
}

export default Candidates;