const Token = artifacts.require("MyToken");
const TokenSale = artifacts.require("MyTokenSale");
const chai = require("./setup.js");
const BN = web3.utils.BN;
const KycContract = artifacts.require("KycContract");

const expect = chai.expect;

require("dotenv").config({path: "../.env"});

contract("TokenSale Test", async function(accounts) {
  
  const [deployerAccount,recipient, anotherAccount] = accounts;

  it("should not have any token in my deployerAccount", async() => {
      let instance = await Token.deployed();
     return expect(instance.balanceOf.call(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));  
    
    });

it("all tokens should be in the TokenSale Smart Contract by default", async() => {
    let instance = await Token.deployed();
    let balanceOfTokenSaleContract = await instance.balanceOf(TokenSale.address);
    let totalSupply = await instance.totalSupply();
    expect(balanceOfTokenSaleContract).to.be.a.bignumber.equal(totalSupply);

})

it("should be possible to buy tokens",async () => {
    let tokenInstance = await Token.deployed();
    let tokenSaleInstance = await TokenSale.deployed();
    let balanceBefore = await tokenInstance.balanceOf(deployerAccount);
    let KycInstance = await KycContract.deployed();
    await KycInstance.setKycCompleted(deployerAccount,{from: deployerAccount});
    expect(tokenSaleInstance.sendTransaction({from: deployerAccount,value: web3.utils.toWei("1","wei")})).to.be.fulfilled;
    balanceBefore = balanceBefore.add(new BN(1));
    return expect(tokenInstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceBefore);
})

});