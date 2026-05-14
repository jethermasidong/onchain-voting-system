import Voters from '../models/voterModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export const insert = async (req, res) => {
    try {
        const {voters_id, name_hash, precinct_number, password} = req.body;
        const hashedName = await bcrypt.hash(name_hash, 10);
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const result = await Voters.insert(voters_id, hashedName, precinct_number, hashedPassword);
       
        return res.status(201).json({message: 'Voter created successfully!', voter: result.insertId});
    } catch (err) {
        console.error("Insert Voter Error:", err);
        return res.status(500).json({message: 'Server Error!'});
    }
}




export const getVoterByVotersId = async (voters_id) => {
    const result = await Voters.getByVotersId(voters_id);
    return result[0] || null;
};


export const getAllVoters = async (req, res) => {
    try {
        const result = await Voters.getAllVoters();

        return res.status(201).json(result);
    } catch(err) {
        console.error(err);
        return res.status(500).json({message: 'Cannot get Voters!'});
    }
}


export const login = async (req, res) => {
    try {
        const {voters_id, password} = req.body;

        
        const voters = await getVoterByVotersId(voters_id);
        if (!voters) return res.status(404).json({message: 'Voter not found!'});
        
        const isMatch = await bcrypt.compare(password, voters.password);
        if (!isMatch) return res.status(401).json({message: 'Incorrect Password'});

        const token = jwt.sign({id: voters.id, voters_id: voters.voters_id, role: voters.role}, process.env.JWT_SECRET, {
            expiresIn: '24h',
        });

        return res.status(200).json({
            message: 'Login Successfully!',
            token,
            voters: {
                id: voters.id,
                voters_id: voters.voters_id,
                role: voters.role
            },
        });
    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({message: 'Server Error!'});
    }
};


export default {login, insert, getAllVoters};