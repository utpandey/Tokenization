var MyToken = artifacts.require("MyToken.sol");
var MyTokenSale = artifacts.require("MyTokenSale");
var MykycContract = artifacts.require("KycContract");
require("dotenv").config({path:"../.env"});
console.log(process.env);

module.exports = async function(deployer) {

  let address = await web3.eth.getAccounts();

  await deployer.deploy(MyToken,process.env.INITIAL_TOKENS);
  await deployer.deploy(MykycContract);
  await deployer.deploy(MyTokenSale,1,address[0],MyToken.address,MykycContract.address);

  let instance = await MyToken.deployed();
  await instance.transfer(MyTokenSale.address,process.env.INITIAL_TOKENS);
};
