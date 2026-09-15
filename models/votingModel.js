import db from "../config/db.js";


const Voting = {

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


}

export default Voting;  