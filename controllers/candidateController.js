import Candidates from "../models/candidateModel";


export const insert = async (req, res) => {
    try {
        const {full_name, position, partylist} = req.body;
        const newCandidate = await Candidates.insert(full_name, position, partylist);
        
        return res.status(201).json({message: 'Candidate create successfully', candidate: newCandidate});
    
    } catch (err) {
        console.error("Insert Candidate Error:", err);
        return res.status(500).json({message: 'Server Error!'});
    }
}


export default insert;