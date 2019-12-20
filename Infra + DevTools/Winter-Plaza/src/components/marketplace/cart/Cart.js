import React, { Component } from 'react';
import Title from '../../Title/Title';
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';
import {ProductConsumer} from '../Context';
import CartList from './CartList';
import CartTotal from './CartTotal'

export default class Cart extends Component {
    render() {
        return (
            <section>
            <ProductConsumer>
                {value =>{
                    const {cart} = value;
                    if(cart.length > 0){
                        return(
                        <React.Fragment>
                            <div className="py-5">
                            <div className="container">
            
                            <Title name="My" title="Cart"/>
                            <CartColumns/>
                            <CartList value = {value}/>
                            <CartTotal value = {value} history={this.props.history}/>
                            </div>
                            </div>
                            
                        </React.Fragment>
                        );
                    } else {
                        return(
                        <EmptyCart/>
                        )
                    }
                }}
            </ProductConsumer>
         
            </section>
        );
    }
}

