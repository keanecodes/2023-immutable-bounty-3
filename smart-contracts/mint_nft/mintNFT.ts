import { getDefaultProvider, Wallet } from "ethers"; // ethers v5
import { Provider, TransactionResponse } from "@ethersproject/providers"; // ethers v5
import { ERC721MintByIDClient } from "@imtbl/zkevm-contracts";

const CONTRACT_ADDRESS = "0xa29fe3C9D212DaB7aAc2B177398c137F0f5aE9FB";
const PRIVATE_KEY = "dd7a66c19d21f38c65d2ce06aa73b5225618e247ef40e313ecad1054db7553d9";

// Specify who we want to receive the minted token
const RECIPIENT = "0xbe4Aa1396b01D88DEE2D3f96e988Dd34c3C65eb4";

// Choose an ID for the new token
const TOKEN_ID = 6;

const provider = getDefaultProvider("https://rpc.testnet.immutable.com");

const mint = async (provider: Provider): Promise<TransactionResponse> => {
 // Bound contract instance
 const contract = new ERC721MintByIDClient(CONTRACT_ADDRESS);
 // The wallet of the intended signer of the mint request
 const wallet = new Wallet(PRIVATE_KEY, provider);
 // We can use the read function hasRole to check if the intended signer
 // has sufficient permissions to mint before we send the transaction
 const minterRole = await contract.MINTER_ROLE(provider);
 const hasMinterRole = await contract.hasRole(
  provider,
  minterRole,
  wallet.address
 );

 if (!hasMinterRole) {
  // Handle scenario without permissions...
  console.log("Account doesnt have permissions to mint.");
  return Promise.reject(
   new Error("Account doesnt have permissions to mint.")
  );
 }

 // Rather than be executed directly, contract write functions on the SDK client are returned
 // as populated transactions so that users can implement their own transaction signing logic.
 const populatedTransaction = await contract.populateMint(RECIPIENT, TOKEN_ID);
 const result = await wallet.sendTransaction(populatedTransaction);
 console.log(result); // To get the TransactionResponse value
 return result;
};

mint(provider);