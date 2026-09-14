import Candidates from "../models/candidateModel.js";


export const insert = async (req, res) => {
    try {
        const {first_name, last_name, position, partylist} = req.body;
        const result = await Candidates.insert(first_name, last_name, position, partylist);
        
        return res.status(201).json({message: 'Candidate create successfully', candidate: result.insertId});
    
    } catch (err) {
        console.error("Insert Candidate Error:", err);
        return res.status(500).json({message: 'Server Error!'});
    }
};


export const getAllCandidates = async (req, res) => {
    try {
        const result = await Candidates.getAllCandidates();

        return res.status(201).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Cannot get Candidates"});
    }
};

export const editCandidates = async (req, res) => {
    try {
        const {first_name, last_name, position, partylist} = req.body;
        const { id } = req.params;

        const result = await Candidates.editCandidates(id, first_name, last_name, position, partylist);

        return res.status(201).json({ message: "Candidate updated successfully!" });

    } catch (err) {
        console.error("Update Candidate Error:", err);
        return res.status(500).json({ message: "Server Error" });
    }
};

export const deleteCandidates = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Candidates.deleteCandidates(id);

        return res.status(201).json({ message: "Candidate deleted successfully!" });
    
    } catch (err) {
        console.error( "Cannot delete candidate", err);
        return res.status(500).json({ message: "Server Error" });
    }
}

export default {insert, getAllCandidates, editCandidates, deleteCandidates};