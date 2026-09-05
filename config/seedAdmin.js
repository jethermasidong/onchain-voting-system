
import bcrypt from 'bcrypt';
import Voters from '../models/voterModel.js';

async function createAdmin() {
    try {
        const hashedName = await bcrypt.hash('Admin_User', 10);
        const hashedPassword = await bcrypt.hash('password', 10);
        
        const result = await Voters.insert('ADMIN-001', hashedName, '0000', hashedPassword);
        
        console.log('Admin created successfully! ID:', result.insertId);
        //process.exit(0);
    } catch (err) {
        console.error('Failed to create admin:', err);
       //process.exit(1);
    }
}

//createAdmin();