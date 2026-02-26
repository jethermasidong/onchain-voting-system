import db from "../config/db.js";

const Voters = {

    getByVotersId: async (voters_id) => {
        const [rows] = await db.promise().query(
            "SELECT * FROM voters WHERE voters_id = ?", [email]
        );
        return rows;
    },
};

export default Voters;