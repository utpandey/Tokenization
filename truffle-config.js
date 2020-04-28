const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config({path:"./.env"});
const AccountIndex = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      port: 7545,
      host: "127.0.0.1",
      network_id: "*"
    },
    ropsten_infura: {
      provider: function() {
      return new HDWalletProvider(process.env.Mnemonic, "https://ropsten.infura.io/v3/408df80a5e87419698ea2d4f8099f502", AccountIndex)
      },
      network_id: 3
      },
      goerli_infura: {
      provider: function() {
      return new HDWalletProvider(process.env.Mnemonic, "https://goerli.infura.io/v3/408df80a5e87419698ea2d4f8099f502", AccountIndex)
      },
      network_id: 5
      }
      },
  compilers: {
    solc: {
      version: "0.6.0"
    }
  }
};
