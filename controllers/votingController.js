import Voting from "../models/votingModel.js";
import crypto from "crypto";
import { castVote } from "../on-chain/castVote.js";


export const castVote = async (req, res) => {
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

        const receipt_hash = crypto
            .createHash("sha256")
            .update(`${voter_id}-${JSON.stringify(candidateIds)}-${Date.now()}`)
            .digest("hex");

        const isEligible = await contract.verifyEligibility(voters_hash);

        if (!isEligible) {
            throw new Error("Invalid Blockchain Response");
        };

        castVote(candidateIds, transaction_hash, block_number, voters_hash)

        await Voting.insertCandidateTally(candidateIds);

        await Voting.recordVoting( candidateIds, transaction_hash, block_number);


        res.status(200).json({
            success: true,
            message: "Vote successfully cast in DB and Blockchain",
            receipt_hash: receipt_hash,
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
