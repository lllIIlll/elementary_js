#! Elementary JavaScript - Block Chain

const CryptoJS = require("crypto-js");
class Block {
	static calculateBlockHash = (index, previousHash, timestamp, data) =>
		CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

	static validateStructure = (aBlock) => typeof aBlock.index === "number";

	index;
	hash;
	previousHash;
	data;
	timestamp;

	constructor(index, hash, previousHash, data, timestamp) {
		this.index = index;
		this.hash = hash;
		this.previousHash = previousHash;
		this.data = data;
		this.timestamp = timestamp;
	}
}

const genesisBlock = new Block(0, "20202020202", "", "Hello", 123412341234);
let blockchain = [genesisBlock];

const getBlockchain = () => blockchain;
const getLatesBlock = () => blockchain[blockchain.length - 1];
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
	const previousBlock = getLatesBlock();
	const newIndex = previousBlock.index + 1;
	const newTimeStamp = getNewTimeStamp();
	const newHash = Block.calculateBlockHash(
		newIndex,
		previousBlock.hash,
		newTimeStamp,
		data
	);
	const newBlock = new Block(
		newIndex,
		newHash,
		previousBlock.hash,
		data,
		newTimeStamp
	);
	addBlock(newBlock);
	return newBlock;
};

const getHashForBlock = (aBlock) =>
	Block.calculateBlockHash(
		aBlock.index,
		aBlock.previousHash,
		aBlock.timestamp,
		aBlock.data
	);

const isBlockValid = (candidateBlock, previousBlock) => {
	if (!Block.validateStructure(candidateBlock)) {
		return false;
	} else if (previousBlock.index + 1 !== candidateBlock.index) {
		return false;
	} else if (previousBlock.hash !== candidateBlock.previousHash) {
		return false;
	} else if (getHashForBlock(candidateBlock) !== candidateBlock.hash) {
		return false;
	} else {
		return true;
	}
};

const addBlock = (candidateBlock) => {
	if (isBlockValid(candidateBlock, getLatesBlock())) {
		getBlockchain().push(candidateBlock);
	}
};

createNewBlock("하이하이");
createNewBlock("방가워요");
createNewBlock("안녕히계세요");

console.log(getBlockchain());
