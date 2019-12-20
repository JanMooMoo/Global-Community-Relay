import React, { Component } from 'react';
import {ProductConsumer} from './Context';
import  './market-modal.css';
import styled from "styled-components";
import {Link} from 'react-router-dom';

export default class MarketModal extends Component {
    render() {
        return (
        <ProductConsumer>
        {(value)=>{
        const {modalOpen,closeModal} = value;
        const {img, title, price} = value.modalProduct;
        
        if(!modalOpen){
        return null;
        }

        else{

        return(
        <div className="modal_product">

        <div className="container">
        <div className="row">
        <div id="modal" className="col-10 mx-auto col-md-6 col-lg-4 text-center text-capitalize p-5">
        <h5 className="modal_header">item added to the cart</h5>
        <img src={img} className="modal_image img-fluid" alt="product"/> 
        <h5 className="modal_title">{title}</h5>
        <h5 className="modal_price">Price : ${price}</h5>   
        
        <Link to="/">
        <button className="modal_store_button" onClick={()=>closeModal()}>
        Store
        </button>
        </Link>

        <Link to="/Cart">
        <button className="modal_cart_button" onClick={()=>closeModal()}>
        Go To Cart
        </button>
        </Link>
        
        </div>
        </div> 
        </div>
        </div>
       );
    }

        }}
        </ProductConsumer>
        );
    }
}

const ModalContainer =styled.div``;

