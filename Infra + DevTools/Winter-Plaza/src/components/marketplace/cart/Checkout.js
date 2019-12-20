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

  const InputName = ({value, onChange})=>(
    <input value ={value}
    onChange={event => onChange({ value: event.target.value},()=>console.log())} placeholder="Full Name is Required" className="modalsearch"/>
  )

  const InputAddress = ({value, onChange})=>(
    <input value ={value}
    onChange={event => onChange({ value: event.target.value},()=>console.log())} placeholder="Shipping Address is Required" className="modalsearch"/>
  )

  const InputEmail = ({value, onChange})=>(
    <input value ={value}
    onChange={event => onChange({ value: event.target.value},()=>console.log())} placeholder="E-Mail Address is Required" className="modalsearch"/>
  )

  const Select = ({value, onChange})=>(
    <SelectContainer value ={value}
    onChange={event => onChange({ value: event.target.value},()=>console.log())}>
      <option value="1">Ether</option>
      <option value="2">Hydro</option>
      </SelectContainer>      
  )

export default class Checkout extends Component {

    _isMounted = false;
    abortController = new AbortController()

    componentDidMount(){
        this._isMounted = true;
        
        
        
        //this.loadmarket();
  
       }
       

      

      
    


    constructor(props){
        super(props)
        this.state = {
            
          
        
            
        }
       this.clear = this.clear.bind(this);
      }


      clear(e){
        const val = e.target.value;
        this.props.context.handlePaymentMethod(val)
      }

      

        render() {

        const{loading} = this.state
        
        
        return (

                <ProductConsumer>
                {(value)=>{
                const {closeModal2} = value;
                const {img, title, price} = value.modalProduct;
                const{cartSubTotal,ShippingFee,cartTotal,clearCart} = value;
                const {modalOpen2,handleSubmit, 

                paymentMethod,setpaymentMethod,
                Full_Name,set_Full_Name,
                customer_email_Address,set_customer_email,
                Client_Address,set_Client_Address,
               

                marketcap,pay} = value;
        
                
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
                <Select value={paymentMethod} onChange={setpaymentMethod}>
                <option text-align="center"value="1">Ether</option>
                <option value="2">Hydro</option>
                </Select>           
                </Col>
                <Col md={3}className="gethydro"></Col>
                </Row>

                <Row className="mt-4"><Col md={3}className="gethydro"></Col>
                <Col md={6}><InputName type="text" value={Full_Name} 
                onChange={set_Full_Name} 
                placeholder="Full Name" className="modalsearch" /></Col>
                <Col md={3}></Col></Row>
               
                
                <Row className="mt-2"><Col md={3}className="gethydro"></Col>
                <Col md={6}><InputAddress type="text" value={Client_Address} 
                onChange={set_Client_Address} 
                placeholder="Your Shipping Address" className="modalsearch"/></Col>
                <Col md={3}></Col></Row>

                <Row className="mt-2"><Col md={3}className="gethydro"></Col>
                <Col md={6}><InputEmail type="text" value={customer_email_Address} 
                onChange={set_customer_email} 
                placeholder="E-Mail Address" className="modalsearch"/></Col>
                <Col md={3}></Col></Row>
                 
                <Row className="mt-4">
                <Col md={3}className="gethydro"></Col>
                <Col md={6}><input type="submit" value="Transact" className="modalsubmit" onClick={()=>{value.handleSubmit();}}/></Col>
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
                <Row><Col className="metamaskrequired"><h6 >{!this.props.ethereum ? '1 Hyrdro =' : '1 Ether =' } $ {this.props.marketcap}</h6></Col></Row>
                <Row><Col className="cart_subtotal"><h6>Cart Total: $ {numeral(this.props.total).format('0,0.00')} </h6></Col></Row>
                
                <Row><Col className="cart_subtotal"><h6>{!this.props.ethereum ? 'Pay with Hydro: ': 'Pay with Ether: '} 
                {numeral(this.props.pay).format('0,0.0000')} {!this.props.ethereum ? 'Hydro ': 'Ether '}</h6></Col></Row>
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