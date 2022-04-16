import web3

from config import Config
from web3 import Web3



web3 = Web3(web3.HTTPProvider(Config.node_url))


contract_instance = web3.eth.contract(address =Config.contract_address,abi = Config.abi )

print(  contract_instance.functions.isActive(Config.wallet).call()  )