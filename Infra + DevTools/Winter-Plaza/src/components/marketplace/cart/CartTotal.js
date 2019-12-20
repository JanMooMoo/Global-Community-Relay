import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {ProductConsumer} from '../Context';
import Checkout from './Checkout';




export default function CartTotal({value,history}) {

    
    const{cartSubTotal,ShippingFee,cartTotal,clearCart,modalOpen2} = value;



    
        return (
        <React.Fragment>
        <div className = "container mt-5">
        <div className = "row">

        <div className="metamask col-sm-10 col-lg-4 col-md-4 align-items-center mt-2"><a href="https://metamask.io/" target="blank"><img src={require('../../../Images/Metamask.png')} 
        alt="snow" height={50} width={67} className="metamasklogo mt-3 mb-2"/></a><p className="grass2">Please Make Sure You Have Metamask Installed Before You Proceed To Checkout</p></div>
        
        <div className = "col-lg-4 col-md-4 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">

        <Link to="/">
        <button className="clear_button text-uppercase mr-2" type="button">
        Back To Store
        </button>    
        </Link>

        <Link to="/">
        <button className="clear_button text-uppercase" type="button"
         onClick={()=>clearCart()}>
        clear cart
        </button>    
        </Link>

        <h5>
        <span className="cart_subtotal">subtotal : </span>
        <strong className="cart_subtotal2"> $ {cartSubTotal}</strong>
        </h5>

        <h5>
        <span className="cart_subtotal">Shipping Fee : </span>
        <strong className="cart_subtotal2"> $ {ShippingFee}</strong>
        </h5>

        <h5>
        <span className="cart_subtotal">Total : </span>
        <strong className="cart_subtotal2"> $ {cartTotal}</strong>
        </h5>
        <ProductConsumer>
        {(value) => ( 
        <button className="clear_button text-uppercase" type="button"
         onClick={()=>{
            value.openModal2(cartTotal)}}>
        Check-Out
        </button>
        
      
        )}
        
        
        </ProductConsumer>
        
        {/*modalOpen2 &&<Checkout
total={cartTotal}/>  */}

        </div>
        </div>
        
        </div>
        </React.Fragment>
        );
    }


