const { ethers, getNamedAccounts, deployments, network } = require("hardhat");
const { assert, expect } = require("chai")
const { developmentChains } = require("../../helper-hardhat-config")


developmentChains.includes(network.name) 
    ? 
describe.skip   
    :
describe("Test chainfund contract", ()=>{
    console.log("Staging test");

    let audiophileContract, contractAddress, contractDeployer, productId, startingContractBalance, endingContractBalance, amount
    productId = 1
    // beforeEach(async()=>{
    //     const { deployer } = await getNamedAccounts();
    //     contractDeployer = deployer
    //     audiophileContract = await ethers.getContract("Audiophile", deployer);
    //     contractAddress = await audiophileContract.getAddress()
    //     startingContractBalance = await ethers.provider.getBalance(contractAddress);
    //     amount = ethers.parseEther("0.001");
    //     await audiophileContract.fund(productId, {value: amount})
    //     endingContractBalance = await ethers.provider.getBalance(contractAddress);
    // })

    // describe("Test funding", ()=>{
    //     it("Successfully funded", async()=>{    
    //         endingContractBalance = ethers.formatEther(endingContractBalance)
    //         startingContractBalance = ethers.formatEther(startingContractBalance)
    //         amount = ethers.formatEther(amount)
    //         assert.equal(Number(endingContractBalance), Number(startingContractBalance))
    //     })
    //     it("Buyer is stored", async()=>{
    //         const buyers = await audiophileContract.getProductBuyers(productId)
    //         expect(buyers).to.include(contractDeployer)
    //     })
    // })

    // describe("Test sendto", ()=>{
    //     it("Successfully send eth to address", async()=>{
    //         let amount = await audiophileContract.getBalance()
    //         const account = "0x598f7b99383B42c4e5888953066fB21706A207D9"
    //         let startingAccountBalance = await ethers.provider.getBalance(account);
    //         startingAccountBalance = ethers.formatEther(startingAccountBalance)
    //         const txResponse = await audiophileContract.sendTo(amount, account)
    //         await txResponse.wait()
    //         let endingAccountBalance = await ethers.provider.getBalance(account);
    //         endingAccountBalance = ethers.formatEther(endingAccountBalance)
    //         amount = ethers.formatEther(amount)
    //         assert.equal(Number(endingAccountBalance), Number(startingAccountBalance) + Number(amount))
    //     })
    // })

}) 
