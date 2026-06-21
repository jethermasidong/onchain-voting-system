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
}


export const getAllCandidates = async (req, res) => {
    try {
        const result = await Candidates.getAllCandidates();

        return res.status(201).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Cannot get Candidates"});
    }
}

export default {insert, getAllCandidates};