import db from "../config/db.js";
import { deleteVoters } from "../controllers/voterController.js";

const Voters = {

    getByVotersId: async (voters_id) => {
        const [rows] = await db.promise().query(
            "SELECT * FROM voters WHERE voters_id = ?", [voters_id]
        );
        return rows;
    },


    getAllVoters: async () => {
        const [rows] = await db.promise().query(
            "SELECT * FROM voters"
        );
        return rows;
    },

    deleteVoters: async (id) => {
        const [rows] = await db.promise().query(
            "DELETE FROM voters WHERE id = ?", [id]
        );
        return rows;
    },


    editVoters: async (id, voters_id, name_hash, precinct_number, password) => {
        const query = `UPDATE voters SET voters_id = ?, name_hash = ?, precinct_number = ?, password = ? WHERE id = ?`;
        const [result] = await db.promise().query(query, [
            voters_id,
            name_hash,
            precinct_number,
            password,
            id,
        ]);
        return result;
    },


    insert: async (voters_id, name_hash, precinct_number, password) => {

        const querysql = `
            INSERT INTO voters
            (voters_id, name_hash, precinct_number, password, role)
            VALUES (?, ?, ?, ?, ?)
            `;
        const [result] = await db.promise().query(querysql, [
            voters_id,
            name_hash,
            precinct_number,
            password,
            "voter"
        ]);
        return result;
    },
}

export default Voters;