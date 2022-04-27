import './App.css';
import {useState} from 'react';
import {ethers} from "ethers";
import {abi} from "./abi.js"
function App() {

    const [walletAdress,setWalletAddress] = useState("")
    const contractAdress = "0x6A0162E2E7A2eef9b1926bE6276C744b86af952B"
    const subCost = {value: ethers.utils.parseEther("0.01")}
    async function subEndTime(time){
        const hex = time['_hex'].toString(16);
        const timestamp =  parseInt(hex, 16);
        // var date = new Date(timestamp * 1000);
        // var hours = date.getHours();
        // var minutes = "0" + date.getMinutes();
        // var seconds = "0" + date.getSeconds();
        // return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return  new Date(timestamp * 1000)


    }

    async function callContract(){
        document.querySelector(".user_info").innerHTML = ``


        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAdress,abi,provider.getSigner());
        const user = await contract.getUser();
        const sub = await contract.isActive();
        if (sub){
            const time = await contract.subEnd()
            const date = await subEndTime(time)
            console.log(date)
        }


        if (user){
            console.log(user);

            let div = document.createElement('div');
            div.innerHTML = `username: ${user} <br> active sub : ${sub} <br>`
            document.querySelector(".user_info").append(div)



            if (!sub){
                div = document.createElement('div');
                div.innerHTML = "<button>pay</button><br>"
                document.querySelector(".user_info").append(div)

                var el = document.querySelectorAll('button');
                el[1].addEventListener("click",async ()=>{
                    const clickedPay = await contract.paySub(subCost)
                    const receipt = provider.waitForTransaction(clickedPay.hash, 1, 150000).then(() => {
                        console.log('done')
                        callContract();
                    });
                });

                // document.querySelector(".user_info").append(document.createElement('div').innerHTML = "<button>pay sub</button>")
            } else{

                const time = await contract.subEnd()
                const date = await subEndTime(time)
                div = document.createElement('div');
                div.innerHTML = `sub end time: ${date.toDateString()}<br>`
                document.querySelector(".user_info").append(div)


            }

        } else{
            let div = document.createElement('div');
            div.innerHTML = "Input ur username <br><input> <br> <button>pay</button>"
            document.querySelector(".user_info").append(div)

            var el = document.querySelectorAll('button');
            el[1].addEventListener("click",async ()=>{
                const clickedPay = await contract.createUser(document.querySelector("input").value)
                const receipt = provider.waitForTransaction(clickedPay.hash, 1, 150000).then(() => {
                    console.log('done')
                    callContract();
                });
            });


        }


    }

    async function reqAcc(){
        console.log("slatt")
        if(window.ethereum){
            console.log('detected')
            try{
                const account = await window.ethereum.request({
                    method:"eth_requestAccounts"
                })
                setWalletAddress(account[0]);
                const user = await callContract();
            } catch (error){
                console.log(error)

            }
        }

    }



    return (
    <div className="App">
      <header className="App-header">
        <button
            onClick={reqAcc}
        >Connect wallet</button>
          <h3>
              Wallet address: {walletAdress}
          </h3>
          <div class = "user_info">

          </div>
      </header>
    </div>
  );
}

export default App;
