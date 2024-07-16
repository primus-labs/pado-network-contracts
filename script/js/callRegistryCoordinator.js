const { ethers, upgrades } = require("hardhat");
const {registryCoordinatorAbi} = require("./abi/registryCoordinatorAbi");

// Connect to the Ethereum network
const provider = new ethers.JsonRpcProvider(`https://rpc-holesky.rockx.com`);

// Replace with your own private key (ensure this is kept secret in real applications)
const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);

// Replace with the address of your smart contract
const contractAddress = process.env.REGISTRY_COORDINATOR_ADDRESS;
if(!contractAddress){
    throw new Error('REGISTRY_COORDINATOR_ADDRESS is empty!')
}

// Create a contract instance
const contract = new ethers.Contract(contractAddress, registryCoordinatorAbi, wallet);

async function call() {
    try {
        const caller = await wallet.getAddress()
        console.log(`caller is:${caller}`)
        const owner = await contract.owner()
        console.log(`owner is: ${owner}`);
    } catch (error) {
        console.error('Error sending transaction:', error);
    }
}

// call command
// npx hardhat run --network holesky script/js/callRegistryCoordinator.js
call();