import Voting from "../models/votingModel.js";

export const displayCandidates = async (req, res) => {
    try {
        const { position } = req.params;

        const candidates = await Voting.getByCandidatesPosition(position);

        if (candidates.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No candidates found for the position: ${position}`
            });
        }
        res.status(200).json({
            success: true,
            data: candidates
        });
    } catch (error) {
        console.error("Error fetching candidates", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};



export const voteCandidate = async (req, res) => {
    try {
        const {candidate_id} = req.body;
        const voter_id = req.user;

        const receipt_hash = crypto
            .createHash("sha256")
            .update(`${voter_id}-${JSON.stringify(candidate_id)}-${Date.now()}`)
            .digest("hex");


        await Voting.markVotersAsVoted(voter_id);

        await Voting.insertCandidateTally(candidate_id);

        await Voting.saveVotingReceipt(voter_id, candidate_id, receipt_hash);

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