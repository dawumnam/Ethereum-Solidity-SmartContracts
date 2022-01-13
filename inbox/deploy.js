// deploy code will go here
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  `sauce afford between wool awake please gown retreat idle tongue hard bright`,
  "https://rinkeby.infura.io/v3/4361b168992b4cd692c5a70114367e64"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  const inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["DOOJI!!"],
    })
    .send({ from: accounts[0], gas: "1000000" }); // gasLimit for this transaction
  console.log(inbox.options.address);
};
deploy();
