import React,{Component} from 'react';
import {Container, Row,Col} from 'react-bootstrap';
import Center from 'react-center';
import ReactGA from 'react-ga';
import FlipPage from 'react-flip-page';
import Title from '../Title/Title';
import {RequestNetwork} from '@requestnetwork/request-client.js';
import {Hydro_Testnet_Token_ABI, Hydro_Testnet_Token_Address} from '../blockchain-data/hydrocontract_testnet';
import Web3 from 'web3';
import UIfx from 'uifx'
import cogoToast from 'cogo-toast';
import toastSound from '../Hydro_Ethereum_Explorer/toastSound.mp3.mp3'
import toasterrorSound from '../Hydro_Ethereum_Explorer/toasterrorSound.mp3'

let txhash='';
let txreceipt='';
let txconfirmed='';
let txerror='';

const faucet_notification = new UIfx(
  toastSound,
  {
    volume: 0.4, // number between 0.0 ~ 1.0
    throttleMs: 100
  }
)

const faucet_Error_notification = new UIfx(
  toasterrorSound,
  {
    volume: 0.4, // number between 0.0 ~ 1.0
    throttleMs: 100
  }
)


export default class Market extends Component {

  _isMounted = false;
  abortController = new AbortController()
  

  componentDidMount(){
      this._isMounted = true;
      this.loadmarket();
      //this.loadmarket();

     }


     async loadmarket(){

      fetch('https://api.coingecko.com/api/v3/simple/price?ids=Hydro&vs_currencies=usd&include_market_cap=true&include_24hr_change=ture&include_last_updated_at=ture')
            .then(res => res.json())
            .then((data) => {
              if (this._isMounted){
              this.setState({ marketcap: data.hydro })}
              this.setState({pay:10/this.state.marketcap.usd *2},()=>console.log("check", this.state.pay))
            })
            .catch(console.log)
    }
   
   
    async buyMerchandise(){

      let ethereum= window.ethereum;
           let web3=window.web3;
       
        
            if(typeof ethereum !=='undefined'){
               
            await ethereum.enable();
            web3 = new Web3(ethereum);
           
        }
        
        else if (typeof web3 !== 'undefined'){
            
        window.web3 = new Web3(web3.currentProvider);
            }
            
        else{
        window.web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/72e114745bbf4822b987489c119f858b'));
        }

        window.ethereum.on('accountsChanged', function (accounts) {
          window.location.reload();
        })
        
        window.ethereum.on('networkChanged', function (netId) {
          window.location.reload();
        })

        
  const accounts = await web3.eth.getAccounts();
  if (this._isMounted){
  this.setState({account: accounts[0]}); }
  
  const base = '0x1cAc85F2aA2F4C646c2dD34e2c245BA9B4f46737'
  const snowSolidity =  new web3.eth.Contract(Hydro_Testnet_Token_ABI, Hydro_Testnet_Token_Address);
  
  if (this._isMounted){
  this.setState({snowSolidity:snowSolidity});}

  if (this._isMounted){ this.setState({message:"Waiting For Your Confirmation..."});}

  await this.state.snowSolidity.methods.transfer(base, web3.utils.toWei(this.state.pay.toString())).send({ from: this.state.account,  gas: 400000})
  .on('receipt', function(receipt){
  
  
  }) 
  .on('transactionHash', (hash)=>{
    if(hash !== null){
    txhash = hash
    if (this._isMounted){this.setState({message:<a className="white" href={`https://rinkeby.etherscan.io/tx/${txhash}`} target="_blank" >Your Transaction Hash is {txhash}</a>},()=>this.toastinfo()
    )}
   
   }
})



.on('confirmation', (confirmationNumber,receipt)=>{ 
  console.log("check",confirmationNumber)
  console.log("check",receipt)})
 

.on('error',(error)=>{
  if(error !== null){
    txerror = error
    if (this._isMounted){this.setState({message:"Your Transaction Has Failed "},()=> this.toastError()
      )}
    
      } 
})

    }
    /* async loadMarketplace() { 

      let requestNetwork = new RequestNetwork({
        nodeConnectionConfig: { baseURL: 'http://super-request-node.com' },
      });


      const axios = require('axios')

const API_KEY = 'S3SYFQH-2XN4QT3-M43A8FV-K76975D';
const requestParams = {
	"currency": "BTC",
	"expectedAmount": "10000",
    "payment": {
        "type": "bitcoin-testnet",
        "value": "mgcZRSj6ngfKBUHr2DGBqCfHSSYBDSbjph"
    },
};

const request = await axios.post('https://api.request.network/requests', requestParams, {
    headers: { Authorization: 'S3SYFQH-2XN4QT3-M43A8FV-K76975D' }
})

console.log("Check", request.data);

const paymentNetwork = {
  id: RequestNetwork.Types.PAYMENT_NETWORK_ID.BITCOIN_ADDRESS_BASED,
  parameters: {
     paymentAddress: '1C83GMLVipjVMVaeV6BQkhfECT3TFADsfX',
  }
};
const invoice = await requestNetwork.createRequest({
 requestParams,
 signer: requestParams.payee,
 paymentNetwork
});

      }*/
    


