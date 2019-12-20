import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import  './productwrapper.css';
import {Container, Row,Col} from 'react-bootstrap';
import {ProductConsumer} from './Context';
import styled from "styled-components";
import PropTypes from 'prop-types';

export default class Product extends Component {
    render() {
        const {id, title, img, price, inCart} = this.props.product;

        return (
          
            <ProductWrapper className="col-xs-9 mx auto col-md-6 col-lg-3 my-3">
            <div className = "card-wrapper">
            <ProductConsumer>
            {(value) => ( 
            <div className = "image-container p-5"
            onClick={()=>
            value.handleDetails(id)}>
                
            <Link to="/ProductDetails">
            <img src={img} alt="product" className="card-img-top"/>
            </Link>
    
            <button className="cart-btn" 
            disabled={inCart? true:false}
            onClick={()=>{
            value.addToCart(id);
            value.openModal(id);}}>
    
            {inCart ? (
            <p className="text-capitalize mb=0" disabled>
            {""}
            in cart
            </p>
            ):(
            
            /*<img src={require('../../Images/colored-cart.png')} 
            alt="snow" height={40} width={40} />*/
            <p className="text-capitalize mb=0" disabled>
            {""}
            Add To cart
            </p>   
            )}
            </button>  
            </div>)}
            </ProductConsumer>

            {/*footer*/}
            <div className="card-footer">
            <p className="align-self-center mb-0">
            {title}   
            </p>

            <h5 className="Item-price">
            <span className="mr-1">$</span>
            {price}
            </h5>

            </div>
            </div>
           
            </ProductWrapper>
         
        );
    }
}
Product.propTypes = {
    product:PropTypes.shape({
        id:PropTypes.number,
        img:PropTypes.string,
        title:PropTypes.string,
        price:PropTypes.number,
        inCart:PropTypes.bool,
    }).isRequired
};

const ProductWrapper =styled.div``;