
import React,{Component} from 'react';
import {Modal, Row, Col,Container} from 'react-bootstrap';
import Center from 'react-center';
import Web3 from 'web3';
import './ModalSubmit.css';
import {Hydro_Testnet_Token_ABI, Hydro_Testnet_Token_Address} from '../blockchain-data/hydrocontract_testnet';
import cogoToast from 'cogo-toast';
import UIfx from 'uifx'
import toastSound from './toastSound.mp3.mp3'
import ReactGA from 'react-ga';
import toasterrorSound from './toasterrorSound.mp3'
import { RotateSpinner } from "react-spinners-kit";


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

export class HydroTestFaucet extends Component{

     _isMounted = false;
    abortController = new AbortController()
    

    componentWillMount(){
        this._isMounted = true;
        this.loadGA();
        //this.toastinfo();
        //this.loadBlockchainData();
       
       }
       
       async loadBlockchainData() { 
           
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
           
  const snowSolidity =  new web3.eth.Contract(Hydro_Testnet_Token_ABI, Hydro_Testnet_Token_Address);
  
  if (this._isMounted){
  this.setState({snowSolidity:snowSolidity});}

  if (this._isMounted){ this.setState({message:"Waiting For Your Confirmation..."});}

  await this.state.snowSolidity.methods.getMoreTokens().send({ from: this.state.account, gas: 400000})
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
   

componentWillUnmount(){
  this.abortController.abort()
  this._isMounted = false;
}

constructor(props){
    super(props)
    this.state = {
        

        value: '',
        summaryModalShow: false,
        redirect:false,   
        message:'',
        isMining:false,
        hide:this.props.onHide,
        receipt:'',
        account:'',
        snowSolidity:'',
        HydroRequest: '', 
        email: 'moonmusic91@gmail.com',
        email2:'myhydrofrost@gmail.com',
        loading:false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitMail = this.handleSubmitMail.bind(this);
  }

  
  handleSubmit= async(event)=> {
    this.loadBlockchainData()
    this.GA_RequestHydro()
   
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

  handleChange(event) {
    this.setState({HydroRequest: event.target.value},()=>
    console.log())
    
  }

  handleSubmitMail(event) {
    const templateId = 'template_sIzRwPbw';
    const EmailMessage = {
      "message": "Requesting 30,000 Hydro from" + " " + this.state.HydroRequest,
      "email": this.state.email, 
      "user":this.state.email2
    
   }
  this.setState({loading:true})
  this.sendFeedback(templateId, EmailMessage)
  this.GA_SubmitMail()
  }


  sendFeedback (templateId,EmailMessage) {
    window.emailjs.send(
      'gmail', templateId,EmailMessage
      ).then(res => {this.setState({loading:false},()=>
        this.toastMailSuccess())
      })
      // Handle errors here however you like, or use a React error boundary
      .catch(err => this.setState({loading:false},()=>this.toastError()))
     
    }

  loadGA() {
     ReactGA.initialize('UA-151322976-1');
  }
  
  GA_SubmitMail(){
    ReactGA.event({
    category: "Faucet Submit Request Via Mail",
    action: "Submit Via Mail"
    });
  }
  
  GA_RequestHydro(){
    ReactGA.event({
    category: "Faucet Submit Request Via Metamask",
    action: "Submit Via Metamask"
    });
  }

    render(){
      //template_sIzRwPbw
        const{loading} = this.state
        /*const redirect = this.state.redirect;
        if(redirect === true){console.log('redirecting')
          return <Redirect to="/categories" />
          
        }*/

    return( 
      
      <Modal
        {...this.props}
        size="lg"
        height="200px"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        
      <Modal.Header className="modalpie" closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
      <Center><div className="banana3">Request Hydro</div></Center>
      </Modal.Title>
      </Modal.Header> 
 
      <Modal.Body> 
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col md={12} className="gethydro"><img src={require('../../Images/Hydrosmall.png')} alt="snow" height={120} width={110} className="navbar-brand"/><h6> </h6><h6 className="grass2">Request 10,000 Rinkeby Testnet Hydro for Development and Testing</h6></Col>
      </Row>
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col className="gethydro"><h6 className="metamaskrequired">Requires Metamask</h6></Col></Row> 
      
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col md={2}className="gethydro"></Col><Col ms={2}><input type="submit" value="Request Hydro" className="modalsubmit" onClick={() => this.handleSubmit()}/></Col><Col md={4}><input type ="submit" value="Close" className="modalsubmit" onClick={this.props.onHide}/></Col><Col md={2}></Col></Row>
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col><h1> </h1></Col></Row>

      <form className="test-mailing">
      <Row><Col md={12} className="gethydro"><img className ="image"src={require('../../Images/emaillogo.png')} alt="snow" height={140} width={130} className="navbar-brand"/><h6> </h6><h6 className="grass2">Or request 30,000 Tesnet Hydro</h6><h6 className="grass2">Through Mail.</h6></Col></Row>
    	<Row><Col md={12} className="gethydro"><h6 className="metamaskrequired">No Metamask Required But Could Take A While Due To Dev Availability</h6></Col></Row>
      <Row><Col><h4>
        <Center><RotateSpinner
                size={40}
                color={!this.state.mainnet? "rgb(226, 188, 62)":"rgb(241, 241, 241)"}
                loading={loading}/>
        </Center>  
      </h4></Col></Row>
      <Row><Col md={3}className="gethydro"></Col><Col ms={2}><input type="text" value={this.state.HydroRequest} onChange={this.handleChange} placeholder="Your Eth Wallet Address" className="modalsearch" /></Col><Col md={3}></Col></Row>
      <Row ><Col md={3}className="gethydro"></Col><Col ms={2}><input type="button" value="Submit" className="modalsubmit" onClick={this.handleSubmitMail} /></Col><Col md={3}></Col></Row>
  	  </form>
     
      

      
      </Modal.Body>
            
      

      </Modal>
      )
    }

}




