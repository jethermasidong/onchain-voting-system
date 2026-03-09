import db from "../config/db.js";

const Voters = {

    getByVotersId: async (voters_id) => {
        const [rows] = await db.promise().query(
            "SELECT * FROM voters WHERE voters_id = ?", [voters_id]
        );
        return rows;
    },


    insert: async (voters_id, name_hash, precinct_number, password) => {
        const querysql = `
            INSERT INTO voters
            (voters_id, name_hash, precinct_number, password)
            VALUES (?, ?, ?, ?)
            `;
        const [result] = await db.promise().query(querysql, [
            voters_id,
            name_hash,
            precinct_number,
            password,
        ]);
        return result;
    },
}

export default Voters;