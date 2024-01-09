const { developmentChains, networkConfig } = require("../helper-hardhat-config")
const { network } = require("hardhat")
const { verify } = require("../utils/verify")
require("dotenv").config()


module.exports = async({deployments, getNamedAccounts})=>{
    const { log, deploy } = deployments

    const { deployer } = await getNamedAccounts()
    let chainId = network.config.chainId
    let args = [];
    let priceFeedAddress;
    
    if(developmentChains.includes(network.name)){
        let MockAggregator = await deployments.get("MockV3Aggregator")
        priceFeedAddress = MockAggregator.address

    } else {
        priceFeedAddress = networkConfig[chainId]["ethUSDPriceFeed"]
    }

    args = [priceFeedAddress]

    const Audiophile = await deploy("Audiophile", {
        from: deployer,
        args: args, //
        log: true,
        waitConfirmations: network.config.blockConfirmations
    })

    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY){
        await verify(Audiophile.address, args)
    }

    log("______________________________________________")

}

module.exports.tags = ["all"]