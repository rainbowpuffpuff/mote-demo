export const SKILLS_REGISTRY_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export const SKILLS_REGISTRY_ABI = [
  {
    "type": "function",
    "name": "registerFragment",
    "inputs": [
      { "name": "_swarmReference", "type": "string" },
      { "name": "_metadata", "type": "string" },
      { "name": "_price", "type": "uint256" }
    ],
    "outputs": [{ "name": "", "type": "bytes32" }],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "purchaseFragment",
    "inputs": [{ "name": "_id", "type": "bytes32" }],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "fragments",
    "inputs": [{ "name": "", "type": "bytes32" }],
    "outputs": [
      { "name": "author", "type": "address" },
      { "name": "swarmReference", "type": "string" },
      { "name": "metadata", "type": "string" },
      { "name": "price", "type": "uint256" },
      { "name": "exists", "type": "bool" }
    ],
    "stateMutability": "view"
  }
] as const;
