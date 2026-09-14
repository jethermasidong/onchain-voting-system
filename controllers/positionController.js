import Positions from "../models/positionModel.js";


export const insertPosition = async (req, res) => {
    try {
        const { position_name, order, max_votes } = req.body;

        const result = await Positions.insertPosition( position_name, order, max_votes);

        return res.status(201).json({message: 'Position created successfull!'});
    } catch (err) {
        console.error("Insert Position Error:", err);
        return res.status(500).json({message: "Server Error!"});
    }
};



export const getAllPositions = async (req, res) => {
    try {
        const result = await Positions.getAllPositions();

        return res.status(201).json(result);
    } catch (err) {
        console.error("Get positions error:", err);
        return res.status(500).json({message: "Cannot get positions"});
    }
};


export const editPosition = async (req, res) => {
    try {

        const { id } = req.params;
        const { position_name, order, max_votes } = req.body;

        const result = await Positions.editPosition(id, position_name, order, max_votes);

        return res.status(201).json({ message: "Position updated successfully!" });
    
    } catch (err) {
        console.error("Update Position Error:", err);
        return res.status(500).json({ message: "Server Error!" });    
    }
};



export const deletePosition = async (req, res) => {
    try {
        const { id } = req.params;
        
        const result = await Positions.deletePosition(id);

        return res.status(201).json({ message: "Position deleted successfully!" });
    
    } catch (err) {
        console.error("Delete Position Error:", err);
        return res.status(500).json({ message: "Server Error!" });
    } 
};

export default { insertPosition, editPosition, getAllPositions, deletePosition };

