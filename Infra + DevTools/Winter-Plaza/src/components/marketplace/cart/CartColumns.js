import React, { Component } from 'react';
import  './cart.css';

export default class CartColumns extends Component {
    render() {
        return (

            

            <div className = "container-fluid text-center d-none d-lg-block">
                
            <div className = "row mt-4">

            <div className = "cart_column col-10 mx-auto col-lg-2">
            <p className = " clear_button cartcolumn text-uppercase ">products</p>   
            </div>

            <div className = "cart_column col-10 mx-auto col-lg-2">
            <p className = "clear_button cartcolumn text-uppercase">Item name</p>   
            </div>

            <div className = "cart_column col-10 mx-auto col-lg-2">
            <p className = "clear_button cartcolumn text-uppercase">price</p>   
            </div>

            <div className = "cart_column col-10 mx-auto col-lg-2">
            <p className = "clear_button cartcolumn text-uppercase">quantity</p>   
            </div>

            <div className = "cart_column col-10 mx-auto col-lg-2">
            <p className = "clear_button cartcolumn text-uppercase">remove</p>   
            </div>
            
            <div className = "cart_column col-10 mx-auto col-lg-2">
            <p className = "clear_button cartcolumn text-uppercase">total</p>   
            </div>

            </div>  
            </div>
        );
    }
}

 