import { getDefaultProvider, Wallet, ethers } from 'ethers'; // ethers v5
import { config, passport, blockchainData } from "@imtbl/sdk";
import { ERC721Client } from '@imtbl/contracts';

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

const client = new blockchainData.BlockchainData({
  baseConfig: new config.ImmutableConfiguration({
    environment: config.Environment.SANDBOX, 
    "x-immutable-api-Key": 123,
    apiKey: "", // this can be empty
  })
});

const fetchAuth = async () => {
  try {
    const accountAddress = await passportProvider.request({
      method: "eth_requestAccounts",
    });
    console.log("connected", accountAddress);
    const chainName = 'imtbl-zkevm-testnet';
    // const response = await client.listNFTsByAccountAddress({ chainName, accountAddress: '0xbe4Aa1396b01D88DEE2D3f96e988Dd34c3C65eb4' });
    const response = await client.listNFTsByAccountAddress({ chainName, accountAddress });
    console.log("======== response", JSON.stringify(response))
  } catch (error) {
    console.error(error);
  } finally {
    window.location.reload();
  }
};

const refreshNFTMetadata = async () => {
  const chainName = 'imtbl-zkevm-testnet';
  const updatedNFT = await client.refreshNFTMetadata({
    chainName,
    contractAddress: '0xcbcfe130787ed5a88871e3f646f1ea0bfbd80cb4',
    refreshNFTMetadataByTokenIDRequest:  {
      nft_metadata: [{
        name: "My Updated NFT",
        description: "I have updated my NFT metadata!!",
        image: "https://silver-dying-wildebeest-127.mypinata.cloud/ipfs/QmURsTtEomzmUbxtqAUpCkehCT6ZFBuLRFb8VxNtzWiTXb/",
        animation_url: null,
        external_link: null,
        youtube_url: null,
      }]
    }
  });
  console.log(updatedNFT)
};

const contractInstance = async (signer) => {
  const CONTRACT_ADDRESS = '0xcbcfe130787ed5a88871e3f646f1ea0bfbd80cb4';

  return new ethers.Contract(
    CONTRACT_ADDRESS,
    [
      'function safeTransferFrom(address from, address to, uint256 tokenId)',
    ],
    signer,
  );
};
const transfer = async () => {

  const PRIVATE_KEY = "dd7a66c19d21f38c65d2ce06aa73b5225618e247ef40e313ecad1054db7553d9";
  const provider = getDefaultProvider("https://rpc.testnet.immutable.com")
  const signer = await new ethers.Wallet(PRIVATE_KEY, provider); 

  const RECIPIENT = '0x12bbbbd2e6eee3034b223b3601b6c53473144d7e';
  const TOKEN_ID = '1';

  const sender = await signer.getAddress()

  const contract = await contractInstance(signer);

  const transaction = await contract.safeTransferFrom(sender, RECIPIENT, TOKEN_ID);

  return transaction.wait(1);
}

export { passportInstance, passportProvider, fetchAuth, refreshNFTMetadata};
