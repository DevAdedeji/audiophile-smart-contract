const { ethers, getNamedAccounts, deployments, network } = require("hardhat");
const { assert, expect } = require("chai")
const { developmentChains } = require("../../helper-hardhat-config")


!developmentChains.includes(network.name) 
    ? 
describe.skip   
    :
describe("Test chainfund contract", ()=>{
    console.log("Unit test");

    let audiophileContract, contractAddress, contractDeployer, productId, startingContractBalance, endingContractBalance, amount
    productId = 1
    beforeEach(async()=>{
        const { deployer } = await getNamedAccounts();
        contractDeployer = deployer
        await deployments.fixture(["all"])
        audiophileContract = await ethers.getContract("Audiophile", deployer);
        contractAddress = await audiophileContract.getAddress()
        startingContractBalance = await ethers.provider.getBalance(contractAddress);
        amount = ethers.parseEther("1");
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

    describe("Test sendto", ()=>{
        it("Successfully send eth to address", async()=>{
            let amount = ethers.parseEther("0.5")
            const accounts = await ethers.getSigners();
            const account = accounts[2]
            let startingAccountBalance = await ethers.provider.getBalance(account);
            startingAccountBalance = ethers.formatEther(startingAccountBalance)
            const txResponse = await audiophileContract.sendTo(amount, account)
            await txResponse.wait()
            let endingAccountBalance = await ethers.provider.getBalance(account);
            endingAccountBalance = ethers.formatEther(endingAccountBalance)
            amount = ethers.formatEther(amount)
            assert.equal(Number(endingAccountBalance), Number(startingAccountBalance) + Number(amount))
        })
    })

}) 
