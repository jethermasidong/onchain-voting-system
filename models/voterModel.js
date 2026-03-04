import db from "../config/db.js";

const Voters = {

    getByVotersId: async (voters_id) => {
        const [rows] = await db.promise().query(
            "SELECT * FROM voters WHERE voters_id = ?", [voters_id]
        );
        return rows;
    },
};

export default Voters;