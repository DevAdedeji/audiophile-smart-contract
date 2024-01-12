const { getNamedAccounts, ethers } = require("hardhat")

async function main(){
    const {  deployer } = await getNamedAccounts()
    let audiophileContract = await ethers.getContract("Audiophile", deployer);
    let contractAddress = await audiophileContract.getAddress()
    let amount = await ethers.provider.getBalance(contractAddress);
    const txResponse = await audiophileContract.sendTo(amount, deployer)
    await txResponse.wait(1)
    console.log("withdrawn")
} 

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})