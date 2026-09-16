import Voting from "../models/votingModel.js";
import { castVote } from "../on-chain/castVote.js";


export const castVoting = async (req, res) => {
    try {

        const { voter_id } = req.user.id;

        if (!voter_id || voter_id.length === 0) {
            return res.status(400).json({ error: "Unauthorized voter session!"})
        }

        const { candidateIds } = req.body;

        if (!candidateIds || candidateIds.length === 0) {
            return res.status(400).json({ error: "No candidates selected!" });
        }

        const voters_hash = ethers.id(voter_id.toString());

        const isEligible = await contract.verifyEligibility(voters_hash);

        if (!isEligible) {
            throw new Error("Invalid Blockchain Response");
        };

        const { transaction_hash, block_number } = await castVote(candidateIds, transaction_hash, block_number, voters_hash);

        await Voting.insertCandidateTally(candidateIds);

        await Voting.recordVoting( candidateIds, transaction_hash, block_number);

        res.status(200).json({
            success: true,
            message: "Vote successfully cast in DB and Blockchain",
            transaction_hash: transaction_hash,
        });

    } catch (error) {
        console.error("Voting Process Failed:", error);
        res.status(500).json({
            success: false,
            message: "An error occured in your voting process",
            error: error.message
        });
    }
};
