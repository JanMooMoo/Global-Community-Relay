import React, { Component, useContext } from 'react';
import {Hydro_Testnet_Token_ABI, Hydro_Testnet_Token_Address} from '../../blockchain-data/hydrocontract_testnet';
import { RotateSpinner } from "react-spinners-kit";
import {Modal, Row, Col,Container} from 'react-bootstrap';
import Center from 'react-center';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import { ImpulseSpinner } from "react-spinners-kit";
import {ProductConsumer} from '../Context';
import  '../market-modal.css';
import styled from "styled-components";
import Web3 from 'web3';
import UIfx from 'uifx'
import cogoToast from 'cogo-toast';
import toastSound from '../../Hydro_Ethereum_Explorer/toastSound.mp3.mp3'
import toasterrorSound from '../../Hydro_Ethereum_Explorer/toasterrorSound.mp3'
import toastsuccessSound from '../../Hydro_Ethereum_Explorer/toastsuccessSound.mp3'

let txhash='';
let txreceipt='';
let txconfirmed='';
let txerror='';

let numeral = require('numeral');

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

  const faucet_success_notification = new UIfx(
    toastsuccessSound,
    {
      volume: 0.4, // number between 0.0 ~ 1.0
      throttleMs: 100
    }
  )

export default class Checkout extends Component {

    _isMounted = false;
    abortController = new AbortController()

    componentDidMount(){
        this._isMounted = true;
        this.loadmarket();
        
        
        //this.loadmarket();
  
       }
       

       async loadmarket(){
         if(this.state.ethereum === true){
          fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
          .then(res => res.json())
          .then((data) => {
            if (this._isMounted){
            this.setState({ marketcap: data.ethereum })
            this.setState({pay:this.props.total/this.state.marketcap.usd},()=>console.log("check", this.state.pay))}
            
            
          })
          .catch(console.log)

         }

        else{
       
        fetch('https://api.coingecko.com/api/v3/simple/price?ids=Hydro&vs_currencies=usd&include_market_cap=true&include_24hr_change=ture&include_last_updated_at=ture')
              .then(res => res.json())
              .then((data) => {
                if (this._isMounted){
                this.setState({ marketcap: data.hydro })
                this.setState({pay:this.props.total/this.state.marketcap.usd},()=>console.log("check", this.state.pay))}
                
                
              })
              .catch(console.log)
      }
    }

