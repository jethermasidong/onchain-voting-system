import db from "../config/db.js";


const Voting = {

    getByCandidatesPosition: async (position) => {
        const [rows] = await db.promise().query(
            "SELECT * FROM candidates WHERE position = ?", [position]
        );
        return rows;
    },


    markVotersAsVoted: async (voter_id) => {
        const [result] = await db.promise().query(
            "UPDATE voters SET has_voted = 1 WHERE id = ?", [voter_id]
        );
        return result;
    },

    insertCandidateTally: async (candidate_id) => {
        const [result] = await db.promise().query(
            "UPDATE candidates SET total_votes = total_votes + 1 WHERE candidate_id IN (?)", [candidate_id]
        );
        return result
    },

    saveVotingReceipt: async (voter_id, candidate_id, receipt_hash) => {
        const values = candidate_id.map(cid => [voter_id, cid, receipt_hash]);
        
        const [result] = await db.promise().query(
            "INSERT INTO voting (voter_id, candidate_id, receipt_hash) VALUES (?, ?, ?)",
            [values]
        );
        return result;
    }

}

export default Voting;  