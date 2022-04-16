from flask import Flask,render_template

class Config:
    abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_adrr",
				"type": "address"
			}
		],
		"name": "addAdress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_adrr",
				"type": "address"
			}
		],
		"name": "isActive",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "subs",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "expiration",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
    node_url = "https://rinkeby.infura.io/v3/2341e0371fbc4f008679f0e890a36044"
    contract_address ="0x61C9E6fc6A3FAF02Af380badFdd8f76320ef5D87"
    wallet = "0xce479Ff6fDdC5E162861375E0A230357c101F22e"


app = Flask("__name__")