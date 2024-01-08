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
    beforeEach(async()=>{
        const { deployer } = await getNamedAccounts();
        contractDeployer = deployer
        audiophileContract = await ethers.getContract("Audiophile", deployer);
        contractAddress = await audiophileContract.getAddress()
        startingContractBalance = await ethers.provider.getBalance(contractAddress);
        amount = ethers.parseEther("0.1");
        const txResponse = await audiophileContract.fund(productId, {value: amount})
        await txResponse.wait(1)
        endingContractBalance = await ethers.provider.getBalance(contractAddress);
    })

    describe("Test funding", ()=>{
        it("Successfully funded", async()=>{    
            assert.equal(endingContractBalance, startingContractBalance + amount)
        })
        it("Funder is stored", async()=>{
            const buyers = await audiophileContract.getProductBuyers(productId)
            expect(buyers).to.include(contractDeployer)
        })
    })

}) 
