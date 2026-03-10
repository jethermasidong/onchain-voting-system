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
        res.statsus(200).json({
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
    
}