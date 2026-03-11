import dotenv from "dotenv";
dotenv.config(); 

import { ethers } from "ethers";
import fs from "fs";

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RPC_URL = process.env.RPC_URL;

if (!PRIVATE_KEY || !RPC_URL) {
  throw new Error("PRIVATE_KEY or RPC_URL missing from .env");
}


const abi = JSON.parse(fs.readFileSync("./VotingSystemABI.json", "utf8"));
const bytecode = fs.readFileSync("./VotingSystemBytecode.json", "utf8");


//Deploy Smart Contract On Chain
async function main() {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  console.log("Deploying contract...");

  const factory = new ethers.ContractFactory(abi, bytecode, wallet);
  const contract = await factory.deploy();

  await contract.waitForDeployment();

  console.log("✅ Contract deployed!");
  console.log("Contract address:", contract.target); 
}

main().catch((err) => {
  console.error("Deployment failed:", err);
});
