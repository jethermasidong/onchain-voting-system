import dotenv from 'dotenv';
import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';


dotenv.config({ path: path.resolve(process.cwd(), '.env') });


const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

let contract = null;

const abiPath = path.join(process.cwd(), 'blockchain', 'VotingSystemABI.json');

if (!fs.existsSync(abiPath)) {
    throw new Error(`❌ ABI file not found at: ${abiPath}`);
}

const ABI = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
console.log("✅ ABI loaded successfully, functions:");


ABI.forEach(fn => {
if (fn.type === 'function') console.log("  -", fn.name);
});


if (!RPC_URL || !PRIVATE_KEY || !CONTRACT_ADDRESS) {
    console.warn("⚠️ WARNING: Blockchain variables missing in .env. Blockchain features will not work.");
} else {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);
}

export default contract;
