import db from "../config/db.js";

const Positions = {

    insertPosition: async (position_name, order, max_votes) => {
        const querysql = `
            INSERT INTO positions
            (position_name, "order", max_votes)
            VALUES ($1, $2, $3)
            RETURNING *;
            `;

        const result = await db.query(querysql, [
            position_name, 
            order,
            max_votes,
        ]);
        return result.rows[0];
    },

    getAllPositions: async () => {
        const rows = await db.query("SELECT * FROM positions");
        return rows;
    },


    editPosition: async (id, position_name, order, max_votes) => {
        const query = `
            UPDATE positions SET position_name = $1, "order" = $2, max_votes = $3 WHERE id = $4`;

        const result = await db.query(query, [
            position_name, 
            order,
            max_votes,
            id,
        ]);
        return result.rows[0];
    },

    deletePosition: async (id) => {
        const query = `DELETE FROM position WHERE id = $1`;
        const result = await db.query(query, [id]);
        return result.rows[0];
    }


}


export default Positions;