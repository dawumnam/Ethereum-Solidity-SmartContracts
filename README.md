- [Ethereum-Solidity-SmartContracts](#ethereum-solidity-smartcontracts)
  - [What is ethereum network?](#what-is-ethereum-network)
  - [Address & Keys](#address--keys)
  - [Transaction](#transaction)
    - [Properties of transaction object](#properties-of-transaction-object)
  - [Transaction flow of demo](#transaction-flow-of-demo)
  - [Why wait?](#why-wait)
  - [In detail](#in-detail)
  - [BlockChain 101](#blockchain-101)
    - [Hash, Block and Blockchain](#hash-block-and-blockchain)
    - [How blocks are intact](#how-blocks-are-intact)
    - [Distributed BlockChain](#distributed-blockchain)
    - [How to make this blockChain userful? Token!](#how-to-make-this-blockchain-userful-token)
    - [Problem with current Block!](#problem-with-current-block)
    - [Coinbase transaction](#coinbase-transaction)
    - [Applying general ideas to Ethereum](#applying-general-ideas-to-ethereum)
    - [Hash range](#hash-range)
    - [Block Time](#block-time)
    - [Why difficulty target number is adjusted?](#why-difficulty-target-number-is-adjusted)
  - [SmartContracts](#smartcontracts)

# Ethereum-Solidity-SmartContracts

## What is ethereum network?

- Ethereum networks are used to transfer money and store data
- There are many different Ethereum networks(Test, private, and etc)
- Networks are formed by one or more nodes
- Each node is just a machine(Like your laptop) running an ethereum client
- Anyone with machine can run a node via ethereum client
- Each node can contain a full copy of the blockcahin(DB of transactions)
- The blockchain is a db that stores a record of every transaction that's ever taken place

## Address & Keys

- Account Address is like a user id or email address
- public and private key combined works like a password
- keys are used to authorize the sending of funds
- keys stored of hexadecimal numbers
- An account is used across every ethereum network (Doesn't mean you can't create more of them!)

## Transaction

- An account is used across all networks, however tokens the account has is unique to the network
- Transaction is a record that one account attemtpting to send money to another account
- It is created whenever two accounts exchange money
- During the demo, transaction object was created and sent to the ethereum network to be processed

### Properties of transaction object

- nonce : # of times sender has sent a transaction
- to : Address of receiver
- value : Amount of ether to be sent
- startGas/gasLimit : units of gas that this transaction can consume
- v, r, s : These are generated by senders' private key to be used to generate the senders account address
- If you have private key you can generate v, r, and s but not the other way around

## Transaction flow of demo

- Submit form with receiver's address
- server receives the address and create transaction object using web3 library
- the server sends transaction object to the Rinkeby test network
- the server **waits** for transaction to be confirmed
- the server sends success message to the client

## Why wait?

- Because it attempts to replace traditional financial system such as USD EURO and etc..
- which is extremely complicated task

## In detail

- Transaction is sent to a single node in a network
- Assuming that there were two other transactions submitted to the node at the same time we submitted transaction,
- The node creates a **block** that contains list of transactions
- The node runs validation on the block which was the reason why there is some processing time before the transaction is complete
- The validation processing is referred to the **Mining**

## BlockChain 101

### Hash, Block and Blockchain

- **Hash** is like a fingerprint of some data after processed by hash function
- You can get a hash out of data, regardless of its size. But you cannot guess what the data is out of hash
- Block has block number, Nonce, data, and prev and hash
- **Block** is signed when it's first four letters are all zeros 0000kjfljflkwelkfjlwkfe like so
- Block number is a position of block in blockchain
- prev is hash of previous block. Prev of first block is 00000000... all zeros
- **Mining** is a process of finding value of **Nonce** that makes the block signed

### How blocks are intact

- If you alter some arbitary block in the chain by changing its data,
- You are essentially changing it's hash and will make it unsigned
- You need to mine that block to make it singed again by changing its Nonce
- But as the hash of this block is changed, the next block's hash is also altered.
- So next block isn't signed anymore.
- So basically altering a block results in altering all the following blocks which is extremely expensive as you go back in time more and more
- This is how block chain **resists** against mutation

### Distributed BlockChain

- Assuming that there are many numbers of blocks in the block chain
- And many peers have complete copy of this block chain
- We know that altering any block in the chain will eventully change the hash of next blocks
- So by comparing very last hash of block in the chain with other peers' block chain,
- The unaltered block chain easily dominates the altered block chain

### How to make this blockChain userful? Token!

- The data part of block is used as token which contains list of transactions.
- Because of nature of block and blockChain, recored of these transactions are **immutable**.

### Problem with current Block!

- Transcactions in the block only contains who sent how much to whom.
- Which bring a question of "does the sender actually has x amount of money to send?
- What is the balance of a sender?

### Coinbase transaction

- Coinbase transaction is a special transaction where sender is coinbase and receiver is some address
- There is no previous of transaction flow to coinbase
- So by tracking coinbase transaction and transaction between addresses,
- We can now see if certain adress has balance to make the transaction or not.

### Applying general ideas to Ethereum

- If you convert output hash which is hexadecimal number to decimal number, it results in some numbers, in base 10
- In reality, what we are looking instead is this base 10 number, which is converted from hash output.
- More specifically whether to evaluate whether the block is signed or not, we look at the hash in base 10 value and check whether it is lower than some number.
- So mining is a process of finding hash output by changing nonce that is lower than some number in base 10

### Hash range

- The hash output we're dealing with is hexadecimal number that is 64 chars long.
- in decimal this is from 0 to -15 \* 10 ^ 77
- From 0x0 _ 64 to 0x f _ 64

### Block Time

- Modern computers can run a lot of hashes simultaneously, but given the target decinam number we're looking for is relative so small than entier range of our hash output.
- So even though computers are super fast, it takes some amount of time to figure out our target hash and this some amount of time is called **Block Time**
- Ethereum has target block time of **15 seconds**. The variable here is that target number.
- However, this target number fluctuates as determined by network.
- The network mesaures the block time of previous block and set target number of next block accordingly to meet that 15 seconds block time.

### Why difficulty target number is adjusted?

- The computing availability of network is determined by nubmer of nodes online in the network.
- So more nodes mean more calculating power and vice versa.

## SmartContracts
