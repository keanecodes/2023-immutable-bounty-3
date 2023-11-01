import { getDefaultProvider, Wallet } from "ethers"; // ethers v5
import { Provider, TransactionResponse } from "@ethersproject/providers"; // ethers v5
import { ERC721Client } from "@imtbl/zkevm-contracts";

const CONTRACT_ADDRESS = "0xa29fe3C9D212DaB7aAc2B177398c137F0f5aE9FB";
const PRIVATE_KEY = "dd7a66c19d21f38c65d2ce06aa73b5225618e247ef40e313ecad1054db7553d9";
const provider = getDefaultProvider("https://rpc.testnet.immutable.com");

const grantMinterRole = async (
 provider: Provider
): Promise<TransactionResponse> => {
 // Bound contract instance
 const contract = new ERC721Client(CONTRACT_ADDRESS);
 // The wallet of the intended signer of the mint request
 const wallet = new Wallet(PRIVATE_KEY, provider);

 // Give the wallet minter role access
 const populatedTransaction = await contract.populateGrantMinterRole(
  wallet.address
 );
 const result = await wallet.sendTransaction(populatedTransaction);
 console.log("Minter Role Granted");
 return result;
};

grantMinterRole(provider);