      handleSubmit(event) {
        this.buyMerchandise();
        //this.loadMarketplace();
       
      }


      constructor(props){
        super(props)
        
        this.state = {
            marketcap:[],
            blocks:'',
            pay:'',
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      toastinfo = () =>{ const{hide}= cogoToast.warn(<a className="white" href={`https://rinkeby.etherscan.io/tx/${txhash}`} target="_blank" >Your Request Of 10,000 Testnet Hydro Is On The Way, Please Wait For A Few Moments And Kindly Check Your Wallet.</a>, { onClick:()=>{
        hide();},
        position: 'bottom-left', 
        heading: 'Hydro Testnet Request' ,
        hideAfter:0,
        });
        faucet_notification.play()
        };
      
        toastMailSuccess = () =>{ const{hide}= cogoToast.warn(<a className="white" >Your Mail Request Of 30,000 Has Been Sent. Please Be Patient. It Might Take A While Before We See Your Message.</a>, { onClick:()=>{
        hide();},
        position: 'bottom-left', 
        heading: 'Hydro Testnet Mail Request' ,
        hideAfter:0,
        });
        faucet_notification.play()
        setTimeout((this.props.onHide()),10000)
        };
      
        toastError = () =>{ const{hide}= cogoToast.warn(<a className="white" >We Encountered an Error, Please Try Again.</a>, { onClick:()=>{
        hide();},
        position: 'bottom-left', 
        heading: 'Hydro Testnet Request' ,
        hideAfter:0,
        });
        faucet_Error_notification.play()
        };

  render(){


  return (
       <div>
          <a id="moon"></a>
    
     <Container>
    
         <Row><Col><h1> </h1></Col></Row>
         <Row><Col><h1> </h1></Col></Row>
            <Title name="About The" title="Builders"/>
         <Row><Col><h1> </h1></Col></Row>
         <Row><Col><h1> </h1></Col></Row>
         <Row><Col><button onClick={() => this.handleSubmit()}></button></Col></Row>
         <Row><Col><h1> </h1></Col></Row>
         <Row><Col><h1> </h1></Col></Row>
         <Row><Col><h1> </h1></Col></Row>



<Row><Col><h1> </h1></Col></Row>
<Row><Col className="market"><Center><h6 className="banana">If you find this Application Helpful and Wish to Support our Coffee in the Morning, You can do so by Tipping us on this Address 0x20F857b13D6C546eC77aFE47317EA3c5a75c1c6c ,If you found unpleasant bugs or have a suggestion, You can contact us at MyHydroFrost@gmail.com. Thank you! & Happy BUIDLING! </h6></Center></Col></Row>
<a href= "/Builders#moon" className="accountlink"> <button className="topButton">Top</button></a>
</Container>
   </div>
   
  );
}
}