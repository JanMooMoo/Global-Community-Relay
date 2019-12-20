import React, { Component } from 'react';
import {Modal, Row, Col,Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Title from '../../Title/Title';

export default function EmptyCart()  {
   
        return (
            <div className = "container mt-5">
            
            <Title name="Your Cart Is" title="Currently Empty"/>

            <Row className="mt-5">
            <Col md={3}className="gethydro"></Col>
            
            <Col md={6} className="gethydro"><Link to ="/Plaza"><img src={require('../../../Images/colored-cart.png')} 
            alt="snow" height={150} width={140} className="navbar-brand"/></Link></Col>
            
            <Col md={3}className="gethydro"></Col>
            </Row>

            <Row className="mt-3"><Col className="gethydro"><Link to ="/"><h6 className="modal_header">Back To Store</h6></Link></Col></Row> 
                
            </div>
        );
    }


