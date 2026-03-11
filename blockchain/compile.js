import fs from "fs";
import solc from "solc";
import path from "path";

const contractPath = path.resolve("VotingSystem.sol");
const source = fs.readFileSync(contractPath, "utf8");

//Compile Smart Contract
const input = {
  language: "Solidity",
  sources: {
    "ProductRegistry.sol": { content: source }
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
