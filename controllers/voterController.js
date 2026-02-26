import Voters from '../models/voterModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const getVoterByVotersId = async (voters_id) => {
    const result = await Voters.getByVotersId(voters_id);
    return result[0] || null;
};



export const login = async (req, res) => {
    try {
        const {voters_id, password} = req.body;
        
        const voters = await getVoterByVotersId(voters_id);
        if (!voters) return res.status(404).json({message: 'Voter not found!'});

        const isMatch = await bcrypt.compare(password, voters.password);
        if (!isMatch) return res.status(401).json({message: 'Incorrect Password'});

        const token = jwt.sign({id: voters.id, voters_id: voters.voters_id}, process.env.JWT_SECRET, {
            expiresIn: '24h',
        });

        return res.status(200).json({
            message: 'Login Successfully!',
            token,
            voters: {
                id: voters.id,
                voters_id: voters.voters_id,
            },
        });
    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({message: 'Server Error!'});
    }
};


export default login;