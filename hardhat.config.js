require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-etherscan");
// require("dotenv").config();
require("solidity-coverage");
require("hardhat-deploy");

const COINMARKETCAP_API_KEY =
  process.env.COINMARKETCAP_API_KEY || "8e08f32a-a0e9-4ffd-9b51-1618e1da0ece";
const GOERLI_RPC_URL =
  process.env.GOERLI_RPC_URL ||
  "https://eth-goerli.g.alchemy.com/v2/_Zyeb8X7StRiZq5nLX_DbE1BQAwoPp5u";
const PRIVATE_KEY =
  process.env.PRIVATE_KEY ||
  "de1658dbcd02ee1072c2cacf1673b6729accf6be63845aa04d51aae9daacc231";
const ETHERSCAN_API_KEY =
  process.env.ETHERSCAN_API_KEY || "P9KPP46MZI62RF3GFVDU7TPZKUCRYX6AIH";

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      // gasPrice: 130000000000,
    },
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
      blockConfirmations: 6,
    },
  },
  solidity: {
    compilers: [{ version: "0.8.8" }, { version: "0.6.6" }],
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
    // customChains: [], // uncomment this line if you are getting a TypeError: customChains is not iterable
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: "ETH",
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
    user: {
      default: 1,
    },
  },
  mocha: {
    timeout: 500000,
  },
};
