import contract from '../blockchain/blockchain.js';
import { ethers } from 'ethers';


export const castVote = async (voters_hash, candidateIds) => {
    try {
        const tx = await contract.castVote(voters_hash, candidateIds, {
            maxFeePerGas: ethers.parseUnits("20", "gwei"),
            maxPriorityFeePerGas: ethers.parseUnits("2", "gwei"),
        });
        await tx.wait();

        const transaction_hash = tx.hash;

        return transaction_hash;
    
    } catch (err) {
        console.error("Blockchain vote cast failed", err.message);
        throw err;
    }
}