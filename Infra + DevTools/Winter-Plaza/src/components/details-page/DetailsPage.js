import React,{Component} from 'react';
import {Container, Row,Col} from 'react-bootstrap';
import Center from 'react-center';
import ReactGA from 'react-ga';
import FlipPage from 'react-flip-page';
import Title from '../Title/Title';
import './flipcard.css';





export default class DetailsPage extends Component {
  render(){
  return (
       <div>
          <a id="moon"></a>
    
     <Container>
    
         <Row><Col><h1> </h1></Col></Row>
         <Row><Col><h1> </h1></Col></Row>
            <Title name="About The" title="Builders"/>
         <Row><Col><h1> </h1></Col></Row>
         <Row><Col><h1> </h1></Col></Row>
         <Row><Col><h1> </h1></Col></Row>
         <Row><Col><h1> </h1></Col></Row>
         <Row><Col><h1> </h1></Col></Row>
         <Row><Col><h1> </h1></Col></Row>

<Row>
<Col xs={12} md={12} lg={4}>   
           
<Center>
<FlipPage className='flipNews' orientation='horizontal' pageBackground=
'linear-gradient(to bottom, rgb(212, 212, 212),rgb(106, 106, 161), rgb(0, 28, 88), rgb(1, 1, 8))' 
treshold='20' uncutPages width='300' height='400'>

<article>
<div className="flipcard">
<Center><h1> </h1></Center>
<Center><h1> </h1></Center>
<Center><h1> </h1></Center>
<Center><h1> </h1></Center>  
<Center><h1> </h1></Center>
<Center><img src={require('../../Images/Hydrosmall.png')} alt="snow" height={140} width={130} /></Center>
<Center><h1> </h1></Center>
<Center><h1> </h1></Center>
<Center><h5 className="grass2">Project Hydro</h5></Center>
<Center><h1> </h1></Center>
<Center><h1> </h1></Center>
<Center><h1> </h1></Center>
<Center><h1> </h1></Center>
<Center><h1> </h1></Center>
<Center><h1> </h1></Center>
<Center><h1> </h1></Center>
<Center><h1> </h1></Center>
<Center><h1> </h1></Center>
<Center><h1> </h1></Center>
<Center><h1> </h1></Center>
<Center><h1> </h1></Center>

<a href="https://projecthydro.org/about-us/" target="blank"><Center><div className ="partner-banner" >
Click here for more details</div></Center></a>
<Center><h1> </h1></Center>
<Center><h1> </h1></Center>
</div>
</article>
<Center>

<article>
<div className="flipcard">
<Center><h1></h1></Center>
 
<Center><h1></h1></Center>
<Col><h6 className="radius">Project Hydro was launched in March 2018. 
The project was incubated by Hydrogen, 
one of the leading fintech API companies in the world, 
named “Fintech Startup of the Year”  by KPMG and “World Changing Technology” by Fast Company.  
Project Hydro expanded to be a global, </h6></Col>
</div>
</article></Center>

<Center>
<article>
<div className="flipcard">
<Center><h1> </h1></Center>
 
<Center><h1> </h1></Center>
<Col> <h6 className="radius">decentralized, 
and open-source project
backed by Talented Community Developers, Evangelist & Supporters around the globe
who are continuously building, 
innovating and spreading the knowledge about the project.
 
</h6></Col>
</div>
</article></Center>

<Center>
<article>
<div className="flipcard">
<Center><h1> </h1></Center>
 
<Center><h1> </h1></Center>
<Col>
<h6 className="radius">
helping companies launch enterprise applications 
and new infrastructure on top of the ecosystem. 
</h6></Col>
</div>
</article></Center>
</FlipPage></Center></Col>  

<Col xs={12} md={12} lg={4}>
<Center><FlipPage className='flipNews' orientation='horizontal' pageBackground=
  'linear-gradient(to bottom, rgb(212, 212, 212),rgb(106, 106, 161), rgb(0, 28, 88), rgb(1, 1, 8))' treshold='20' showSwipeHint perspective='90rem' uncutPages width='300' height='400'>
 <article>
 <div className="flipcard">
 <Center><h1></h1></Center>
 <Center><h1></h1></Center>
 <Center><h1></h1></Center>
 <Center><h1></h1></Center>  
 <Center><h1></h1></Center>
 <Center><img src={require('../../Images/Hydrogen.png')} alt="snow" height={140} width={133} /></Center>
 <Center><h1></h1></Center>
 <Center><h1></h1></Center>
 <Center><h5 className="grass2">Hydrogen</h5></Center>
 <Center><h1></h1></Center>
 <Center><h1></h1></Center>
 <Center><h1></h1></Center>
 <Center><h1></h1></Center>
 <Center><h1></h1></Center>
 <Center><h1></h1></Center>
 <Center><h1></h1></Center>
 <Center><h1></h1></Center>
 <Center><h1></h1></Center>
 <Center><h1></h1></Center>
 <Center><h1></h1></Center>
 <Center><h1></h1></Center>
 <a href="https://www.hydrogenplatform.com/about" target="blank"><Center><div className ="partner-banner" >Click here for more details</div></Center></a>
 <Center><h1></h1></Center>
 <Center><h1></h1></Center>
 
 </div>
</article>
<Center>

<article>
<div className="flipcard">
<Center><h1></h1></Center>
<Center><h1></h1></Center>
<Col>
<h6 className="radius">While running fintech apps for the last decade the team saw how costly, 
complex, and time consuming it was to build a financial platform. 
Hydrogen was founded to change this, exposing its light, 
modular, global REST APIs to firms small and large. 
Their company mission is simple:

</h6></Col>
</div>
</article></Center>

<Center>
<article>
<div className="flipcard">
<Center><h1></h1></Center>
<Center><h1></h1></Center>
<Col><h6 className="radius"> 
Create a worldwide ecosystem for better, 
simpler, fairer, more transparent, 
and more affordable financial products. 
Hydrogen will create a new digital economy that will uplift 
and empower an emergent middle class, bringing fintech to the masses.
</h6></Col>
</div>
</article></Center>
</FlipPage></Center></Col>


<Col xs={12} md={12} lg={4}>
<Center><FlipPage className='flipNews' orientation='horizontal' pageBackground=
  'linear-gradient(to bottom, rgb(212, 212, 212),rgb(106, 106, 161), rgb(0, 28, 88), rgb(1, 1, 8))' treshold='20' uncutPages width='300' height='400'>
 <article>
 <div className="flipcard">
 <Center><h1></h1></Center>
 <Center><h1></h1></Center>
 <Center><h1></h1></Center>
 <Center><h1></h1></Center>  
 <Center><h1></h1></Center>
 <Center><img src={require('../../Images/HydroLabs.png')} alt="snow" height={140} width={134} /></Center>
 <Center><h1></h1></Center>
 <Center><h1></h1></Center>
 <Center><h5 className="grass2">Hydro Labs</h5></Center>
 <Center><h1></h1></Center>
 <Center><h1></h1></Center>
 <Center><h1></h1></Center>
 <Center><h1></h1></Center>
 <Center><h1></h1></Center>
 <Center><h1></h1></Center>
 <Center><h1></h1></Center>
 <Center><h1></h1></Center>
 <Center><h1></h1></Center>
 <Center><h1></h1></Center>
 <Center><h1></h1></Center>
 <Center><h1></h1></Center>
 <a href="https://hydrolabs.org/#about" target="blank"><Center><div className ="partner-banner" >Click here for more details</div></Center></a>
 <Center><h1></h1></Center>
 <Center><h1></h1></Center>
 
 </div>
</article>
<Center>

<article>
<div className="flipcard">
<Center><h1></h1></Center>
<Center><h1></h1></Center>
<h6 className="radius">Hydro Labs is a 24 person global team of passionate blockchain 
and product development specialists, 
dedicated to simplifying and fast-tracking blockchain adoption. 
The Hydro Labs team are tasked with maintaining the Hydro protocols, 
encouraging new developers in the ecosystem, 
</h6>
</div>
</article></Center>

<Center>
<article>
<div className="flipcard">
<Center><h1></h1></Center>
<Center><h1></h1></Center>
<h6 className="radius">Hydro Labs builds identity-linked payment and security solutions 
using an advanced digital identity standard (ERC1484).
Their real-world working products offer P2P and B2B Payments, 
Point of Sale, Remittance, Document Signing and Storage, and Compliant Tokenization. 
</h6>
</div>
</article></Center>
</FlipPage></Center></Col>
</Row>

<Row>
<Col xs={12} md={12} lg={12} >
<Center><img className='partner-image' xs={12} md={12} lg={12} src={require('../../Images/hydropartners.jpg')} alt="snow" /></Center>
</Col>
</Row>

<Row><Col><h1> </h1></Col></Row>
<Row><Col className="market"><Center><h6 className="banana">If you find this Application Helpful and Wish to Support our Coffee in the Morning, You can do so by Tipping us on this Address 0x20F857b13D6C546eC77aFE47317EA3c5a75c1c6c ,If you found unpleasant bugs or have a suggestion, You can contact us at MyHydroFrost@gmail.com. Thank you! & Happy BUIDLING! </h6></Center></Col></Row>
<a href= "/Builders#moon" className="accountlink"> <button className="topButton">Top</button></a>
</Container>
   </div>
   
  );
}
}