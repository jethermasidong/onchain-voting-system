import db from "../config/db.js";

const Voters = {

    getByVotersId: async (voters_id) => {
        const result = await db.query(
            "SELECT * FROM voters WHERE voters_id = $1", [voters_id]
        );
        return result.rows[0];
    },


    getAllVoters: async () => {
        const results = await db.query(
            "SELECT * FROM voters"
        );
        return results.rows;
    },

    deleteVoters: async (id) => {
        const result = await db.query(
            "DELETE FROM voters WHERE id = $1", [id]
        );
        return result.rows[0];
    },


    editVoters: async (id, voters_id, name_hash, precinct_number, password) => {
        const query = `UPDATE voters SET voters_id = $1, name_hash = $2, precinct_number = $3 , password = $4 WHERE id = $5`;
        const result = await db.query(query, [
            voters_id,
            name_hash,
            precinct_number,
            password,
            id,
        ]);
        return result.rows[0];
    },


    insert: async (voters_id, name_hash, precinct_number, password) => {

        const querysql = `
            INSERT INTO voters
            (voters_id, name_hash, precinct_number, password, role)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
            `;
        const result = await db.query(querysql, [
            voters_id,
            name_hash,
            precinct_number,
            password,
            "voter"
        ]);
        return result.rows[0];
    },
}

export default Voters;