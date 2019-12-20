import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, Row,Col, Image,} from 'react-bootstrap';
import {Hydrosmall} from '../../Images/Hydrosmall.png';
import {logo} from '../../logo.svg';
import styled from 'styled-components';
import Center from 'react-center';
import SideDrawer from './SideDrawer';
import Backdrop from './Backdrop';


//<img src={require('../../Images/Hydrosmall.png')} alt="snow" height={70} width={60} className="navbar-brand"/>

export default class Navbar extends Component {

  constructor(props){
    super(props)
    this.state = {
        toggle: false,
        sideDrawerOpen:false,
        isOldestFirst:true,
        loading:true,

     }
} 

drawerToggleClickHandler =()=>{
  this.setState((prevState)=>{
    return {sideDrawerOpen: !prevState.sideDrawerOpen};
  });
 };

 backdropClickHandler =()=>{
  this.setState({sideDrawerOpen:false});
  
 };



  render(){

    let sideDrawer;
let backdrop;
if(this.state.sideDrawerOpen){
  sideDrawer=<SideDrawer/>;
  backdrop=<Backdrop click={this.backdropClickHandler}/>
}
  return (
    

    
   <NavWrapper className="navbar navbar-expand-sm px-sm-5">

     
<Container>

<Center>

<button className="Nav_btn ml-4" onClick={this.props.drawerClickHandler}>
            <h1></h1>
                <div className="drawerline"/>
                    <h1></h1> 
                <div className="drawerline"/>
                    <h1></h1> 
                <div className="drawerline"/>
                    <h1></h1>
                <div className="drawerline"/>
                    <h1></h1>  
                    {sideDrawer}
                    {backdrop}
            </button>  
     <ul className="navbar-nav align-items-center justify-content-center" >
    
     <Link to='/' className="nav-link ml-1">
       <li className="navlink2">
       <h3 className="banana2">Winter</h3><h3 className="frost">Plaza</h3>
       </li>
       </Link>
    

     </ul>

     
</Center>
            </Container>

   </NavWrapper>
  );
}
}

const NavWrapper = styled.nav`
height:90px;
max-height:90px;

background: linear-gradient(45deg, rgb(0, 28, 88), rgb(45, 63, 224),rgb(226, 188, 62))!important;
background: linear-gradient(to left, rgb(1, 1, 5), rgb(0, 28, 88), rgb(1, 1, 5))!important;
border-bottom:1px solid rgb(219, 206, 164);
border-bottom-left-radius:25px;
border-bottom-right-radius:25px;
overflow:hidden;
z-index:500;


.nav-link{
  font-size:1.2rem;
  text-transform:capitalize;
  color:white;
  cursor:pointer;
  transition:all 0.2s ease-in-out;

  &:hover
}

`


