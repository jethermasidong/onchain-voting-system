import { Transaction } from "ethers";
import db from "../config/db.js";


const Voting = {

    recordVoting: async (candidateIds, transaction_hash, block_number) => {
        
        const query = `
            INSERT INTO voting 
            (candidate_id, transaction_number, block_number)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        
        const result = await db.query(query, [candidateIds, transaction_hash, block_number]);
        return result.rows[0];
    },

    insertCandidateTally: async (candidateIds) => {

        updatedCandidates = [];

        for (const candidate_id of candidateIds) {
            const query = `
                UPDATE candidates
                SET total_vote = total + 1
                WHERE id = $1
                RETURNING *;
            `;
            const result = await db.query(query, [candidate_id]);
            if (result.rows.length > 0) {
                updatedCandidates.push(result.rows[0]);
            }
        }
        return updatedCandidates;
    }
}

export default Voting;  