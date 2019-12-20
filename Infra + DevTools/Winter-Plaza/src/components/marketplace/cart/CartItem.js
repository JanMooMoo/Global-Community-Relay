import React, { Component } from 'react';
import  './cart.css';

export default function CartItem({item,value}){
    const{id,title,img,price,total,count} = item;
    const{increment,decrement,removeItem} = value;
        return (
            <div className= "row my-2 text-capitalize text-center">
            
            <div className = "col-10 mx-auto col-lg-2">
            <img 
            src ={img} 
            style = {{width: "7rem", height: "7rem"}}
            className = "cart_item img-fluid"
            alt = "product"/>
            </div>

            <div className = "cart_product_name col-10 mx-auto col-lg-2 mt-2">
            <span className = " d-lg-none">product:</span>
            {title}
            </div>

            <div className = "cart_product_price col-10 mx-auto col-lg-2 mt-2">
            <span className = "d-lg-none">price:</span>
            $ {price}
            </div>

            <div className = "col-10 mx-auto col-lg-2 my-2 my-lg-0" >
            <div className = "d-flex justify-content-center">
            <span className = "btn btn_cart mx-1 mt-1" onClick={()=>decrement(id)}>
            -
            </span>
            
            <span className = "btn btn_cart mx-1 mt-1" >{count}</span>

            <span className = "btn btn_cart mx-1 mt-1" onClick={()=>increment(id)}>
            +    
            </span>

            </div>
            </div>

            {/*  */}
            <div className = "col-10 mx-auto col-lg-2 mt-2">
            <div className = "d-flex justify-content-center" onClick ={()=> removeItem(id)}>
            <span className="cart-icon mx-1">x</span>
            
            </div>
            </div>

            <div className = "cart_product_total col-10 mx-auto col-lg-2 mt-2">
            <strong>item total: $ {total}</strong>
            </div>

            </div>
        );
    }


 