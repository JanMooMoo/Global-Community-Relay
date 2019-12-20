import React, { Component } from 'react';
import {ProductConsumer} from './Context';
import {Link} from 'react-router-dom';
import  './product-details.css';
import Title from '../Title/Title';

export default class ProductDetails extends Component {
    render() {
        return (
            <ProductConsumer>
                {(value)=>{
                const {id,img,info,price,title,inCart} = value.detailProduct;
                return(
                    
                    <div className ="container py-3">
                    <div className = "row">
                    <div className = "product_heading col-10 mx-auto text-center text-slanted my-5">
                    <h1>Product Details</h1>    
                    </div>     
                    </div>

                    <div className="row">
                    <div className = "col-10 mx-auto col-md-6 my-3">
                    <img src={img} className="image_detail img-fluid" alt="product"/>
                    </div> 

                    <div className = "col-10 mx-auto col-md-6 my-3 text-capitalize">
                    <h1 className="product_name">{title}</h1>
                    <h4 className="product_price">
                    <strong>
                    Price : <span>$</span> 
                    {price}
                    </strong>    
                    </h4> 
                    <p className="heading_info text-capitalize font-weight-bold mt-3 mb-0">
                     Product Info   
                    </p>
                    <p className="product_info  lead">{info}</p>

                    <div>
                    <Link to ="/">
                    <button className = "product_details_button"> Back to Store</button>
                    </Link> 

                    <button className = "product_cart_button" 
                    disabled={inCart?true:false} 
                    onClick={()=>{
                    value.addToCart(id);
                    value.openModal(id);}}>
                        
                    {inCart ? "In Cart": "Add To Cart" }
                    </button>  
                    </div>


                    </div>

                    </div>
                    </div>
                )   
                }}
            </ProductConsumer>
        );
    }
}

 