import { getDefaultProvider, ethers } from 'ethers'; // ethers v5
import { config, passport, blockchainData } from "@imtbl/sdk";

const passportConfig = {
  clientId: import.meta.env.VITE_IMMUTABLE_CLIENT_ID ?? "YOUR_CLIENT_ID",
  redirectUri: `${import.meta.env.VITE_BASE_URL ?? "http://localhost:5003"}/callback`,
  logoutRedirectUri: import.meta.env.VITE_BASE_URL ?? "http://localhost:5003",
  scope: "transact openid offline_access email",
  audience: "platform_api",
  baseConfig: new config.ImmutableConfiguration({
    environment: config.Environment.SANDBOX, 
    apiKey: "", // this can be empty
  })
};
const passportInstance = new passport.Passport(passportConfig);

const passportProvider = passportInstance.connectEvm();

const fetchAuth = async () => {
  try {
    const accountAddress = await passportProvider.request({
      method: "eth_requestAccounts",
    });
    console.log("connected", accountAddress);
  } catch (error) {
    console.error(error);
  } finally {
    window.location.reload();
  }
};

const contractInstance = async (signer) => {
  const CONTRACT_ADDRESS = '0xa29fe3C9D212DaB7aAc2B177398c137F0f5aE9FB';

  return new ethers.Contract(
    CONTRACT_ADDRESS,
    [
      'function safeTransferFrom(address from, address to, uint256 tokenId)',
    ],
    signer,
  );
};

const client = new blockchainData.BlockchainData({
  baseConfig: new config.ImmutableConfiguration({
    environment: config.Environment.SANDBOX, 
  })
});

const transfer = async () => {
  try {
    const CONTRACT_ADDRESS = "0xa29fe3C9D212DaB7aAc2B177398c137F0f5aE9FB"
    const chainName = 'imtbl-zkevm-testnet';
    
    const PRIVATE_KEY = "dd7a66c19d21f38c65d2ce06aa73b5225618e247ef40e313ecad1054db7553d9";
    const provider = getDefaultProvider("https://rpc.testnet.immutable.com")
    const signer = await new ethers.Wallet(PRIVATE_KEY, provider); 
  
    const accountAddress = await passportProvider.request({
      method: "eth_requestAccounts",
    });
  
    // const RECIPIENT = '0x12bbbbd2e6eee3034b223b3601b6c53473144d7e';
    const RECIPIENT = accountAddress[0];
    
    
    // const response = await client.listNFTsByAccountAddress({ chainName, accountAddress: '0xbe4Aa1396b01D88DEE2D3f96e988Dd34c3C65eb4' });
    // const response = await client.getToken({ chainName, contractAddress: CONTRACT_ADDRESS});
    // console.log("======== response", JSON.stringify(response))
  
    const sender = await signer.getAddress()
  
    const contract = await contractInstance(signer);
    const TOKEN_ID = 1
  
    const transaction = await contract.safeTransferFrom(sender, RECIPIENT, TOKEN_ID);
  
    console.log(`Track progress: https://explorer.testnet.immutable.com/token/${CONTRACT_ADDRESS}/instance/${TOKEN_ID}`)
  
    return transaction.wait(1);
  } catch (e) {
    console.error(e)
  }
}

export { passportInstance, passportProvider, fetchAuth, transfer};
