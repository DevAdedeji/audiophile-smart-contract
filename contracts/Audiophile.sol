// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./PriceConverter.sol";

error Withdraw_NotSuccessful();

contract Audiophile {
    using PriceConverter for uint256;

    // Products and its buyers
    mapping(uint256 => address[]) private productBoughtBy;
    AggregatorV3Interface private s_priceFeed;

    constructor(address priceFeedAddress) {
        s_priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    // Fund function
    function fund(uint256 productId) public payable {
        productBoughtBy[productId].push(msg.sender);
    }

    // A function to send eth to an address
    function sendTo(uint256 amount, address receiver) public payable {
        (bool callSucess, ) = payable(receiver).call{value: amount}("");
        if (!callSucess) {
            revert Withdraw_NotSuccessful();
        }
    }

    function getProductBuyers(
        uint256 productId
    ) public view returns (address[] memory) {
        return productBoughtBy[productId];
    }

    function getPriceFeed() public view returns (AggregatorV3Interface) {
        return s_priceFeed;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance / 1e18;
    }
}
