import React, { Component } from 'react';
import Product from './Product';
import {Link} from 'react-router-dom';
import Title from '../Title/Title';
import Center from 'react-center';
import {ProductConsumer} from './Context';
import {Row,Col,} from 'react-bootstrap';


    export default class ProductList extends Component {
     
//<div className="grass2 col-12 mx-auto-2 text-center"><p>The products that are listed here are not mine and used for demonstration purposes only. The credit goes to the respective designer/owner of the Item.</p></div>
    render() {
        
        return (

            <React.Fragment>
            <div className="py-5">
            <div className="container">
            <Title name="Winter pole" title="Plaza"/>
            
            

            <Col lg={2}>
            <Link to="/Cart">
            <button className="myCartButton mt-3"> 
            {/*<img src={require('../../Images/colored-cart.png')} 
            alt="snow" height={40} width={40} className="hydroimage"/>*/}
            My Cart
            </button></Link>
            </Col>
            
            <div className="row">
            
            <ProductConsumer>
            {value => {
                return value.products.map(product=>{
                    return <Product key={product.id} product={product}/>;
            });
            }}    
            </ProductConsumer>
            <Row className="mt-10"><Col className="market"><Center><p className="grass2">The products that are listed here are not mine and used for demonstration purposes only. credit goes to the respective designer & owner of the Item.</p></Center></Col></Row>

            </div>
            </div>
            </div>
           </React.Fragment>
        );
    }
}

