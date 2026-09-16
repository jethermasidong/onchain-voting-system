import fs from "fs";
import solc from "solc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contractPath = path.resolve(__dirname, "VotingSystem.sol");
const source = fs.readFileSync(contractPath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    "VotingSystem.sol": { content: source }
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["abi", "evm.bytecode.object"]
      }
    }
  }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

if (output.errors) {
  output.errors.forEach((err) => {
    console.error(err.formattedMessage);
  });
  throw new Error("Compilation failed");
}
const contract = output.contracts["VotingSystem.sol"]["VotingSystem"];
fs.writeFileSync("VotingSystemABI.json", JSON.stringify(contract.abi, null, 2));
fs.writeFileSync("VotingSystemBytecode.json", contract.evm.bytecode.object);

console.log("✅ Contract compiled successfully!");
