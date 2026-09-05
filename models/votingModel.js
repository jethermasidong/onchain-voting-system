import db from "../config/db.js";


const Voting = {

    getByCandidatesPosition: async (position) => {
        const result = await db.query(
            "SELECT * FROM candidates WHERE position = $1", [position]
        );
        return result.rows[0];
    },


    markVotersAsVoted: async (voter_id) => {
        const result = await db.query(
            "UPDATE voters SET has_voted = 1 WHERE id = $1", [voter_id]
        );
        return result.rows;
    },

    insertCandidateTally: async (id) => {
        const result = await db.query(
            "UPDATE candidates SET total_votes = total_votes + 1 WHERE id IN ($1)", [id]
        );
        return result.rows[0];
    },

    saveVotingReceipt: async (voter_id, candidate_id, receipt_hash) => {
        const values = candidate_id.map(cid => [voter_id, cid, receipt_hash]);
        
        const result = await db.query(
            "INSERT INTO voting (voter_id, candidate_id, receipt_hash) VALUES $1",
            [values]
        );
        return result.rows[0];
    }

}

export default Voting;  