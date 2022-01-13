// contract test code will go here
const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");
let accounts, inbox;
const INITIAL_STRING = "Hi there";
beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  // Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: [INITIAL_STRING],
    })
    .send({ from: accounts[0], gas: "1000000" }); // gasLimit for this transaction
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });
  it("has a default message", async () => {
    const message = await inbox.methods.getMessage().call();
    assert.equal(message, INITIAL_STRING);
  });

  it("updates a message", async () => {
    await inbox.methods
      .setMessage(`${INITIAL_STRING}s`)
      .send({ from: accounts[0] });
    const message = await inbox.methods.getMessage().call();
    assert.equal(message, `${INITIAL_STRING}s`);
  });
});
