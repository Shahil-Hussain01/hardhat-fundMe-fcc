const { network } = require("hardhat");
const {
  networkConfig,
  developmentChains,
} = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deployer } = await getNamedAccounts();
  const { deploy, log } = deployments;
  const chainId = network.config.chainId;
  console.log(`chainId: ${chainId}`);

  //   const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  let ethUsdPriceFeedAddress;
  if (chainId == 31337) {
    const ethUsdAggregator = await deployments.get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUsdAggregator.address;
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  }

  const args = [ethUsdPriceFeedAddress];
  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: args, // put price feed address
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  if (chainId != "31337" && process.env.ETHERSCAN_API_KEY) {
    console.log("LOL");
    await verify(fundMe.address, args);
  }
  log("-------------------------------------------");
};

module.exports.tags = ["all", "fundme"];