      async buyMerchandise(){

        let ethereum= window.ethereum;
        let web3=window.web3;
         
        if(typeof ethereum !=='undefined'){
                 
        await ethereum.enable();
        web3 = new Web3(ethereum);}
          
        else if (typeof web3 !== 'undefined'){     
        window.web3 = new Web3(web3.currentProvider);}
              
        else{
        window.web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/72e114745bbf4822b987489c119f858b'));}
  
        window.ethereum.on('accountsChanged', function (accounts) {
        window.location.reload();})
          
        window.ethereum.on('networkChanged', function (netId) {
        window.location.reload();})
          
        const accounts = await web3.eth.getAccounts();
        if (this._isMounted){
        this.setState({account: accounts[0]}); }
    
        const base = '0x1cAc85F2aA2F4C646c2dD34e2c245BA9B4f46737'
        const snowSolidity =  new web3.eth.Contract(Hydro_Testnet_Token_ABI, Hydro_Testnet_Token_Address);
    
        if (this._isMounted){
        this.setState({snowSolidity:snowSolidity});}
  
        if (this._isMounted){ this.setState({message:"Waiting For Your Confirmation..."});}
  
        if(this.state.ethereum == true){
        // await this.state.snowSolidity.methods.transfer(base, web3.utils.toWei(this.state.pay.toString())).send({ from: this.state.account,  gas: 400000})
        await web3.eth.sendTransaction({ from: this.state.account, to:base, value:web3.utils.toWei(this.state.pay.toString()), gas: 400000})
        .on('receipt', function(receipt){
        }) 

        .on('transactionHash', (hash)=>{
        if(hash !== null){
        txhash = hash
        if (this._isMounted){this.setState({message:<a className="white" href={`https://rinkeby.etherscan.io/tx/${txhash}`} target="_blank" >Your Transaction Hash is {txhash}</a>},()=>this.toastinfo()
            )}
          }
        })

        .on('confirmation',(confirmationNumber, receipt)=>{
          if(confirmationNumber !== null){
           txreceipt = receipt.blockNumber
           txconfirmed = confirmationNumber
           if (this._isMounted && txconfirmed == 1){this.setState({message:<a className="white"  href={`https://rinkeby.etherscan.io/tx/${txhash}`} target="_blank" >Your Has Been Confirmed On Block: {txreceipt}</a>},()=> this.handleSubmitMail() 
            )}
           }       
        })
   
        .on('error',(error)=>{
        if(error !== null){
        txerror = error
        if (this._isMounted){this.setState({message:"Your Transaction Has Failed "},()=> this.toastError()
              )}
            } 
          })
        } 

        else{
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

        .on('confirmation',(confirmationNumber, receipt)=>{
          if(confirmationNumber !== null){
           txreceipt = receipt.blockNumber
           txconfirmed = confirmationNumber
           if (this._isMounted && txconfirmed == 1){this.setState({message:<a className="white"  href={`https://rinkeby.etherscan.io/tx/${txhash}`} target="_blank" >Your Has Been Confirmed On Block: {txreceipt}</a>},()=> this.toast2() 
            )}
           }       
        })

        .on('error',(error)=>{
        if(error !== null){
        txerror = error
        if (this._isMounted){this.setState({message:"Your Transaction Has Failed "},()=> this.toastError()
              )}
             } 
           })
         }
        }
        

      handleSubmit(event) {
        this.buyMerchandise();
        //this.loadMarketplace();
       
      }

      handleChange(event) {
        this.setState({Client_Address: event.target.value},()=>
        console.log())
        
      }

      handleChangeName(event) {
        this.setState({Full_Name: event.target.value},()=>
        console.log())
        
      }

      handleChangeMail(event) {
        this.setState({customer_email_Address: event.target.value},()=>
        console.log())
        
      }
    


    constructor(props){
        super(props)
        this.state = {
            
            snowSolidity:'',
            message:'',
            account:'',
            loading:false,
            marketcap:[],
            blocks:'',
            pay:'',
            Client_Address:'',
            Full_Name:'',
            ethereum:true,
            paymentMethod:'',
            email: 'myhydrofrost@gmail.com',
            customer_email_Address:'',
        
            
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeMail = this.handleChangeMail.bind(this);
        this.handlePaymentMethod = this.handlePaymentMethod.bind(this);
        this.handleSubmitMail = this.handleSubmitMail.bind(this);
      }


      handlePaymentMethod= (event) => {
        
        this.setState({paymentMethod: event.target.value},()=>
        {
            if(this.state.paymentMethod == 1){
                this.setState({ethereum:true},()=>this.loadmarket(),()=>console.log("check",this.state.ethereum))}
            else {
              this.setState({ethereum:false},()=>this.loadmarket(),()=>console.log("check",this.state.ethereum))}
            })
    } 

        toastinfo = () =>{ const{hide}= cogoToast.warn(<a className="white" href={`https://rinkeby.etherscan.io/tx/${txhash}`} target="_blank" >Your Transaction Hash is: {txhash}</a>, { onClick:()=>{
        hide();},
        position: 'bottom-left', 
        heading: 'Hydro Testnet Request' ,
        hideAfter:0,
        });
        faucet_notification.play()
        };

        toast2 = () =>{ const{hide}=cogoToast.warn(<a className="white" href={`https://rinkeby.etherscan.io/block/${txreceipt}`} target="_blank" >Your Payment has been Confirmed at Block: {txreceipt}</a>, { onClick:()=>{
          hide();},
        position: 'bottom-left', 
        heading: 'Payment Successful',
        hideAfter:0,
        });
        faucet_success_notification.play()
        };
      
        
        toastMailSuccess = () =>{ const{hide}= cogoToast.warn(<a className="white" >We have sent you a mail.</a>, { onClick:()=>{
        hide();},
        position: 'bottom-left', 
        heading: 'Hydro Testnet Mail Request' ,
        hideAfter:0,
        });
        faucet_notification.play()
        
        };
      
        toastError = () =>{ const{hide}= cogoToast.warn(<a className="white" >We Encountered an Error, Please Try Again.</a>, { onClick:()=>{
        hide();},
        position: 'bottom-left', 
        heading: 'Hydro Testnet Request' ,
        hideAfter:0,
        });
        faucet_Error_notification.play()
        };



        handleSubmitMail(event) {
        const templateId = 'template_sIzRwPbw';
        const EmailMessage = {
        "message": "Thank you for shopping on Winter Plaza,Your Order has been recieved and your payment of "+" "+"$"+this.props.total+" "  +"has been confirmed on block "+ " " +txreceipt+" "+"You can find the details of your transaction here https://rinkeby.etherscan.io/tx/"+txhash+".",
        "email": this.state.email, 
        "user":this.state.customer_email_Address
          
         }
        this.setState({loading:true})
        this.sendFeedback(templateId, EmailMessage)
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

        render() {

        const{loading} = this.state
        
        
        return (

                <ProductConsumer>
                {(value)=>{
                const {modalOpen2,closeModal2} = value;
                const {img, title, price} = value.modalProduct;
                const{cartSubTotal,ShippingFee,cartTotal,clearCart} = value;
                
                if(!modalOpen2){
                return null;
                }
        
                else{
        
                return(
                
                  <Modal
                  {...this.props}
                  size="lg"
                  height="200px"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  >
                  
                <Modal.Header className="modalpie">
                <Modal.Title id="contained-modal-title-vcenter">
                <Center><div className="banana3">Checkout</div></Center>
                </Modal.Title><button className="close_modal" onClick={()=>{value.closeModal2();}}>x</button>
                </Modal.Header> 
           
                <Modal.Body> 
                

                <Row className="mt-3">
                <Col md={3}className="gethydro"></Col>
                <Col md={6} className="gethydro"><img src={require('../../../Images/colored-cart.png')} 
                alt="snow" height={120} width={110} className="navbar-brand"/></Col>
                <Col md={3}className="gethydro"></Col>
                </Row>
                <Row className="mt-3"><Col className="gethydro"><h6 className="modal_header">Choose Your Payment Method</h6></Col></Row> 

                <Row className="show-grid mt-2">
                <Col md={3}className="gethydro"></Col>
                <Col md={6}>
                <SelectContainer value1={this.state.value} onChange={this.handlePaymentMethod}>
                <option text-align="center"value="1">Ether</option>
                <option value="2">Hydro</option>
                </SelectContainer>           
                </Col>
                <Col md={3}className="gethydro"></Col>
                </Row>

                <Row className="mt-4"><Col md={3}className="gethydro"></Col>
                <Col md={6}><input type="text" value={this.state.Full_Name} 
                onChange={this.handleChangeName} 
                placeholder="Full Name" className="modalsearch" /></Col>
                <Col md={3}></Col></Row>

                <Row className="mt-2"><Col md={3}className="gethydro"></Col>
                <Col md={6}><input type="text" value={this.state.Client_Address} 
                onChange={this.handleChange} 
                placeholder="Your Shipping Address" className="modalsearch"/></Col>
                <Col md={3}></Col></Row>

                <Row className="mt-2"><Col md={3}className="gethydro"></Col>
                <Col md={6}><input type="text" value={this.state.customer_email_Address} 
                onChange={this.handleChangeMail} 
                placeholder="E-Mail Address" className="modalsearch"/></Col>
                <Col md={3}></Col></Row>

                
                
                
                
                <Row className="mt-4">
                <Col md={3}className="gethydro"></Col>
                <Col md={6}><input type="submit" value="Transact" className="modalsubmit" onClick={() => this.handleSubmit()}/></Col>
                <Col md={3}></Col>
                </Row>

                <Row className="mt-1">
                <Col md={3}className="gethydro"></Col>
                <Col md={6}><input type ="submit" value="Back" className="modalsubmit" onClick={()=>{
                value.closeModal2();}}/></Col>
                <Col md={3}></Col>
                </Row>
                
                <Row className="mt-4 mb-4"><Col md={3} className="gethydro"></Col>
                <Col md={6} className=" division mt-2">
                <Row><Col className="metamaskrequired"><h6>{!this.state.ethereum ? '1 Hyrdro =' : '1 Ether =' } $ {this.state.marketcap.usd}</h6></Col></Row>
                <Row><Col className="cart_subtotal"><h6>Cart Total: $ {numeral(this.props.total).format('0,0.00')} </h6></Col></Row>
                
                <Row><Col className="cart_subtotal"><h6>{!this.state.ethereum ? 'Pay with Hydro: ': 'Pay with Ether: '} 
                {numeral(this.state.pay).format('0,0.0000')} {!this.state.ethereum ? 'Hydro ': 'Ether '}</h6></Col></Row>
                </Col>
                <Col md={3} ></Col></Row>
          
                
              
                
                </Modal.Body>
                      
                
          
                </Modal>
               );
            }
        
                }}
                </ProductConsumer>
                );
            }
        }
        
        const ModalContainer =styled.div``;
 

        const SelectContainer =styled.select`

text-transform:capitalized;

position: relative;
background: rgb(0, 28, 88);
border:0.2rem solid var(--mainDark);
border-bottom: 2px solid black;
border-top: 1px solid rgba(255, 255, 255, 0.651);
border-left: 3px solid black ;
border-right: 1px solid rgb(73, 67, 67) ;
border-radius:10.5rem;
padding:0.2rem 0.5rem;
cursor:pointer;
border-radius:10px;
width:100%;
height:40px;
font-size:1rem;
text-align: center;
border: 2px solid rgb(219, 206, 164);
font-family:"Orbitron",cursive;
letter-spacing: 0.3rem;
color:rgb(226, 188, 62);
-webkit-text-stroke:0.00001px #3433;
    text-shadow:2px 2px 0 black,
                1px 3px 0 #000,
                1px 2px 0 #000,
                1px 2px 0 #000,
                2px 3px 0 #000;

transition:all 0.2s ease-in-out;
&:hover{
    background:  rgb(0, 28, 88); 
    color:rgb(226, 188, 62);
}
&focus{
    outline:none;

}
`